import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  Query,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { PublicService } from './public.service';
import { PlutusTxService } from '../plutustx/service';
import { CaseService } from '../case/service';
import * as moment from 'moment';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as lodash from 'lodash';
import { queryTransform } from '../flatworks/utils/getlist';
import { VoteDto } from './dto/vote.dto';

@UseGuards(JwtAuthGuard)
@Controller('customapis')
export class CustomController {
  constructor(
    private readonly plutusTxService: PlutusTxService,
    private readonly caseService: CaseService,
  ) {}

  //get userId from access token
  @Get('userid')
  async getUserId(@Response() res: any, @Req() request) {
    const userId = lodash.get(request, 'user.userId', null);
    return res.json(userId);
  }

  //get user's case & unlock vote
  @Get('vote')
  async getVote(@Response() res: any, @Req() request, @Query() query) {
    const mongooseQuery = queryTransform(query);
    const queryType = mongooseQuery.filter.queryType;
    const caseId = mongooseQuery.filter.caseId;

    const userId = lodash.get(request, 'user.userId', null);
    console.log(caseId, userId, queryType);
    const vote = await this.caseService.getVote(queryType, caseId, userId);
    return res.json(vote);
  }

  //update vote for a user
  @Post('casevote')
  async caseVote(@Body() voteDto: VoteDto, @Req() req) {
    const userId = req.user.userId;
    const caseId = voteDto.caseId;
    const vote = voteDto.vote as boolean;
    return await this.caseService.vote('case', caseId, userId, vote);
  }

  //update unlock vote for a user
  @Post('unlockvote')
  async unlockVote(@Body() voteDto: VoteDto, @Req() req) {
    const userId = req.user.userId;
    const caseId = voteDto.caseId;
    const vote = voteDto.vote as boolean;
    return await this.caseService.vote('unlock', caseId, userId, vote);
  }

  //plutus report
  @Get('plutusreports')
  async getDashboardPlutus(
    @Response() res: any,
    @Req() request,
    @Query() query,
  ) {
    const userId = lodash.get(request, 'user.userId', null);
    const mongooseQuery = queryTransform(query);
    const queryType = mongooseQuery.filter.queryType;

    //if queryType = emp return plutus txs that locked by emp, if queryType = jsk return plutus txs bid by jsk, if queryType = cms return all plutus txs
    if (!userId || !queryType) {
      return res.json({});
    }
    const result = await this.plutusTxService.getPlutusReports(
      queryType,
      userId,
    );
    return res.json(result);
  }

  /*  */ @Get('getmonthlyplutustxsreport')
  async getMonthlyPlutusTxsReport(
    @Response() res: any,
    @Req() request,
    @Query() query,
  ) {
    const userId = lodash.get(request, 'user.userId', null);
    const mongooseQuery = queryTransform(query);
    const queryType = mongooseQuery.filter.queryType;

    //if queryType = emp return job data posted by emp, if queryType = jsk return job data bid by emp by jsk, if queryType = cms return all job data
    if (!userId || !queryType) {
      return res.json({});
    }
    const result = await this.plutusTxService.getMonthlyPlutusTxsReport(
      queryType,
      userId,
    );
    return res.json(result);
  }
}
