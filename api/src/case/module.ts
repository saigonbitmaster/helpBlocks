import { Module } from '@nestjs/common';
import { CaseService } from './service';
import { CaseController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Case, CaseSchema } from './schemas/schema';

@Module({
  providers: [CaseService],
  controllers: [CaseController],
  exports: [CaseService],
  imports: [
    MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }]),
  ],
})
export class CaseModule {}
