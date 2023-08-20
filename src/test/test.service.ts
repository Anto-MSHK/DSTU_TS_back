import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from 'src/test/models/test.model';
import { Question } from './models/question.model';
import { Answer } from './models/answer.model';
import { CreateTestDto } from './dto/createTestDto';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { CreateAnswerDto } from './dto/createAnswerDto';
import { Way } from 'src/direction/models/way.model';
import { CreateCriteriaDto } from './dto/createCriteriaDto';
import { Criteria } from './models/criteria.model';
import { Direction } from 'src/direction/models/direction.model';
import { Role, User } from 'src/user/models/user.model';
import { Results } from 'src/user/models/results.model';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Results)
    private readonly resultsModel: typeof Results,
    @InjectModel(Way)
    private readonly wayModel: typeof Way,
    @InjectModel(Direction)
    private readonly directionModel: typeof Direction,
    @InjectModel(Test)
    private readonly testModel: typeof Test,
    @InjectModel(Question)
    private readonly questionModel: typeof Question,
    @InjectModel(Answer)
    private readonly answerModel: typeof Answer,
    @InjectModel(Criteria)
    private readonly criteriaModel: typeof Criteria,
  ) {}

  async findAll(wayId: number | undefined, userId: number): Promise<Test[]> {
    const includeConf = [
      {
        model: Question,
        as: 'questions',
        include: [
          {
            model: Answer,
            as: 'answers',
            include: [
              {
                model: Criteria,
                as: 'criteria',
              },
            ],
          },
        ],
      },
    ];
    if (wayId)
      return await this.testModel.findAll({
        where: { wayId },
        include: includeConf,
      });
    else {
      const user = await this.userModel.findOne({
        where: { id: userId },
      });

      const allTests = [];

      await Promise.all(
        user.directions.map(async (dir) => {
          await Promise.all(
            dir.ways.map(async (way) => {
              await Promise.all(
                way.tests.map(async (test) => {
                  allTests.push(
                    await this.testModel.findOne({
                      where: { id: test.id },
                      include: includeConf,
                    }),
                  );
                }),
              );
            }),
          );
        }),
      );

      return allTests;
    }
  }

  async findAllCriteria(testId: number): Promise<Criteria[]> {
    return await this.criteriaModel.findAll({ where: { testId } });
  }

  async findOne(id: number, user: { id: number; role: Role }): Promise<any> {
    let curResults = await this.resultsModel.findOne({
      where: { userId: user.id, testId: id },
    });

    const curTest = await this.testModel.findOne({
      where: { id },
      include: [
        {
          model: Question,
          as: 'questions',
          include: [
            {
              model: Answer,
              as: 'answers',
              include:
                user.role === Role.Admin
                  ? [{ model: Criteria, as: 'criteria' }]
                  : [],
            },
          ],
        },
      ],
    });

    if (!curTest) return undefined;

    const curWay = await this.wayModel.findByPk(curTest.wayId);
    const curDirection = await this.directionModel.findByPk(curWay.directionId);

    if (!curResults && curDirection.userId !== user.id)
      curResults = await this.resultsModel.create({
        userId: user.id,
        testId: id,
      });

    const testWithAnswers = { ...curTest.dataValues };
    if (curDirection.userId !== user.id && curResults.answersLog)
      curResults.answersLog.map((log) => {
        const curQstIndex = testWithAnswers.questions.findIndex(
          (qst) => qst.id === log.questionId,
        );
        if (curQstIndex !== -1) {
          testWithAnswers.questions[curQstIndex] =
            testWithAnswers.questions[curQstIndex].dataValues;
          testWithAnswers.questions[curQstIndex].answers =
            testWithAnswers.questions[curQstIndex].answers.map((answer) => {
              if (log.answerIds.includes(answer.id))
                return { ...answer.dataValues, isAnswer: true } as any;
              else return { ...answer.dataValues };
            });
        }
      });
    return testWithAnswers;
  }

  async createTest(wayId: number, data: CreateTestDto): Promise<Way> {
    const way = await this.wayModel.findOne({ where: { id: wayId } });
    const newTest = await this.testModel.create(data);
    await way.addTest(newTest.id);

    await way.reload();
    return way;
  }

  async createQuestion(testId: number, data: CreateQuestionDto): Promise<Test> {
    const test = await this.testModel.findOne({ where: { id: testId } });
    if (!test) throw new NotFoundException('Теста не существует!');
    const newQuestion = await this.questionModel.create(data);
    await test.addQuestion(newQuestion.id);
    await test.reload();
    return test;
  }

  async createAnswer(
    questionId: number,
    data: CreateAnswerDto,
  ): Promise<Question> {
    const question = await this.questionModel.findOne({
      where: { id: questionId },
    });
    if (!question) throw new NotFoundException('Вопрос не найден!');
    const criteria = await this.criteriaModel.findOne({
      where: { id: data.criteria },
    });
    const newAnswer = await this.answerModel.create(data);
    newAnswer.criteriaId = criteria.id;
    await newAnswer.save();
    await question.addAnswer(newAnswer.id);
    await question.reload();
    return question;
  }

  async createCriteria(
    testId: number,
    data: CreateCriteriaDto,
  ): Promise<Criteria> {
    const test = await this.testModel.findOne({
      where: { id: testId },
    });
    const newCriteria = await this.criteriaModel.create(data);
    await test.addCriteria(newCriteria);
    await newCriteria.reload();
    return newCriteria;
  }

  async updateTest(id: number, data: CreateTestDto): Promise<Test> {
    const test = await this.testModel.findOne({ where: { id } });
    await test.update({ ...data });
    await test.reload();
    return test;
  }

  async deleteTest(id: number): Promise<number> {
    const test = await this.testModel.findOne({ where: { id } });
    await test.destroy();
    return id;
  }

  async deleteQuestion(id: number): Promise<number> {
    const question = await this.questionModel.findOne({ where: { id } });
    await question.destroy();

    return id;
  }

  async deleteAnswer(id: number): Promise<number> {
    const answer = await this.answerModel.findOne({ where: { id } });
    await answer.destroy();

    return id;
  }
}
