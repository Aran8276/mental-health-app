import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const EmailVerificationView = () => {
  return (
    <>
      <div className="flex justify-center items-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Cek email anda</CardTitle>
            <CardDescription className="mt-2">
              Kami telah mengirim link verifikasi ke email anda
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Silakan periksa kotak masuk Anda dan klik tautan verifikasi untuk
              memverifikasi alamat email Anda. Jika Anda tidak melihat email
              tersebut, periksa folder spam.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="mt-2 w-full">
              <Link to="/login" className="flex items-center justify-center">
                Masuk ke akun
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default EmailVerificationView;
