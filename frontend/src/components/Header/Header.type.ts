import { RouteItem } from "@/viewports/Navigator/Navigator.type";
import { Dispatch, SetStateAction } from "react";

export interface CheckUserResponse {
  msg: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
  iat: number;
}

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
