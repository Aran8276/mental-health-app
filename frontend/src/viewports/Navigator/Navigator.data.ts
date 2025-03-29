import { createElement, lazy } from "react";
import { RouteItem } from "./Navigator.type";

// public routes akan tampil di navbar
export const publicRoutes: RouteItem[] = [
  {
    label: "Beranda",
    path: "/",
    element: createElement(lazy(async () => await import("@/pages/Home"))),
  },
  {
    label: "Tentang",
    path: "/about",
    element: createElement(lazy(async () => await import("@/pages/About"))),
  },
  {
    label: "AI Chatbot",
    path: "/ai-chatbot",
    element: createElement(lazy(async () => await import("@/pages/AIChatbot"))),
  },
  {
    label: "Komunitas",
    path: "/community",
    element: createElement(lazy(async () => await import("@/pages/Community"))),
  },
];

// private tidak
export const privateRoutes: RouteItem[] = [
  {
    label: "Komunitas",
    path: "/community/:id",
    element: createElement(
      lazy(async () => await import("@/pages/CommunityThread"))
    ),
  },
  {
    label: "Komunitas",
    path: "/create-thread",
    element: createElement(
      lazy(async () => await import("@/pages/CommunityForm"))
    ),
  },
  {
    label: "Masuk",
    path: "/login",
    element: createElement(lazy(async () => await import("@/pages/Login"))),
  },
  {
    label: "Daftar",
    path: "/register",
    element: createElement(lazy(async () => await import("@/pages/Register"))),
  },
  {
    label: "Profil",
    path: "/profile",
    element: createElement(lazy(async () => await import("@/pages/Profile"))),
  },
  {
    label: "Profil By Id",
    path: "/profile/:id",
    element: createElement(lazy(async () => await import("@/pages/Profile"))),
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    element: createElement(lazy(async () => await import("@/pages/Dashboard"))),
  },
  {
    label: "Setelan Akun",
    path: "/account-settings",
    element: createElement(
      lazy(async () => await import("@/pages/AccountSettings"))
    ),
  },
  {
    label: "Ubah Kata Sandi",
    path: "/account-settings/change-password",
    element: createElement(
      lazy(async () => await import("@/pages/PasswordChange"))
    ),
  },
  {
    label: "Verifikasi",
    path: "/email-verify",
    element: createElement(
      lazy(async () => await import("@/pages/EmailVerification"))
    ),
  },
];
