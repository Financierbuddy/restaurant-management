import service from "@/helper/axios";
import { LoginPayload, LoginResponse, SignupAdminPayload, SignupAdminResponse } from "@/types/auth.types";


export function loginAdmin({ email, password }: LoginPayload): Promise<LoginResponse> {
  return service
    .post("/api/login/admin", { email, password })
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    });
}

export function signupAdmin(payload: SignupAdminPayload): Promise<SignupAdminResponse> {
  return service
    .post("/api/register/admin", payload)
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Admin signup failed";
      throw new Error(errorMessage);
    });
}