export interface User {
  id: number;
  email: string;
  name?: string;
  password: string;
  created_at?: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

export interface JWTPayload {
  userId: number;
  email: string;
}
