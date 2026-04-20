import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api/user';
import { UpdateProfileRequest, ChangePasswordRequest } from '@/types/auth';

export function useUserProfile(id: number | string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateProfileRequest }) => 
      userApi.updateProfile(id, data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user'], updatedUser);
      queryClient.invalidateQueries({ queryKey: ['user', updatedUser.id] });
    },
    onError: (error: any) => {
      console.error(error.message || '프로필 업데이트에 실패했습니다.');
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: ChangePasswordRequest }) => 
      userApi.changePassword(id, data),
    onSuccess: () => {
      // Password changed successfully
    },
    onError: (error: any) => {
      console.error(error.message || '비밀번호 변경에 실패했습니다.');
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => userApi.deleteAccount(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      window.location.href = '/';
    },
    onError: (error: any) => {
      console.error(error.message || '계정 탈퇴에 실패했습니다.');
    },
  });
}

