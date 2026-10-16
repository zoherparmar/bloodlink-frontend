import { api } from "./api";

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export type BloodGroup = (typeof BLOOD_GROUPS)[number];

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  bloodGroup: BloodGroup;
  city: string;
  address: string;
  accountType: "seeker" | "donor";
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  bloodGroup?: string;
  city?: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export interface SignupResponse {
  accessToken: string;
  user: AuthUser;
}

export const AuthAPI = {
  login: (request: LoginRequest) =>
    api.post<LoginResponse>("/auth/login", request),

  signup: (request: SignupRequest) => {
    const payload = {
      name: request.fullName.trim(),
      email: request.email.trim(),
      password: request.password,
      isDonor: request.accountType === "donor",
      bloodGroup: request.bloodGroup,
      city: request.city.trim(),
      phone: request.phone,
      address: request.address.trim(),
    };

    return api.post<SignupResponse>("/auth/register", payload);
  },
};
