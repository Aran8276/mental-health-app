import { publicRoutes } from "@/viewports/Navigator/Navigator.data";
import HeaderView from "./Header.view";

export default function Header() {
  return <HeaderView publicRoutes={publicRoutes} />;
}
