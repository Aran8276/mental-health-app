import { User } from "@/components/Header/Header.type";

export interface ProfileProps {
  user: User | null;
  isMine: boolean;
}

export interface GetUserByIDResponse {
  msg: string;
  payload: User;
}
