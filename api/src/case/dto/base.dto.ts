import { MapLocation, Vote } from '../../flatworks/types/types';

export class BaseCaseDto {
  name: string;
  address: string;
  location: MapLocation;
  postedUserId: string;
  expectedReceiveDate: Date;
  requestedAmount: number;
  isApproved: boolean;
  isDelivered: boolean;
  deliveredAmount: number;
  deliveredDate: Date;
  shortDescription: string;
  receiverWallet: string;
  caseVotes: Vote[];
  unlockVotes: Vote[];
  description: string;
}
