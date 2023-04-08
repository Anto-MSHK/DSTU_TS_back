import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from 'src/test/models/test.model';
import { Question } from './models/question.model';
import { Answer } from './models/answer.model';
import { CreateTestDto } from './dto/createTestDto';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { CreateAnswerDto } from './dto/createAnswerDto';
import { Way } from 'src/direction/models/way.model';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Way)
    private readonly wayModel: typeof Way,
    @InjectModel(Test)
    private readonly testModel: typeof Test,
    @InjectModel(Question)
    private readonly questionModel: typeof Question,
    @InjectModel(Answer)
    private readonly answerModel: typeof Answer,
  ) {}

  async findAll(): Promise<Test[]> {
    return await this.testModel.findAll();
  }

  async findOne(id: number): Promise<Test> {
    return await this.testModel.findOne({ where: { id } });
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
    const newAnswer = await this.answerModel.create(data);
    await question.addAnswer(newAnswer.id);
    await question.reload();
    return question;
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
