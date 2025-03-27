import { publicRoutes } from "@/viewports/Navigator/Navigator.data";
import HeaderView from "./Header.view";

export default function Header() {
  const loggedIn = true;

  return <HeaderView loggedIn={loggedIn} publicRoutes={publicRoutes} />;
}
