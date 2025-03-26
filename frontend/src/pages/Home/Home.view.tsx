import { FC } from "react";
import { HomeProps } from "./Home.type";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Brain,
  Sparkles,
  ArrowRight,
  BotMessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomeView: FC<HomeProps> = () => {
  return (
    <>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
                <Sparkles className="mr-1 h-4 w-4 text-primary" />
                <span>
                  Perjalananmu menuju kesehatan mental yang lebih baik dimulai
                  di sini
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Ambil kendali atas kesehatan mental Anda
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Mental Health App membantu Anda melacak suasana hati, berlatih
                  mindfulness, dan mengembangkan kebiasaan mental yang sehat
                  dengan bimbingan dan dukungan yang dipersonalisasi.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="px-8 bg-indigo-500 hover:bg-indigo-400 text-white"
                >
                  <Link to="/" className="inline-flex items-center">
                    Daftar Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="#learn-more">Lihat Komunitas</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-medium">JD</span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-medium">ST</span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-medium">RK</span>
                  </div>
                </div>
                <div className="text-muted-foreground">
                  Bergabunglah dengan lebih dari{" "}
                  <span className="font-medium text-foreground">10,000+</span>{" "}
                  pengguna yang sedang memperbaiki kesehatan mental mereka.
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[450px] w-[350px] rounded-2xl bg-gradient-to-b from-primary/20 to-primary/10 p-1 shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-background/90 backdrop-blur-sm" />
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-background">
                  <img
                    src="/hero.jpg"
                    alt="App screenshot"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 rounded-xl"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                <Brain className="mr-1 h-4 w-4" />
                <span>Fitur Utama</span>
              </div>
              <h2 className="text-center text-3xl font-bold tracking-tighter md:text-4xl">
                Semua yang kamu butuhkan untuk kesejahteraan mental
              </h2>
              <p className="text-center max-w-[700px] text-muted-foreground md:text-xl">
                Alat dan sumber daya komprehensif kami dirancang untuk mendukung
                perjalanan kesehatan mentalmu yang unik.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="dark:border-[1px] dark:bg-background md:order-2 relative focus:outline-hidden p-6 flex flex-col justify-center items-center md:min-h-57.5 text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-blue-600 focus:before:border-2 focus:before:border-blue-600 hover:before:shadow-lg dark:before:border-neutral-800 dark:hover:before:border-blue-500 dark:focus:before:border-blue-500 dark:rounded-xl space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Pelacakan Suasana Hati</h3>
              <p className="text-center text-muted-foreground">
                Lacak suasana hati dan emosi harianmu untuk mengidentifikasi
                pola dan pemicu.
              </p>
            </div>
            <div className="dark:border-[1px] dark:bg-background md:order-2 relative focus:outline-hidden p-6 flex flex-col justify-center items-center md:min-h-57.5 text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-blue-600 focus:before:border-2 focus:before:border-blue-600 hover:before:shadow-lg dark:before:border-neutral-800 dark:hover:before:border-blue-500 dark:focus:before:border-blue-500 dark:rounded-xl space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Meditasi Terpandu</h3>
              <p className="text-center text-muted-foreground">
                Akses perpustakaan meditasi terpandu untuk stres, kecemasan,
                tidur, dan banyak lagi.
              </p>
            </div>
            <div className="dark:border-[1px] dark:bg-background md:order-2 relative focus:outline-hidden p-6 flex flex-col justify-center items-center md:min-h-57.5 text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-blue-600 focus:before:border-2 focus:before:border-blue-600 hover:before:shadow-lg dark:before:border-neutral-800 dark:hover:before:border-blue-500 dark:focus:before:border-blue-500 dark:rounded-xl space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <BotMessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Chatbot</h3>
              <p className="text-center text-muted-foreground">
                Dapatkan panduan interaktif untuk mengelola stres, memahami
                emosi, dan mengatasi tantangan mental sehari-hari.
              </p>
            </div>
            <div className="dark:border-[1px] dark:bg-background md:order-2 relative focus:outline-hidden p-6 flex flex-col justify-center items-center md:min-h-57.5 text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-blue-600 focus:before:border-2 focus:before:border-blue-600 hover:before:shadow-lg dark:before:border-neutral-800 dark:hover:before:border-blue-500 dark:focus:before:border-blue-500 dark:rounded-xl space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Pengingat & Tujuan</h3>
              <p className="text-center text-muted-foreground">
                Tetapkan pengingat yang dipersonalisasi dan lacak kemajuan
                menuju tujuan kesehatan mentalmu.
              </p>
            </div>
            <div className="dark:border-[1px] dark:bg-background md:order-2 relative focus:outline-hidden p-6 flex flex-col justify-center items-center md:min-h-57.5 text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-blue-600 focus:before:border-2 focus:before:border-blue-600 hover:before:shadow-lg dark:before:border-neutral-800 dark:hover:before:border-blue-500 dark:focus:before:border-blue-500 dark:rounded-xl space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Dukungan Komunitas</h3>
              <p className="text-center text-muted-foreground">
                Terhubung dengan orang lain yang berada dalam perjalanan serupa
                di komunitas dukungan kami yang dimoderasi.
              </p>
            </div>
            <div className="dark:border-[1px] dark:bg-background md:order-2 relative focus:outline-hidden p-6 flex flex-col justify-center items-center md:min-h-57.5 text-center rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition hover:before:border-2 hover:before:border-blue-600 focus:before:border-2 focus:before:border-blue-600 hover:before:shadow-lg dark:before:border-neutral-800 dark:hover:before:border-blue-500 dark:focus:before:border-blue-500 dark:rounded-xl space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                  <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M12 13V7" />
                  <path d="M9 10h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Jurnal Prompt</h3>
              <p className="text-center text-muted-foreground">
                Prompts yang penuh makna untuk membimbing refleksi dan
                pemrosesan emosionalmu.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button size="lg" asChild className="px-8">
              <Link to="/signup">
                Daftar Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;
