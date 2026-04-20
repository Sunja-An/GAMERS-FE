import { UserRole } from './enums';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  username: string;
  tag: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateProfileRequest {
  username?: string;
  tag?: string;
  bio?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  password: string;
}

export interface LogoutRequest {
  access_token: string;
  refresh_token: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  tag: string;
  bio?: string;
  avatar?: string;
  profileKey?: string;
  createdAt: string;
  modifiedAt: string;
  role?: UserRole; // Keep for legacy/admin support if needed

  // Valorant-related fields
  riotName?: string | null;
  riotTag?: string | null;
  region?: string | null;
  currentTier?: number | null;
  currentTierPatched?: string | null;
  elo?: number | null;
  rankingInTier?: number | null;
  peakTier?: number | null;
  peakTierPatched?: string | null;
  valorantUpdatedAt?: string | null;
}

export interface AuthResponseData {
  user: User;
  tokens: AuthTokens;
}

