import { apiClient } from '@/lib/api-client';
import { 
  User, 
  UpdateProfileRequest, 
  ChangePasswordRequest 
} from '@/types/auth';

export const userApi = {
  // GET /api/users/my (Actually redundant with authApi.getMe, but keeping for completeness)
  getMe: () => 
    apiClient.get<User>('/api/users/my'),

  // GET /api/users/:id
  getUser: (id: number | string) =>
    apiClient.get<Partial<User>>(`/api/users/${id}`),

  // PUT /api/users/:id
  updateProfile: (id: number | string, data: UpdateProfileRequest) =>
    apiClient.put<User>(`/api/users/${id}`, data),

  // PATCH /api/users/:id
  changePassword: (id: number | string, data: ChangePasswordRequest) =>
    apiClient.patch(`/api/users/${id}`, data),

  // DELETE /api/users/:id
  deleteAccount: (id: number | string) =>
    apiClient.delete(`/api/users/${id}`),
};
