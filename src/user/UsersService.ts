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

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
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
      age: data.age,
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

    const byCriteria: ResultsByCriteriaDTO[] = [];

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
              }),
          ),
        );

        answers = answers.filter((an) => an !== null);

        if (!answers || answers.length !== log.answerIds.length || !curQuestion)
          throw new BadRequestException(
            'Обнаружены не существующие вопросы или ответы!',
          );

        answers.map((curAnswer) => {
          const criteriaIndex = byCriteria.findIndex(
            (cr) => cr.criteriaId === curAnswer.criteria.id,
          );
          if (criteriaIndex > -1) byCriteria[criteriaIndex].result += 1;
          else
            byCriteria.push({ criteriaId: curAnswer.criteria.id, result: 1 });
        });
      }),
    );

    const resCandidate = await this.resultsRepo.findOne({
      where: { testId, userId },
    });

    if (resCandidate) {
      await resCandidate.update({ byCriteria, answersLog: data });
      await resCandidate.reload();
      return resCandidate;
    }

    const results = await this.resultsRepo.create({
      userId,
      testId,
      byCriteria,
      answersLog: data,
    });
    await results.reload();
    return results;
  }
}
