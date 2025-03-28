import { FC } from "react";
import { RegisterProps } from "./Register.type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadableButton from "@/components/LoadableButton/LoadableButton";

const RegisterView: FC<RegisterProps> = ({
  form,
  onSubmit,
  error,
  loading,
}) => {
  return (
    <div className="flex px-8 md:px-0 justify-center h-screen">
      <div className="mx-auto max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Hai 👋</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Selamat datang di Mental Health App. Ayo kita daftarkan akun anda
            secara gratis!
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row space-x-4">
              <div className="space-y-2 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Honda Jazz"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="toyota@corolla.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        type="text"
                        placeholder="ToyotaCorolla123"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Kata Sandi</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <LoadableButton
              isLoading={loading}
              type="submit"
              className="w-full"
            >
              Daftar
            </LoadableButton>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                Masuk
              </Button>
            </Link>
          </form>
        </Form>
        <Separator />
      </div>
    </div>
  );
};

export default RegisterView;
