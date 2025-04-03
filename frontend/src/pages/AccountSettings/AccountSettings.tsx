import { User, CheckUserResponse } from "@/components/Header/Header.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AccountSettingsView from "./AccountSettings.view";
import NotFound from "../NotFound/NotFound";

export default function AccountSettings() {
  const [userFound, setUserFound] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const data: CheckUserResponse = (await client().get("/auth/check")).data;
      setUser(data.user);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status == 401 || error.status == 403) {
          setUser(null);
          setUserFound(false);
          return;
        }
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  document.title = "Setelan Akun - Mental Health App";

  if (!userFound) {
    return <NotFound />;
  }

  return <AccountSettingsView user={user} />;
}
