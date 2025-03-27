import { FC } from "react";
import { RegisterProps } from "./Register.type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const RegisterView: FC<RegisterProps> = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="mx-auto max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Selamat Datang</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Masukan username dan password anda untuk masuk ke akun anda
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row space-x-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">Nama Depan</Label>
              <Input id="first-name" type="text" placeholder="Honda" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Nama Belakang</Label>
              <Input id="last-name" type="text" placeholder="Jazz" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="toyota@corolla.com"
              required
            />
          </div>
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
            <Label htmlFor="password">Kata Sandi</Label>
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full">Daftar</Button>
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Masuk
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

export default RegisterView;
