import { useEffect, useState } from "react";
import CommunityView from "./Community.view";
import {
  FetchThreadResponse,
  GetAllUserResponse,
  OmittedUser,
  Thread,
} from "./Community.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useUser } from "@/components/Header/Header.context";

export default function Community() {
  const { user } = useUser();
  const [users, setUser] = useState<OmittedUser[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);

  const fetchThreads = async () => {
    try {
      const data: FetchThreadResponse = (await client().get("/thread")).data;
      setThreads(data.payload.threads);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const data: GetAllUserResponse = (await client().get("/user/all-users"))
        .data;
      setUser(data.payload.users);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  useEffect(() => {
    fetchThreads();
    fetchUsers();
  }, []);

  document.title = "Forum Komunitas - Mental Health App";
  return <CommunityView loggedIn={user} users={users} threads={threads} />;
}
