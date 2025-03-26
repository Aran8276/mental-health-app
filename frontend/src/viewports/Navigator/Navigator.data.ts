import { createElement, lazy } from "react";
import { RouteItem } from "./Navigator.type";

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
];
