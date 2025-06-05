import { useState } from 'react';
import { getQRCode, submitQRInteraction } from './apis/qr';
import { QRCodeResponse, QRInteractionPayload } from '@/types/auth.types';

export function useQRAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsync = async <T,>(asyncFn: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    clearError: () => setError(null),
    
    // QR Code functions
    getQRCode: (hash: string, slug: string) => handleAsync(() => getQRCode(hash, slug)),
    submitQRInteraction: (payload: QRInteractionPayload) => handleAsync(() => submitQRInteraction(payload)),
  };
} 