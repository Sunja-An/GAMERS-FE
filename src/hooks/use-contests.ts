import { useState, useEffect, useCallback } from 'react';
import { contestService } from '@/services/contest-service';
import { ContestResponse, PaginationResponse, CreateContestRequest, UpdateContestRequest } from '@/types/api';
import { ApiError } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

export function useContests(initialParams = { page: 1, page_size: 10, sort_by: 'created_at', order: 'desc' as const }) {
  const [contests, setContests] = useState<ContestResponse[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse<ContestResponse> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState(initialParams);

  const fetchContests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await contestService.getContests(params);
      if (response.data) {
        setContests(response.data.data);
        setPagination(response.data);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch contests');
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  const goToPage = (page: number) => {
    setParams(prev => ({ ...prev, page }));
  };

  return {
    contests,
    pagination,
    loading,
    error,
    params,
    setParams,
    goToPage,
    refresh: fetchContests,
  };
}

export function useContest(id: number | null) {
  const [contest, setContest] = useState<ContestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContest = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await contestService.getContest(id);
      setContest(response.data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch contest');
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContest();
  }, [fetchContest]);

  return { contest, loading, error, refresh: fetchContest };
}

export function useContestActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const createContest = async (data: CreateContestRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contestService.createContest(data);
      if (response.data) {
        router.push(`/contests/${response.data.contest_id}`);
      }
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        throw err;
      } else {
        setError('Failed to create contest');
        throw new Error('Failed to create contest');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateContest = async (id: number, data: UpdateContestRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contestService.updateContest(id, data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        throw err;
      } else {
        setError('Failed to update contest');
        throw new Error('Failed to update contest');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteContest = async (id: number) => {
     setLoading(true);
     setError(null);
     try {
       await contestService.deleteContest(id);
       router.push('/contests');
     } catch (err) {
       if (err instanceof ApiError) {
         setError(err.message);
         throw err;
       } else {
         setError('Failed to delete contest');
         throw new Error('Failed to delete contest');
       }
     } finally {
       setLoading(false);
     }
  };

  return {
    createContest,
    updateContest,
    deleteContest,
    loading,
    error,
  };
}
