import { api } from '@/lib/api-client';
import { 
  ApiResponse, 
  PaginationResponse, 
  ContestResponse, 
  CreateContestRequest, 
  UpdateContestRequest 
} from '@/types/api';

export const contestService = {
  async getContests(params?: { 
    page?: number; 
    page_size?: number; 
    sort_by?: string; 
    order?: 'asc' | 'desc'; 
  }) {
    return api.get<ApiResponse<PaginationResponse<ContestResponse>>>('/contests', { params });
  },

  async getContest(id: number) {
    return api.get<ApiResponse<ContestResponse>>(`/contests/${id}`);
  },

  async createContest(data: CreateContestRequest) {
    return api.post<ApiResponse<ContestResponse>>('/contests', data);
  },

  async updateContest(id: number, data: UpdateContestRequest) {
    return api.patch<ApiResponse<ContestResponse>>(`/contests/${id}`, data);
  },

  async deleteContest(id: number) {
    return api.delete<void>(`/contests/${id}`);
  },
  
  async startContest(id: number) {
    return api.post<ApiResponse<ContestResponse>>(`/contests/${id}/start`);
  },

  async stopContest(id: number) {
    return api.post<ApiResponse<ContestResponse>>(`/contests/${id}/stop`);
  }
};
