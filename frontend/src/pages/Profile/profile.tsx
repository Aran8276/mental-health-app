import { User, CheckUserResponse } from "@/components/Header/Header.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import ProfileView from "./Profile.view";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { GetUserByIDResponse } from "./Profile.type";

export default function Profile() {
  const [userFound, setUserFound] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const id = params.id;

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

  const fetchUserById = useCallback(async () => {
    try {
      const data: GetUserByIDResponse = (await client().get(`/user/${id}`))
        .data;
      setUser(data.payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status == 404) {
          setUser(null);
          setUserFound(false);
          return;
        }
        console.log(error.message);
        toast(error.message);
      }
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchUserById();
      return;
    }

    fetchUser();
  }, [id, fetchUserById]);

  document.title = "Profil - Mental Health App";

  if (!userFound) {
    return <NotFound />;
  }

  return <ProfileView user={user} />;
}
