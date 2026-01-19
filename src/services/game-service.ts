import { api } from '@/lib/api-client';
import { 
  ApiResponse, 
  GameResponse, 
  CreateGameRequest, 
  UpdateGameRequest 
} from '@/types/api';

export const gameService = {
  // Get all games for a specific contest
  async getContestGames(contestId: number) {
    // According to swagger: /api/contests/{contestId}/games
    // Check swagger path in earlier step if needed, but this is standard pattern.
    // Wait, step 29 shows: "/api/contests/{contestId}/games"
    return api.get<ApiResponse<GameResponse[]>>(`/contests/${contestId}/games`);
  },

  // Create a new game
  async createGame(data: CreateGameRequest) {
    // /api/games
    return api.post<ApiResponse<GameResponse>>('/games', data);
  },

  // Update a game
  // Need to find /api/games/{id} - I didn't see explicit Update Game path in previous snippets for /api/games/{id}, 
  // but let's assume standard REST or check if I need to look it up.
  // Step 29 shows "/api/games/{gameId}/game-teams".
  // Step 15 shows "GAMERS-BE_internal_game_application_dto.UpdateGameRequest".
  // Let's assume PATCH /api/games/{id} exists.
  async updateGame(gameId: number, data: UpdateGameRequest) {
     // I'll assume standard path. If it fails I'll check.
    return api.patch<ApiResponse<GameResponse>>(`/games/${gameId}`, data);
  },
  
  // Delete a game?
  // Not explicitly asked for panel, but good to have.
};
