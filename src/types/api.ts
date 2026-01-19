export type ApiResponse<T> = {
  data: T;
  message: string;
  status: number;
};

export type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
};

// --- Auth & User ---

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  access_token: string;
  refresh_token: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password?: string;
  tag: string;
  avatar?: string;
  bio?: string;
}

export interface UserResponse {
  user_id: number;
  email: string;
  created_at: string;
  modified_at: string;
  // Based on CreateUserRequest, these might be returned or accessed via other endpoints,
  // but UserResponse in swagger only lists these 4 fields strictly.
  // We might want to extend it if the actual API returns more, but sticking to swagger for now.
}

// --- Contests ---

export type ContestStatus = 'PENDING' | 'ACTIVE' | 'FINISHED' | 'CANCELLED';
export type ContestType = 'TOURNAMENT' | 'LEAGUE' | 'CASUAL';
export type GameType = 'VALORANT' | 'LOL';

export interface ContestResponse {
  contest_id: number;
  title: string;
  description?: string;
  contest_type: ContestType;
  game_type: GameType;
  contest_status: ContestStatus;
  max_team_count: number;
  current_team_count?: number; // Not in swagger but common, check logic later
  total_team_member: number;
  total_point: number;
  thumbnail?: string;
  started_at?: string;
  ended_at?: string;
  created_at: string;
  modified_at?: string;
  auto_start?: boolean;
  game_point_table_id?: number;
  discord_guild_id?: string;
  discord_text_channel_id?: string;
}

export interface CreateContestRequest {
  title: string;
  description?: string;
  contest_type: ContestType;
  game_type?: GameType;
  max_team_count?: number;
  total_team_member?: number;
  total_point?: number;
  thumbnail?: string;
  started_at?: string;
  ended_at?: string;
  auto_start?: boolean;
  game_point_table_id?: number;
  discord_guild_id?: string;
  discord_text_channel_id?: string;
}

export interface UpdateContestRequest {
  title?: string;
  description?: string;
  contest_type?: ContestType;
  game_type?: GameType;
  contest_status?: ContestStatus;
  max_team_count?: number;
  total_team_member?: number;
  total_point?: number;
  thumbnail?: string;
  started_at?: string;
  ended_at?: string;
  auto_start?: boolean;
  game_point_table_id?: number;
  discord_guild_id?: string;
  discord_text_channel_id?: string;
}

export interface DiscordLinkRequiredResponse {
  message: string;
  oauth_url: string;
}

// --- Games ---

export type GameStatus = 'PENDING' | 'ACTIVE' | 'FINISHED' | 'CANCELLED';
export type GameTeamType = 'SINGLE' | 'DUO' | 'TRIO' | 'FULL' | 'HURUPA';

export interface GameResponse {
  game_id: number;
  contest_id: number;
  game_status: GameStatus;
  game_team_type: GameTeamType;
  started_at: string;
  ended_at: string;
  created_at: string;
  modified_at?: string;
}

export interface CreateGameRequest {
  contest_id: number;
  game_team_type: GameTeamType;
  started_at: string;
  ended_at: string;
}

export interface UpdateGameRequest {
  game_status?: GameStatus;
  game_team_type?: GameTeamType;
  started_at?: string;
  ended_at?: string;
}
