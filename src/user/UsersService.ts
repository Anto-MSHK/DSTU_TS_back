import { InjectModel } from '@nestjs/sequelize';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './models/user.model';
import { AnswerLogDTO } from './dto/answerLog.dto';
import { Results } from './models/results.model';
import { Test } from 'src/test/models/test.model';
import { ResultsByCriteriaDTO } from './dto/resultsByCriteria.dto';
import { Answer } from 'src/test/models/answer.model';
import { Question } from 'src/test/models/question.model';
import { Criteria } from 'src/test/models/criteria.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    @InjectModel(Criteria) private criteriaRepo: typeof Criteria,
    @InjectModel(Results) private resultsRepo: typeof Results,
    @InjectModel(Question) private questionRepo: typeof Question,
    @InjectModel(Answer) private answersRepo: typeof Answer,
    @InjectModel(Test) private testRepo: typeof Test,
  ) {}

  async getUsers() {
    return await this.userRepo.findAll();
  }

  async getUserById(id: number) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async create(DTO: CreateUserDTO) {
    const email = DTO.email;
    const password = await bcrypt.hash(DTO.password, 2);

    const user = await this.userRepo.create({ email, password });

    return user;
  }

  async findByMail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async updateUser(id: number, data: User) {
    const user = await this.userRepo.findOne({ where: { id } });
    await user.update({
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      age: data.age,
      phoneNumber: data.phoneNumber,
      locality: data.locality,
      schoolName: data.schoolName,
      schoolClass: data.schoolClass,
      maritalStatus: data.maritalStatus,
      gender: data.gender,
    });
    await user.reload();
    return user;
  }

  async saveAnswers(testId: number, userId: number, data: AnswerLogDTO[]) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const test = await this.testRepo.findOne({ where: { id: testId } });
    if (!user || !test)
      throw new NotFoundException('Не найден пользователь или тест!');

    await Promise.all(
      data.map(async (log) => {
        const curQuestion = await this.questionRepo.findOne({
          where: { id: log.questionId },
        });

        let answers = await Promise.all(
          log.answerIds.map(
            async (answerId) =>
              await this.answersRepo.findOne({
                where: { id: answerId },
                include: [{ model: Criteria, as: 'criteria' }],
              }),
          ),
        );

        answers = answers.filter((an) => an !== null);

        if (!answers || answers.length !== log.answerIds.length || !curQuestion)
          throw new BadRequestException(
            'Обнаружены не существующие вопросы или ответы!',
          );
      }),
    );

    const resCandidate = await this.resultsRepo.findOne({
      where: { testId, userId },
    });

    if (resCandidate) {
      await resCandidate.update({ answersLog: data });
      await resCandidate.reload();
      return resCandidate;
    } else {
      const results = await this.resultsRepo.create({
        userId,
        testId,
        answersLog: data,
      });
      await results.reload();
      return results;
    }
  }

  async getAllResults(userId: number) {
    const results = await this.resultsRepo.findAll({ where: { userId } });

    const allTests = await Promise.all(
      results.map(async (res) => {
        const testInfo = await this.testRepo.findOne({
          where: { id: res.testId },
        });

        return {
          testInfo,
          result: res,
        };
      }),
    );

    return allTests;
  }

  async getResultsByTest(testId: number, userId: number) {
    let byFormula = 0;
    const groups: { group: string; count: number }[] = [];
    const byCriteria: ResultsByCriteriaDTO[] = [];

    const results = await this.resultsRepo.findOne({
      where: { testId, userId },
    });

    const test = await this.testRepo.findOne({
      where: { id: testId },
    });

    if (!results)
      throw new NotFoundException('Вы ещё не отвечали на этот тест!');

    if (results?.answersLog)
      await Promise.all(
        results.answersLog.map(async (log) => {
          let answers = await Promise.all(
            log.answerIds.map(
              async (answerId) =>
                await this.answersRepo.findOne({
                  where: { id: answerId },
                  include: [{ model: Criteria, as: 'criteria' }],
                }),
            ),
          );

          answers = answers.filter((an) => an !== null);

          answers.map((curAnswer) => {
            if (curAnswer.criteria) {
              const criteriaIndex = byCriteria.findIndex(
                (cr) => cr.criteriaId === curAnswer.criteria.id,
              );
              if (criteriaIndex > -1)
                byCriteria[criteriaIndex].result +=
                  curAnswer?.meta?.weight || 1;
              else
                byCriteria.push({
                  criteriaId: curAnswer.criteria.id,
                  result: curAnswer?.meta?.weight || 1,
                });
            }
          });
        }),
      );

    let criterias = [];
    if (byCriteria)
      criterias = await Promise.all(
        byCriteria.map(async (cr) => {
          const curCriteria = await this.criteriaRepo.findOne({
            where: { id: cr.criteriaId },
          });
          return { criteria: curCriteria, result: cr.result };
        }),
      );

    let logs = [];
    if (results.answersLog)
      logs = await Promise.all(
        results.answersLog.map(async (log) => {
          const curQuestion = await this.questionRepo.findOne({
            where: { id: log.questionId },
          });
          return {
            question: curQuestion,
            answers: curQuestion.answers.map((aw) => {
              const curIndGroup = groups.findIndex(
                (gr) => gr.group === aw?.meta?.group,
              );
              if (log.answerIds.includes(aw.id) && aw?.meta) {
                if (curIndGroup !== -1)
                  groups[curIndGroup].count += aw?.meta?.weight || 1;
                else if (aw?.meta?.group)
                  groups.push({
                    group: aw?.meta?.group,
                    count: aw?.meta?.weight || 1,
                  });
              }
              return {
                ...aw.dataValues,
                isAnswer: log.answerIds.includes(aw.id) ? true : undefined,
              };
            }),
          };
        }),
      );

    let curSign = '';
    if (test.formula?.length > 0)
      test.formula.map((act) => {
        if (act.includes('g')) {
          const curGroupCount = groups.find(
            (gr) => gr.group === act.replace('g', ''),
          )?.count;
          if (curGroupCount) {
            if (curSign === '') byFormula = +curGroupCount;
            else if (curSign === '+') byFormula += +curGroupCount;
            else byFormula -= +curGroupCount;
          }
        } else if (act === '+') curSign = '+';
        else if (act === '-') curSign = '-';
        else {
          if (curSign === '+') byFormula += +act;
          else if (curSign === '-') byFormula -= +act;
        }
      });

    const curInterpretation = test?.interpretation?.find((int) => {
      const curMin = +int.value[0] || 0;
      const curMax = +int.value[1] || Infinity;
      if (curMin <= +byFormula && +byFormula <= curMax) return true;
      else return false;
    });

    return {
      criterias,
      logs,
      byFormula,
      groups,
      interpretation: test.interpretation,
      curInterpretation,
    };
  }
}
