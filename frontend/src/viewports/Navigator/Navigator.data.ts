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
 dev
    label: "Profile",
    path: "/profile",
    element: createElement(lazy(async () => await import("@/pages/Profile"))),

    label: "Verifikasi",
    path: "/email-verify",
    element: createElement(
      lazy(async () => await import("@/pages/EmailVerification"))
    ),
 dev
  },
];

// TODO: middleware protected routes disini (protectedRoutes)
