import { useState } from 'react';
import { 
  login, 
  registerClient, 
  registerPartner, 
  registerAdmin, 
  logout, 
  getProfile, 
  updateProfile, 
  getCurrentUser, 
  getUserById, 
  setUserPreferences, 
  getUserPreferences 
} from './apis/auth';
import { 
  LoginPayload, 
  LoginResponse, 
  ClientRegisterPayload, 
  PartnerRegisterPayload, 
  AdminRegisterPayload, 
  RegisterResponse, 
  ProfileUpdatePayload, 
  UserProfile, 
  UserPreferencesPayload, 
  AIPreferences 
} from '@/types/auth.types';

export function useAuthAPI() {
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
    
    // Authentication
    login: (payload: LoginPayload) => handleAsync(() => login(payload)),
    logout: () => handleAsync(() => logout()),
    
    // Registration
    registerClient: (payload: ClientRegisterPayload) => handleAsync(() => registerClient(payload)),
    registerPartner: (payload: PartnerRegisterPayload) => handleAsync(() => registerPartner(payload)),
    registerAdmin: (payload: AdminRegisterPayload) => handleAsync(() => registerAdmin(payload)),
    
    // Profile Management
    getProfile: () => handleAsync(() => getProfile()),
    updateProfile: (payload: ProfileUpdatePayload) => handleAsync(() => updateProfile(payload)),
    
    // User Management
    getCurrentUser: () => handleAsync(() => getCurrentUser()),
    getUserById: (id: number) => handleAsync(() => getUserById(id)),
    setUserPreferences: (payload: UserPreferencesPayload) => handleAsync(() => setUserPreferences(payload)),
    getUserPreferences: (id: number) => handleAsync(() => getUserPreferences(id)),
  };
} 