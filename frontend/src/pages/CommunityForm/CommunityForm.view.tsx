import { FC } from "react";
import { CommunityFormProps } from "./CommunityForm.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const CommunityFormView: FC<CommunityFormProps> = () => {
  return (
    <>
      <section className="flex flex-col space-y-12 w-full">
        <h1 className="text-4xl font-bold tracking-tighter">
          Buat Percakapan Baru
        </h1>
        <div>
          <Link to="/community">
            <Button className="cursor-pointer">Kembali ke Komunitas</Button>
          </Link>
        </div>
        <Card className="mb-8 bg-amber-50 dark:bg-slate-900 dark:border-inherit border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <span>Tips untuk Posting</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Bersikaplah spesifik</strong> tentang apa yang Anda
                alami agar orang lain dapat lebih memahami.
              </li>
              <li>
                <strong>Fokus pada perasaan</strong> daripada hanya kejadian -
                jelaskan bagaimana situasi memengaruhi Anda.
              </li>
              <li>
                <strong>Ajukan pertanyaan dengan jelas</strong> jika Anda
                mencari saran atau perspektif tertentu.
              </li>
              <li>
                <strong>Sebutkan apa yang sudah Anda coba</strong> sehingga
                orang dapat menyarankan pendekatan baru.
              </li>
              <li>
                <strong>Pertimbangkan batasan Anda</strong> - hanya bagikan
                hal-hal yang nyaman Anda diskusikan secara terbuka.
              </li>
            </ul>{" "}
          </CardContent>
        </Card>

        <Card>
          <form>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Judul
                </label>
                <Input
                  id="title"
                  placeholder="Ringkas pertanyaan atau situasi Anda"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="body" className="text-sm font-medium">
                  Konten
                </label>
                <Textarea
                  id="body"
                  placeholder="Jelaskan situasi, perasaan, atau pertanyaan Anda secara detail..."
                  className="min-h-[200px] resize-y"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="py-8">
              <Button type="submit" className="w-full sm:w-auto ml-auto">
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Kirim
                </span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </>
  );
};

export default CommunityFormView;
