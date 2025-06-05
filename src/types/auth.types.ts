export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
}

// Registration Payloads
export interface ClientRegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;  
  phoneNumber: string;
}

export interface PartnerRegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName: string;
  kvkNumber: string;
  vatNumber: string;
}

export interface AdminRegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  adminCode: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
  token?: string;
}

// Profile Management
export interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;  
  country: string;
}

export interface ProfileUpdatePayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: Address;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// User Preferences
export interface AIPreferences {
  personalizedRecommendations: boolean;
  chatbotEnabled: boolean;
  dataProcessing: boolean;
}

export interface UserPreferencesPayload {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: string;
    dataSharing: boolean;
    analytics: boolean;
  };
  ai: AIPreferences;
  language: string;
  currency: string;
  timezone: string;
}

// QR Code Types  
export interface QRCodeResponse {
  hash: string;
  campaignSlug: string;
  data: any;
}

export interface QRInteractionPayload {
  qrHash: string;
  type: 'review' | 'birthday';
  data: ReviewData | BirthdayData;
}

export interface ReviewData {
  rating: number;
  comment: string;
  recommendationScore: number;
}

export interface BirthdayData {
  birthDate: string;
  name: string;
  email: string;
}

// Laravel User format mapping
export interface LaravelUser {
  id: number;
  name: string | null;
  email: string;
  city: string | null;
  phone: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

// Utility function to map Laravel user format to UserProfile format
export function mapLaravelUserToProfile(laravelUser: LaravelUser): UserProfile {
  const nameParts = laravelUser.name ? laravelUser.name.split(' ') : ['', ''];
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return {
    id: laravelUser.id,
    firstName,
    lastName,
    email: laravelUser.email,
    phoneNumber: laravelUser.phone,
    role: 'user', // Default role
    address: laravelUser.city ? {
      street: '',
      houseNumber: '',
      postalCode: '',
      city: laravelUser.city,
      country: 'Netherlands'
    } : undefined,
    createdAt: laravelUser.created_at,
    updatedAt: laravelUser.updated_at,
  };
}

// Legacy types for backward compatibility
export interface SignupPayload {
  name: string;
  email: string;
  phone_no: string;
  password: string;
  passwordConfirm: string;
  age: number;
  gender: string;
  medical_conditions: string;
  address: string;
  pincode: string;
  state_id: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone_no: string;
  };
  token?: string;
}

export interface SignupAdminPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  kvk_number: string;
}

export interface SignupAdminResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    kvk_number: string;
  };
  token?: string;
}
