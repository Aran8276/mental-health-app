import { RouteItem } from "@/viewports/Navigator/Navigator.type";
import { Dispatch, SetStateAction } from "react";

export interface HeaderProps {
  user: User | null;
  publicRoutes: RouteItem[];
  profileDropdownItems: DropdownItems[];
  mobileSetOpen: Dispatch<SetStateAction<boolean>>;
  mobileOpen: boolean;
  handleLogout: () => void;
}

export interface DropdownItems {
  label: string;
  to: string;
}

export interface CheckUserResponse {
  msg: string;
  payload: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  username: string;
  phone_number: null;
  bio: null;
  gender: null;
  street: null;
  province: null;
  postal: null;
  country: null;
  role: string;
  created_at: Date;
  iat: number;
}

export interface RefreshTokenResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  accessToken: string;
}
