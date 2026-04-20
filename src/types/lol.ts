import { LolSessionStatus, LolMatchWinner } from './enums';

export interface LolSummonerLookupResponse {
  username: string;
  tag: string;
  rank: string;
  tier: string;
  division: string;
  lp: number;
  profile_icon_id: number;
  summoner_level: number;
}

export interface LolTemporalPlayerV2 {
  username: string;
  tag: string;
  rank: string;
  positions: string[];
}

export interface LolTemporalContestRequestV2 {
  members: LolTemporalPlayerV2[];
}

export interface LolTemporalAssignedPlayer {
  username: string;
  tag: string;
  rank: string;
  position: string;
  position_preference: number;
}

export interface LolTemporalContestResponseWithMatchID {
  match_id: number;
  team_a: LolTemporalAssignedPlayer[];
  team_b: LolTemporalAssignedPlayer[];
}

export interface LolMatchResultRequest {
  winner: LolMatchWinner;
}

export interface LolPlayer {
  user_id: number;
  username: string;
  tag: string;
  rank: string;
  tier: string;
  profile_icon_id: number;
  is_host: boolean;
}

export interface LolBalanceResult {
  match_id: number;
  team_a: LolTemporalAssignedPlayer[];
  team_b: LolTemporalAssignedPlayer[];
}

export interface CreateSessionResponse {
  session_id: string;
}

export interface GetSessionResponse {
  session_id: string;
  host_user_id: number;
  status: LolSessionStatus;
  players: LolPlayer[];
  balance_result: LolBalanceResult | null;
  session_url: string;
  invite_code: string;
  created_at: string;
}

export interface InviteResponse {
  session_id: string;
  session_url: string;
  invite_code: string;
}

export type SummonerLookupParams = {
  nickname?: string;
  name?: string;
  tag?: string;
  region?: string;
};
