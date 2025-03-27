import { FC } from "react";
import ApplicationLogo from "../ApplicationLogo/ApplicationLogo";
import { HeaderProps } from "./Header.type";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileMenuTrigger from "../MobileMenuTrigger/MobileMenuTrigger";

const HeaderView: FC<HeaderProps> = ({
  publicRoutes,
  loggedIn,
  mobileOpen,
  mobileSetOpen,
  profileDropdownItems,
}) => {
  return (
    <header className="sticky top-0 z-50">
      <nav className="relative bg-white shadow dark:bg-gray-800">
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <ApplicationLogo />
              <MobileMenuTrigger setOpen={mobileSetOpen} open={mobileOpen} />
            </div>
            <div
              className={`${
                mobileOpen ? "block" : "hidden"
              } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
            >
              <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                {publicRoutes.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center mt-4 lg:mt-0">
                {loggedIn && (
                  <Button
                    variant={"ghost"}
                    className="bg-inherit"
                    aria-label="show notifications"
                  >
                    <Bell className="w-6 h-6" />
                  </Button>
                )}

                <ModeToggle />

                {loggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center cursor-pointer focus:outline-none"
                        aria-label="toggle profile dropdown"
                      >
                        <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                          <img
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                            className="object-cover w-full h-full"
                            alt="avatar"
                          />
                        </div>
                        <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                          User name
                        </h3>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Hai username 👋</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {profileDropdownItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                          <DropdownMenuItem className="cursor-pointer">
                            {item.label}
                          </DropdownMenuItem>
                        </Link>
                      ))}
                      <DropdownMenuItem className="cursor-pointer text-red-500">
                        Keluar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login">
                    <Button className="cursor-pointer">Masuk</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderView;
