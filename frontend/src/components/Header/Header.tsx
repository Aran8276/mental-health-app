import { publicRoutes } from "@/viewports/Navigator/Navigator.data";
import HeaderView from "./Header.view";
import { profileDropdownItems } from "./Header.data";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, mobileSetOpen] = useState(false);
  const loggedIn = true;

  return (
    <HeaderView
      mobileOpen={mobileOpen}
      mobileSetOpen={mobileSetOpen}
      profileDropdownItems={profileDropdownItems}
      loggedIn={loggedIn}
      publicRoutes={publicRoutes}
    />
  );
}
