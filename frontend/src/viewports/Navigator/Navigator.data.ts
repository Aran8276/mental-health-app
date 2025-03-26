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
];

// TODO: middleware protected routes disini (protectedRoutes)
