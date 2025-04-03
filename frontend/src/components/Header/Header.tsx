import { publicRoutes } from "@/viewports/Navigator/Navigator.data";
import HeaderView from "./Header.view";
import { profileDropdownItems } from "./Header.data";
import { useEffect, useState } from "react";
import { CheckUserResponse, RefreshTokenResponse, User } from "./Header.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [mobileOpen, mobileSetOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const tryRefresh = async () => {
    try {
      const data: RefreshTokenResponse = (
        await client().post("/auth/refresh", {
          refreshToken: localStorage.getItem("mental-jwt-refresh-token"),
        })
      ).data;
      return data.payload;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status == 401 || error.status == 403 || error.status == 400) {
          return false;
        }
      }
    }
  };

  const fetchUser = async (overrideToken?: string) => {
    try {
      if (overrideToken) {
        const data: CheckUserResponse = (
          await client().get("/auth/check", {
            headers: {
              Authorization: `Bearer ${overrideToken}`,
            },
          })
        ).data;
        setUser(data.payload);
        return;
      }

      const data: CheckUserResponse = (await client().get("/auth/check")).data;
      setUser(data.payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status == 401 || error.status == 403) {
          const refreshToken = await tryRefresh();
          if (!refreshToken) {
            setUser(null);
            window.localStorage.removeItem("mental-jwt-token");
            return;
          }

          window.localStorage.setItem(
            "mental-jwt-token",
            refreshToken.accessToken
          );

          fetchUser(refreshToken.accessToken);
        }
      }
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("mental-jwt-token");
      localStorage.removeItem("mental-jwt-refresh-token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
