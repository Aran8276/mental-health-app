import { FC } from "react";
import { LoginProps } from "./Login.type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const LoginView: FC<LoginProps> = () => {
  return (
    <div className="flex py-16 justify-center h-screen">
      <div className="mx-auto max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Selamat Datang</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Masukan username dan password anda untuk masuk ke akun anda
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="ToyotaCorolla123"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Kata Sandi</Label>
              <Link to="#" className="ml-auto inline-block text-sm underline">
                Lupa kata sandi?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full">Masuk</Button>
          <Link to="/register">
            <Button variant="outline" className="w-full">
              Daftar
            </Button>
          </Link>
        </div>
        <Separator />
        {/* <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm leading-none">
              Don't have an account?
              <Link to="#" className="underline">
                Sign up
              </Link>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginView;
