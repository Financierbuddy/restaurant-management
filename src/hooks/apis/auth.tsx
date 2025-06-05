import service from "@/helper/axios";
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
  LaravelUser,
  mapLaravelUserToProfile
} from "@/types/auth.types";

// 🔐 Authentication & Registration
export function login(payload: LoginPayload): Promise<LoginResponse> {
  return service
    .post("/auth/login", payload)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    });
}

export function registerClient(payload: ClientRegisterPayload): Promise<RegisterResponse> {
  return service
    .post("/auth/client/register", payload)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Client registration failed";
      throw new Error(errorMessage);
    });
}

export function registerPartner(payload: PartnerRegisterPayload): Promise<RegisterResponse> {
  return service
    .post("/auth/partner/register", payload)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Partner registration failed";
      throw new Error(errorMessage);
    });
}

export function registerAdmin(payload: AdminRegisterPayload): Promise<RegisterResponse> {
  return service
    .post("/auth/admin/register", payload)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Admin registration failed";
      throw new Error(errorMessage);
    });
}

export function logout(): Promise<void> {
  return service
    .post("/logout")
    .then(() => {
      // Clear token from cookies on successful logout
      if (typeof window !== "undefined") {
        const Cookies = require("js-cookie");
        Cookies.remove("token");
      }
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Logout failed";
      throw new Error(errorMessage);
    });
}

// 👤 Profile Management - Updated to handle Laravel response
export function getProfile(): Promise<UserProfile> {
  return service
    .get("/profile")
    .then((res) => {
      // If the response is a Laravel user format, map it
      const data = res.data;
      if (data.name !== undefined && data.firstName === undefined) {
        // This is Laravel format, map it
        return mapLaravelUserToProfile(data as LaravelUser);
      }
      // Otherwise assume it's already in UserProfile format
      return data as UserProfile;
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Failed to fetch profile";
      throw new Error(errorMessage);
    });
}

export function updateProfile(payload: ProfileUpdatePayload): Promise<UserProfile> {
  return service
    .put("/profile", payload)
    .then((res) => {
      // If the response is a Laravel user format, map it
      const data = res.data;
      if (data.name !== undefined && data.firstName === undefined) {
        // This is Laravel format, map it
        return mapLaravelUserToProfile(data as LaravelUser);
      }
      // Otherwise assume it's already in UserProfile format
      return data as UserProfile;
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Profile update failed";
      throw new Error(errorMessage);
    });
}

// 👥 User Management - Updated to handle Laravel response
export function getCurrentUser(): Promise<UserProfile> {
  return service
    .get("/users/me")
    .then((res) => {
      // If the response is a Laravel user format, map it
      const data = res.data;
      if (data.name !== undefined && data.firstName === undefined) {
        // This is Laravel format, map it
        return mapLaravelUserToProfile(data as LaravelUser);
      }
      // Otherwise assume it's already in UserProfile format
      return data as UserProfile;
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Failed to fetch current user";
      throw new Error(errorMessage);
    });
}

export function getUserById(id: number): Promise<UserProfile> {
  return service
    .get(`/users/${id}`)
    .then((res) => {
      // If the response is a Laravel user format, map it
      const data = res.data;
      if (data.name !== undefined && data.firstName === undefined) {
        // This is Laravel format, map it
        return mapLaravelUserToProfile(data as LaravelUser);
      }
      // Otherwise assume it's already in UserProfile format
      return data as UserProfile;
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Failed to fetch user";
      throw new Error(errorMessage);
    });
}

export function setUserPreferences(payload: UserPreferencesPayload): Promise<UserPreferencesPayload> {
  return service
    .post("/users/preferences", payload)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Failed to set preferences";
      throw new Error(errorMessage);
    });
}

export function getUserPreferences(id: number): Promise<UserPreferencesPayload> {
  return service
    .get(`/users/${id}/preferences`)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Failed to fetch preferences";
      throw new Error(errorMessage);
    });
}

// Legacy functions for backward compatibility
export function loginAdmin({ email, password }: LoginPayload): Promise<LoginResponse> {
  return login({ email, password });
}

export function signupAdmin(payload: any): Promise<any> {
  // This can be mapped to the new registerAdmin function if needed
  return service
    .post("/api/register/admin", payload)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Admin signup failed";
      throw new Error(errorMessage);
    });
}
