import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from 'src/test/models/test.model';
import { Question } from './models/question.model';
import { Answer } from './models/answer.model';
import { CreateTestDto } from './dto/createTestDto';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { CreateAnswerDto } from './dto/createAnswerDto';

@Injectable()
export class TestsService {
  constructor(
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

  async createTest(data: CreateTestDto): Promise<Test> {
    return await this.testModel.create(data);
  }

  async createQuestion(testId: number, data: CreateQuestionDto): Promise<Test> {
    const test = await this.testModel.findOne({ where: { id: testId } });
    await test.addQuestion(data);
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
    await question.addAnswer(data);
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
