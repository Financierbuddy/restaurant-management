# Laravel API Integration for Next.js Restaurant Management App

This document outlines the complete integration between your Next.js frontend and Laravel backend API.

## 🚀 Quick Start

### 1. Environment Setup

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_API_URL=https://your-laravel-api-domain.com/api/
```

### 2. Add AuthProvider to your app

Update your `src/app/layout.tsx`:

```tsx
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## 📚 API Endpoints Overview

### 🔐 Authentication & Registration

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User login |
| `/auth/client/register` | POST | Client registration |
| `/auth/partner/register` | POST | Partner registration |
| `/auth/admin/register` | POST | Admin registration |
| `/logout` | POST | User logout |

### 👤 Profile Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/profile` | GET | Get user profile |
| `/profile` | PUT | Update user profile |

### 👥 User Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/users/me` | GET | Get current user |
| `/users/{id}` | GET | Get user by ID |
| `/users/preferences` | POST | Set user preferences |
| `/users/{id}/preferences` | GET | Get user preferences |

### 📱 QR Code & Interactions

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/qr/{hash}/{slug}` | GET | Get QR code data |
| `/qr/interacties` | POST | Submit QR interaction |

## 🛠️ Usage Examples

### Authentication

```tsx
import { useAuthAPI } from '@/hooks/useAuthAPI';
import { useAuth } from '@/contexts/AuthContext';

function LoginComponent() {
  const { login, loading, error } = useAuthAPI();
  const { login: setAuthState } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const result = await login({ email, password });
    if (result) {
      setAuthState(result.token, result.user);
      // Redirect to dashboard
    }
  };

  return (
    // Your login form JSX
  );
}
```

### Registration

```tsx
import { useAuthAPI } from '@/hooks/useAuthAPI';

function RegisterComponent() {
  const { registerClient, registerPartner, registerAdmin } = useAuthAPI();

  // Client registration
  const handleClientRegister = async (data: ClientRegisterPayload) => {
    const result = await registerClient(data);
    if (result) {
      console.log('Client registered:', result);
    }
  };

  // Partner registration
  const handlePartnerRegister = async (data: PartnerRegisterPayload) => {
    const result = await registerPartner(data);
    if (result) {
      console.log('Partner registered:', result);
    }
  };

  // Admin registration
  const handleAdminRegister = async (data: AdminRegisterPayload) => {
    const result = await registerAdmin(data);
    if (result) {
      console.log('Admin registered:', result);
    }
  };
}
```

### Profile Management

```tsx
import { useAuthAPI } from '@/hooks/useAuthAPI';

function ProfileComponent() {
  const { getProfile, updateProfile } = useAuthAPI();

  const handleGetProfile = async () => {
    const profile = await getProfile();
    if (profile) {
      console.log('User profile:', profile);
    }
  };

  const handleUpdateProfile = async (data: ProfileUpdatePayload) => {
    const updatedProfile = await updateProfile(data);
    if (updatedProfile) {
      console.log('Profile updated:', updatedProfile);
    }
  };
}
```

### QR Code Interactions

```tsx
import { useQRAPI } from '@/hooks/useQRAPI';

function QRComponent() {
  const { getQRCode, submitQRInteraction } = useQRAPI();

  const handleGetQRData = async (hash: string, slug: string) => {
    const qrData = await getQRCode(hash, slug);
    if (qrData) {
      console.log('QR Data:', qrData);
    }
  };

  const handleSubmitReview = async (qrHash: string) => {
    const payload = {
      qrHash,
      type: 'review' as const,
      data: {
        rating: 5,
        comment: 'Great service!',
        recommendationScore: 9,
      },
    };

    const result = await submitQRInteraction(payload);
    if (result !== null) {
      console.log('Review submitted successfully');
    }
  };

  const handleSubmitBirthday = async (qrHash: string) => {
    const payload = {
      qrHash,
      type: 'birthday' as const,
      data: {
        birthDate: '1990-01-01',
        name: 'John Doe',
        email: 'john@example.com',
      },
    };

    const result = await submitQRInteraction(payload);
    if (result !== null) {
      console.log('Birthday data submitted successfully');
    }
  };
}
```

## 🔧 API Service Functions

### Authentication Services (`src/hooks/apis/auth.tsx`)

```tsx
// Login
login(payload: LoginPayload): Promise<LoginResponse>

// Registration
registerClient(payload: ClientRegisterPayload): Promise<RegisterResponse>
registerPartner(payload: PartnerRegisterPayload): Promise<RegisterResponse>
registerAdmin(payload: AdminRegisterPayload): Promise<RegisterResponse>

