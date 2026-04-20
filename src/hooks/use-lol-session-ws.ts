import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { lolSessionApi } from '@/api/lol-session';
import { useQueryClient } from '@tanstack/react-query';
import { lolSessionKeys } from './use-lol-session';

export function useLolSessionWs(sessionId: string | undefined) {
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!sessionId) return;

    const token = Cookies.get('access_token');
    if (!token) {
      console.warn('[WS] No access token found, skipping connection');
      return;
    }

    const wsUrl = lolSessionApi.getWsUrl(sessionId, token);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log(`[WS] Connected to session ${sessionId}`);
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('[WS] Message received:', data);
        
        // When dynamic events happen (player joined, status change),
        // we invalidate the session detail query to sync with server.
        queryClient.invalidateQueries({ queryKey: lolSessionKeys.detail(sessionId) });
      } catch (err) {
        console.error('[WS] Failed to parse message:', err);
      }
    };

    ws.onclose = () => {
      console.log('[WS] Disconnected');
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error('[WS] WebSocket error:', err);
    };

    return () => {
      ws.close();
    };
  }, [sessionId, queryClient]);

  return { isConnected };
}
