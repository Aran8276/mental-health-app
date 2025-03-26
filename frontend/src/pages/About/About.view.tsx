import { FC } from "react";
import { AboutProps } from "./About.type";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Brain,
  Sparkles,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutView: FC<AboutProps> = () => {
  return (
    <>
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
                <Heart className="mr-1 h-4 w-4 text-primary" />
                <span>Cerita Kami</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Tentang Mental Health App
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Kami berkomitmen untuk membuat kesejahteraan mental dapat
                diakses oleh semua orang, di mana saja.
              </p>
            </div>
          </div>
          <div className="text-justify mx-auto max-w-3xl py-12">
            <div className="prose prose-gray space-y-8 dark:prose-invert max-w-none">
              <p className="lead">
                Aplikasi Kesehatan Mental didirikan pada tahun 2020 dengan visi
                yang sederhana namun kuat: menciptakan dunia di mana setiap
                orang memiliki alat dan dukungan yang mereka butuhkan untuk
                merawat kesejahteraan mental mereka.
              </p>
              <p>
                Perjalanan kami dimulai ketika pendiri kami, Sarah Chen,
                mengalami secara langsung tantangan dalam menemukan sumber daya
                kesehatan mental yang mudah diakses selama masa sulit dalam
                hidupnya. Menyadari bahwa jutaan orang menghadapi hambatan
                serupa dalam mendapatkan layanan kesehatan mental, dia membentuk
                tim yang terdiri dari para profesional kesehatan mental,
                teknolog, dan desainer untuk menciptakan solusi.
              </p>
              <p>
                Hari ini, Aplikasi Kesehatan Mental melayani lebih dari 10.000
                pengguna di seluruh dunia, menyediakan alat berbasis bukti untuk
                pelacakan suasana hati, meditasi, terapi perilaku kognitif, dan
                dukungan komunitas. Kami percaya bahwa layanan kesehatan mental
                harus dapat diakses, dipersonalisasi, dan bebas dari stigma.
              </p>
              <blockquote>
                "Kesehatan mental bukanlah tujuan akhir, melainkan sebuah
                proses. Ini tentang bagaimana Anda menjalani perjalanan, bukan
                ke mana Anda akan pergi."
              </blockquote>
              <p>
                Aplikasi kami dirancang dengan masukan dari terapis
                bersertifikat, psikolog, dan peneliti kesehatan mental untuk
                memastikan bahwa setiap fitur didasarkan pada ilmu pengetahuan
                dan praktik terbaik. Kami berkomitmen untuk terus meningkatkan
                aplikasi berdasarkan umpan balik pengguna dan penelitian terbaru
                dalam bidang kesehatan mental.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 rounded-xl">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                <Brain className="mr-1 h-4 w-4" />
                <span>Nilai-Nilai Kami</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Apa yang Kami Percayai
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Nilai-nilai inti kami membimbing segala hal yang kami lakukan di
                Aplikasi Kesehatan Mental.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Kasih Sayang</h3>
              <p className="text-center text-muted-foreground">
                Kami mendekati kesehatan mental dengan empati, pemahaman, dan
                tanpa penghakiman.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Aksesibilitas</h3>
              <p className="text-center text-muted-foreground">
                Kami percaya bahwa alat kesehatan mental harus tersedia untuk
                semua orang, tanpa memandang latar belakang atau sumber daya
                mereka.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Berdasarkan Bukti</h3>
              <p className="text-center text-muted-foreground">
                Pendekatan kami didasarkan pada penelitian ilmiah dan teknik
                terapi yang telah terbukti.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
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
                  className="mr-1 h-4 w-4 text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Tim Kami</span>
              </div>
              <h2 className="text-center text-3xl font-bold tracking-tighter md:text-4xl">
                Mengenal Orang-orang di Balik Aplikasi Kesehatan Mental
              </h2>
              <p className="text-center max-w-[700px] text-muted-foreground md:text-xl">
                Tim ahli kami yang beragam sangat bersemangat untuk
                mentransformasi layanan kesehatan mental.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg?height=160&width=160"
                  alt="Sarah Chen"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Sarah Chen</h3>
                <p className="text-sm text-muted-foreground">Pendiri & CEO</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mantan terapis dengan lebih dari 10 tahun pengalaman dalam
                  layanan kesehatan mental.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg?height=160&width=160"
                  alt="Dr. Michael Rodriguez"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Dr. Michael Rodriguez</h3>
                <p className="text-sm text-muted-foreground">
                  Chief Clinical Officer
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Psikolog klinis yang mengkhususkan diri dalam terapi perilaku
                  kognitif dan mindfulness.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg?height=160&width=160"
                  alt="Aisha Patel"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Aisha Patel</h3>
                <p className="text-sm text-muted-foreground">Kepala Produk</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Spesialis UX dengan latar belakang dalam teknologi kesehatan
                  dan aksesibilitas.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg?height=160&width=160"
                  alt="James Wilson"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">James Wilson</h3>
                <p className="text-sm text-muted-foreground">CTO</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Software engineer with expertise in secure, scalable health
                  applications.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg?height=160&width=160"
                  alt="Dr. Elena Kim"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Dr. Elena Kim</h3>
                <p className="text-sm text-muted-foreground">
                  Research Director
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Neuroscientist focused on the intersection of technology and
                  mental health outcomes.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg?height=160&width=160"
                  alt="David Okafor"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">David Okafor</h3>
                <p className="text-sm text-muted-foreground">
                  Community Manager
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mental health advocate with experience in building supportive
                  online communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 rounded-xl">
        <div className="container px-4 md:px-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
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
                  className="mr-1 h-4 w-4"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                <span>Our Journey</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Perjalanan Mental Health App
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Dari startup kecil hingga platform kesejahteraan mental global.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold">2020: Pendirian</h3>
                    <p className="text-sm text-muted-foreground">
                      Mental Health App didirikan oleh Sarah Chen setelah
                      perjuangannya secara pribadi dalam mengakses sumber daya
                      kesehatan mental.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold">2021: Peluncuran Beta</h3>
                    <p className="text-sm text-muted-foreground">
                      Versi pertama aplikasi dirilis kepada 500 pengguna beta,
                      dengan fokus pada pelacakan suasana hati dan meditasi
                      terpandu.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold">2022: Peluncuran Publik</h3>
                    <p className="text-sm text-muted-foreground">
                      Mental Health App resmi diluncurkan untuk umum dengan
                      fitur yang diperluas dan dukungan komunitas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold">
                      2023: Kemitraan Penelitian
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Bermitra dengan universitas ternama untuk mempelajari
                      efektivitas intervensi kesehatan mental digital.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">5</span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold">2024: Ekspansi Global</h3>
                    <p className="text-sm text-muted-foreground">
                      Mencapai lebih dari 10.000 pengguna di 30 negara dan
                      meluncurkan versi lokal dalam beberapa bahasa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                <Mail className="mr-1 h-4 w-4" />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Hubungi Kami
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Punya pertanyaan atau saran? Kami sangat senang mendengar dari
                Anda.
              </p>
              <div className="space-y-4 rounded-lg border bg-background p-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      support@mentalhealthapp.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Telepon</h3>
                    <p className="text-sm text-muted-foreground">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Kantor</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Wellness Street
                      <br />
                      San Francisco, CA 94103
                      <br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link to="/contact">
                      Hubungi kami
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="mb-4 font-semibold">Langganan Buletin Kami</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Dapatkan update dengan tips kesejahteraan mental terbaru,
                  penelitian, dan fitur-fitur aplikasi.
                </p>
                <form className="space-y-2">
                  <div className="grid gap-2">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      placeholder="Masukan email anda"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutView;
