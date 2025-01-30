export interface PilotDetails {
  age: number;
  gender: string;
  location: string;
  birthDate: string;
  countryCode: string;
}

export interface PilotInfo {
  name: any;
  firstName: string;
  lastName: string;
  nickName: string;
  experience: string;
  desired_budget: number;
}

export interface Championship {
  name: string;
  year: string;
  category: string;
  position: string;
  points: string;
  bestResult: string;
}

export interface PilotHistory {
  debutDate: string;
  championships: number;
  races: number;
  lapRecords: number;
  podiums: number;
  finalWins: number;
  seriesWins: number;
  polePositions: number;
} 