// Profile
getProfile(): Promise<UserProfile>
updateProfile(payload: ProfileUpdatePayload): Promise<UserProfile>

// User Management
getCurrentUser(): Promise<UserProfile>
getUserById(id: number): Promise<UserProfile>
setUserPreferences(payload: UserPreferencesPayload): Promise<void>
getUserPreferences(id: number): Promise<AIPreferences>

// Logout
logout(): Promise<void>
```

### QR Code Services (`src/hooks/apis/qr.tsx`)

```tsx
// Get QR code data
getQRCode(hash: string, slug: string): Promise<QRCodeResponse>

// Submit QR interaction
submitQRInteraction(payload: QRInteractionPayload): Promise<void>
```

## 🎯 React Hooks

### useAuthAPI Hook

Provides all authentication-related functions with loading states and error handling:

```tsx
const {
  loading,
  error,
  clearError,
  login,
  logout,
  registerClient,
  registerPartner,
  registerAdmin,
  getProfile,
  updateProfile,
  getCurrentUser,
  getUserById,
  setUserPreferences,
  getUserPreferences,
} = useAuthAPI();
```

### useQRAPI Hook

Provides QR code-related functions:

```tsx
const {
  loading,
  error,
  clearError,
  getQRCode,
  submitQRInteraction,
} = useQRAPI();
```

### useAuth Context Hook

Provides authentication state management:

```tsx
const {
  user,
  isAuthenticated,
  isLoading,
  login,
  logout,
  updateUser,
  refreshUser,
} = useAuth();
```

## 📝 TypeScript Types

All types are defined in `src/types/auth.types.ts`:

### Request Types
- `LoginPayload`
- `ClientRegisterPayload`
- `PartnerRegisterPayload`
- `AdminRegisterPayload`
- `ProfileUpdatePayload`
- `UserPreferencesPayload`
- `QRInteractionPayload`

### Response Types
- `LoginResponse`
- `RegisterResponse`
- `UserProfile`
- `AIPreferences`
- `QRCodeResponse`

### Data Types
- `Address`
- `ReviewData`
- `BirthdayData`

## 🔒 Authentication Flow

1. **Login**: User provides credentials → API returns token and user data → Token stored in cookies → User state updated
2. **Auto-login**: On app load → Check for existing token → Fetch user data → Update auth state
3. **Logout**: Clear token from cookies → Reset user state → Redirect to login
4. **Token Refresh**: Automatic token validation on API calls → Auto-logout on invalid token

## 🌐 API Configuration

The axios instance is configured in `src/helper/axios.tsx` with:

- **Base URL**: From environment variable `NEXT_PUBLIC_API_URL`
- **Request Interceptor**: Automatically adds Bearer token to requests
- **Response Interceptor**: Handles authentication errors and token cleanup
- **Error Handling**: Consistent error message extraction

## 📱 Example Components

Check out these example components to see the API integration in action:

- `src/components/examples/LoginExample.tsx` - Complete login form
- `src/components/examples/RegistrationExample.tsx` - Multi-role registration
- `src/components/examples/QRInteractionExample.tsx` - QR code interactions

## 🚨 Error Handling

All API functions include comprehensive error handling:

```tsx
try {
  const result = await login(credentials);
  // Handle success
} catch (error) {
  // Error is automatically captured by the hook
  console.error('Login failed:', error.message);
}
```

## 🔄 State Management

The app uses React Context for global authentication state:

- **AuthContext**: Manages user authentication state
- **Persistent Storage**: Uses js-cookie for token persistence
- **Auto-refresh**: Automatically refreshes user data on app load

## 🎨 UI Integration

All example components use Tailwind CSS classes and are fully responsive. You can customize the styling to match your app's design system.

## 🧪 Testing the Integration

1. Start your Laravel API server
2. Update the `NEXT_PUBLIC_API_URL` in your `.env.local`
3. Use the example components to test each endpoint
4. Check browser network tab to verify API calls
5. Monitor Laravel logs for any backend issues

## 📞 Support

If you encounter any issues with the API integration:

1. Check the browser console for JavaScript errors
2. Verify the API URL in your environment variables
3. Ensure your Laravel API is running and accessible
4. Check CORS settings on your Laravel backend
5. Verify authentication tokens are being sent correctly

---

This integration provides a complete, type-safe, and production-ready connection between your Next.js frontend and Laravel backend. All endpoints from your Laravel API are now accessible through clean, reusable React hooks with proper error handling and loading states. 