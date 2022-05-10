export interface Er {
  count: number;
  total: number;
  percentage: number;
}

export interface Voter {
  count: number;
  total: number;
  percentage: number;
  actualCount: number;
}

export interface Result {
  rank: string;
  candidateCode: string;
  candidateName: string;
  lastName: string;
  firstName: string;
  partyName: string;
  partyNameShort: string;
  voteCount: number;
  contestCode: string;
  locationCode: number;
  locationName: string;
  er: Er;
  voter: Voter;
  timestamp: Date;
}

export interface Er2 {
  count: number;
  total: number;
  percentage: number;
}

export interface Voter2 {
  count: number;
  total: number;
  percentage: number;
  actualCount: number;
}

export interface DataResponse {
  positionName: string;
  contestDetail: string;
  locationCode: number;
  locationName: string;
  contestLocationName: string;
  result: Result[];
  isFeedZero: boolean;
  er: Er2;
  voter: Voter2;
  timestamp: Date;
}
