import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type CaseDocument = Case & Document;

@Schema()
export class Case {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  address: string;

  //location type {lat: number, lng: number}
  @Prop({
    type: { lat: { type: Number }, lng: { type: Number } },
  })
  location: { lat: number; lng: number };

  @Prop()
  requestedAmount: number;

  @Prop({
    type: [{ userId: { type: String }, vote: { type: Boolean } }],
  })
  caseVotes: { userId: string; vote: boolean }[];

  @Prop({
    type: [{ userId: { type: String }, vote: { type: Boolean } }],
  })
  unlockVotes: { userId: string; vote: boolean }[];

  @Prop()
  postedUserId: string;

  @Prop()
  expectedReceiveDate: Date;

  @Prop()
  isApproved: boolean;

  @Prop()
  isDelivered: boolean;

  @Prop()
  deliveredAmount: number;

  @Prop()
  receiverWallet: string;

  @Prop()
  deliveredDate?: Date;

  @Prop()
  shortDescription: string;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const CaseSchema = SchemaFactory.createForClass(Case);
CaseSchema.plugin(uniqueValidator);

export { CaseSchema };
