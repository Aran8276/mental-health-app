import { publicRoutes } from "@/viewports/Navigator/Navigator.data";
import HeaderView from "./Header.view";
import { profileDropdownItems } from "./Header.data";
import { useEffect, useState } from "react";
import { CheckUserResponse, User } from "./Header.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [mobileOpen, mobileSetOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const data: CheckUserResponse = (await client().get("/auth/check")).data;
      setUser(data.user);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status == 401 || error.status == 403) {
          setUser(null);
          return;
        }
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("mental-jwt-token");
      await fetchUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(state);
    fetchUser();
  }, [state]);

  return (
    <HeaderView
      handleLogout={handleLogout}
      user={user}
      mobileOpen={mobileOpen}
      mobileSetOpen={mobileSetOpen}
      profileDropdownItems={profileDropdownItems}
      publicRoutes={publicRoutes}
    />
  );
}
