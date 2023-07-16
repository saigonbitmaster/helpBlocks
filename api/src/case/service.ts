import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCaseDto } from './dto/create.dto';
import { UpdateCaseDto } from './dto/update.dto';
import { Case, CaseDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { Vote } from '../flatworks//types/types';

@Injectable()
export class CaseService {
  constructor(
    @InjectModel(Case.name) private readonly model: Model<CaseDocument>,
  ) {}

  async getVote(
    queryType: string,
    caseId: string,
    userId: string,
  ): Promise<Vote> {
    const record = await this.model.findById(caseId).exec();

    const _vote =
      queryType === 'case'
        ? record.caseVotes.find((item) => item.userId === userId)
        : queryType === 'unlock'
        ? record.unlockVotes.find((item) => item.userId === userId)
        : null;

    const vote = _vote?.vote ? true : false;
    return { userId: userId, vote };
  }

  async vote(
    voteType: string,
    caseId: string,
    userId: string,
    vote: boolean,
  ): Promise<any> {
    const record = await this.model.findById(caseId).exec();
    const _votes =
      voteType === 'case'
        ? record.caseVotes
        : voteType === 'unlock'
        ? record.unlockVotes
        : [];

    const votes =
      _votes.length === 0
        ? [{ userId, vote }]
        : _votes.map((item) => {
            item.userId === userId ? (item.vote = vote) : null;
            return item;
          });

    voteType === 'case'
      ? (record.caseVotes = votes)
      : (record.unlockVotes = votes);

    return await this.update(caseId, { ...record });
  }

  async findAll(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    return { count: count, data: data };
  }

  async findOne(id: string): Promise<Case> {
    return await this.model.findById(id).exec();
  }

  async create(createCaseDto: CreateCaseDto): Promise<Case> {
    return await new this.model({
      ...createCaseDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateCaseDto: UpdateCaseDto): Promise<Case> {
    return await this.model.findByIdAndUpdate(id, updateCaseDto).exec();
  }

  async delete(id: string): Promise<Case> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
