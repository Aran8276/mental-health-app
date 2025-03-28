import { FC } from "react";
import { LoginProps } from "./Login.type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadableButton from "@/components/LoadableButton/LoadableButton";

const LoginView: FC<LoginProps> = ({ form, onSubmit, error, loading }) => {
  return (
    <div className="flex px-8 md:px-0 py-16 justify-center h-screen">
      <div className="mx-auto max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Selamat Datang</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Masukan username dan password anda untuk masuk ke akun anda
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <FormDescription>
                      <Link
                        to="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Lupa kata sandi?
                      </Link>
                    </FormDescription>
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
              Masuk
            </LoadableButton>
            <Link to="/register">
              <Button variant="outline" className="w-full">
                Daftar
              </Button>
            </Link>
          </form>
        </Form>
        <Separator />
      </div>
    </div>
  );
};

export default LoginView;
