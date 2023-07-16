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
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateCaseDto } from './dto/create.dto';
import { UpdateCaseDto } from './dto/update.dto';
import { CaseService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cases')
export class CaseController {
  constructor(private readonly service: CaseService) {}

  @Get()
  async index(@Response() res: any, @Query() query, @Request() req) {
    const userId = req.user.userId;
    const mongooseQuery = queryTransform(query);
    mongooseQuery.filter.queryType === 'developer'
      ? (mongooseQuery.filter.author = userId)
      : null;
    delete mongooseQuery.filter.queryType;
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createCaseDto: CreateCaseDto, @Request() req) {
    const userId = req.user.userId;
    return await this.service.create({
      ...createCaseDto,
      postedUserId: userId,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCaseDto: UpdateCaseDto,
    @Query() query,
  ) {
    console.log(query);
    return await this.service.update(id, updateCaseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
