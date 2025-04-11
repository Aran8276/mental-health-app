import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Brain,
  Sparkles,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  // Users,
  CalendarCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  fadeUp,
  sectionVariants,
  gridContainerVariants,
  cardHover,
  iconHover,
  // teamMemberHover,
  fadeLeft,
  timelineItemHover,
  timelineDotHover,
  fadeRight,
  buttonHoverTap,
  purpleBgLight,
  purpleColor,
  vibrantAccent,
  vibrantAccentBg,
  vibrantAccentBgLight,
  vibrantPrimary,
  vibrantPrimaryBg,
  vibrantPrimaryBgLight,
} from "./About.data";
import SectionHeader from "@/components/SectionHeader";

const AboutView: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-x-hidden"
    >
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-center w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-teal-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30"
      >
        <div className="container px-4 md:px-6">
          <motion.div variants={fadeUp}>
            {" "}
            <SectionHeader
              icon={Heart}
              badgeText="Cerita Kami"
              title="Tentang Mental Health App"
              subtitle="Kami berkomitmen untuk membuat kesejahteraan mental dapat diakses oleh semua orang, di mana saja."
              iconColorClass={vibrantPrimary}
              badgeBgClass={vibrantPrimaryBgLight}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="text-justify mx-auto max-w-3xl py-12"
          >
            <div className="prose px-6 md:px-0 prose-lg prose-gray dark:prose-invert max-w-none space-y-6 leading-relaxed text-gray-700 dark:text-gray-300">
              <p className="lead font-semibold text-xl text-gray-800 dark:text-gray-100">
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
              <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="border-l-4 border-teal-500 dark:border-teal-400 pl-4 italic text-gray-600 dark:text-gray-400"
              >
                "Kesehatan mental bukanlah tujuan akhir, melainkan sebuah
                proses. Ini tentang bagaimana Anda menjalani perjalanan, bukan
                ke mana Anda akan pergi."
              </motion.blockquote>
              <p>
                Aplikasi kami dirancang dengan masukan dari terapis
                bersertifikat, psikolog, dan peneliti kesehatan mental untuk
                memastikan bahwa setiap fitur didasarkan pada ilmu pengetahuan
                dan praktik terbaik. Kami berkomitmen untuk terus meningkatkan
                aplikasi berdasarkan umpan balik pengguna dan penelitian terbaru
                dalam bidang kesehatan mental.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="flex justify-center w-full py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 -mt-10 z-10 relative"
      >
        <div className="container px-4 md:px-6">
          <motion.div variants={fadeUp}>
            {" "}
            <SectionHeader
              icon={Brain}
              badgeText="Nilai-Nilai Kami"
              title="Apa yang Kami Percayai"
              subtitle="Nilai-nilai inti kami membimbing segala hal yang kami lakukan di Aplikasi Kesehatan Mental."
              iconColorClass={vibrantAccent}
              badgeBgClass={vibrantAccentBgLight}
            />
          </motion.div>

          <motion.div
            variants={gridContainerVariants}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3"
          >
            {[
              {
                icon: Heart,
                title: "Kasih Sayang",
                text: "Kami mendekati kesehatan mental dengan empati, pemahaman, dan tanpa penghakiman.",
                colorClass: vibrantPrimary,
                lightBg: vibrantPrimaryBgLight,
              },
              {
                icon: Sparkles,
                title: "Aksesibilitas",
                text: "Kami percaya bahwa alat kesehatan mental harus tersedia untuk semua orang, tanpa memandang latar belakang atau sumber daya mereka.",
                colorClass: vibrantAccent,
                lightBg: vibrantAccentBgLight,
              },
              {
                icon: Brain,
                title: "Berdasarkan Bukti",
                text: "Pendekatan kami didasarkan pada penelitian ilmiah dan teknik terapi yang telah terbukti.",
                colorClass: purpleColor,
                lightBg: purpleBgLight,
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                whileHover="hover"
                custom={cardHover}
                className="group flex flex-col items-center space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-8 shadow-sm transition-all duration-300 ease-in-out"
              >
                <motion.div
                  whileHover={iconHover.hover}
                  className={`rounded-full ${value.lightBg} p-4 transition-transform duration-300`}
                >
                  <value.icon
                    className={`h-8 w-8 ${value.colorClass} transition-colors duration-300`}
                  />
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex justify-center w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/30"
      >
        <div className="container px-4 md:px-6">
          <motion.div variants={fadeUp}>
            <SectionHeader
              icon={Users}
              badgeText="Tim Kami"
              title="Mengenal Tim Kami"
              subtitle="Tim ahli kami yang beragam sangat bersemangat untuk mentransformasi layanan kesehatan mental."
              iconColorClass={purpleColor}
              badgeBgClass={purpleBgLight}
            />
          </motion.div>

          <motion.div
            variants={gridContainerVariants}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                name: "Zahran Zaidan Nasution",
                title: "Frontend Backend",
                desc: "Web developer yang suka dengan mobil & otomotif.",
                img: "/placeholder-user-1.jpg",
              },
              {
                name: "Dr. Michael Rodriguez",
                title: "Chief Clinical Officer",
                desc: "Psikolog klinis, ahli CBT & mindfulness.",
                img: "/placeholder-user-2.jpg",
              },
              {
                name: "Aisha Patel",
                title: "Kepala Produk",
                desc: "Spesialis UX dengan latar belakang health tech.",
                img: "/placeholder-user-3.jpg",
              },
              {
                name: "James Wilson",
                title: "CTO",
                desc: "Software engineer ahli aplikasi kesehatan.",
                img: "/placeholder-user-4.jpg",
              },
              {
                name: "Dr. Elena Kim",
                title: "Research Director",
                desc: "Neuroscientist fokus pada teknologi & mental health.",
                img: "/placeholder-user-5.jpg",
              },
              {
                name: "David Okafor",
                title: "Community Manager",
                desc: "Advokat kesehatan mental & pembangun komunitas.",
                img: "/placeholder-user-6.jpg",
              },
            ].map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover="hover"
                custom={teamMemberHover}
                className="group flex flex-col items-center space-y-4 text-center p-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-md"
              >
                <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-lg border-4 border-white dark:border-gray-700 group-hover:border-teal-300 dark:group-hover:border-teal-500 transition-colors duration-300">
                  <img
                    src={
                      member.img ||
                      `https://source.unsplash.com/160x160/?portrait,person&random=${member.name}`
                    }
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className={`text-sm font-medium ${vibrantPrimary}`}>
                    {member.title}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 px-2">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section> */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex justify-center w-full py-16 md:py-24 lg:py-32 bg-slate-100 dark:bg-gray-800 rounded-t-3xl -mt-10 z-10 relative"
      >
        <div className="container px-8 md:px-16">
          <div className="grid gap-16 md:grid-cols-2">
            <motion.div variants={fadeLeft} className="space-y-6">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <CalendarCheck className="mr-2 h-4 w-4" />{" "}
                <span>Perjalanan Kami</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                Melangkah Bersama Anda
              </h2>
              <p className="text-gray-600 dark:text-gray-300 md:text-lg">
                Dari startup kecil hingga platform kesejahteraan mental global.
              </p>

              <motion.div
                variants={gridContainerVariants}
                className="space-y-6 border-l-2 border-teal-500/50 dark:border-teal-400/50 pl-6"
              >
                {[
                  {
                    year: "2020",
                    title: "Pendirian",
                    desc: "Didirikan oleh Aran2876 setelah perjuangan pribadinya.",
                  },
                  {
                    year: "2021",
                    title: "Peluncuran Beta",
                    desc: "Rilis awal ke 500 pengguna, fokus pada mood tracking & meditasi.",
                  },
                  {
                    year: "2022",
                    title: "Peluncuran Publik",
                    desc: "Peluncuran resmi dengan fitur diperluas & dukungan komunitas.",
                  },
                  {
                    year: "2023",
                    title: "Kemitraan Penelitian",
                    desc: "Bermitra dengan universitas untuk studi efektivitas.",
                  },
                  {
                    year: "2024",
                    title: "Ekspansi Global",
                    desc: "Mencapai 10.000+ pengguna di 30+ negara, dukungan multi-bahasa.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.year}
                    variants={fadeUp}
                    whileHover="hover"
                    custom={timelineItemHover}
                    className="relative group pl-4 transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-md py-2"
                  >
                    <motion.div
                      whileHover="hover"
                      custom={timelineDotHover}
                      className={`absolute -left-[34px] top-3 h-4 w-4 rounded-full ${vibrantPrimaryBg} border-4 border-slate-100 dark:border-gray-800 transition-transform duration-300`}
                    ></motion.div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      <span className={`font-bold ${vibrantPrimary}`}>
                        {item.year}:
                      </span>{" "}
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={fadeRight} className="space-y-8">
              <div className="space-y-4">
                <motion.div variants={fadeUp} className="space-y-4">
                  <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <Mail className="mr-2 h-4 w-4" />{" "}
                    <span>Tetap Terhubung</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                    Hubungi Kami
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 md:text-lg">
                    Punya pertanyaan atau saran? Kami siap mendengarkan.
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="space-y-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm"
                >
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "support@mentalhealthapp.com",
                      href: "mailto:support@mentalhealthapp.com",
                    },
                    {
                      icon: Phone,
                      label: "Telepon",
                      value: "+1 (555) 123-4567",
                      href: "tel:+15551234567",
                    },
                    {
                      icon: MapPin,
                      label: "Kantor",
                      value: "123 Wellness St, San Francisco, CA",
                    },
                  ].map((contact) => (
                    <motion.div
                      key={contact.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-4 group"
                    >
                      <motion.div whileHover={iconHover.hover}>
                        <contact.icon
                          className={`h-5 w-5 mt-1 flex-shrink-0 ${vibrantPrimary} transition-transform duration-300`}
                        />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                          {contact.label}
                        </h3>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className={`text-sm text-gray-600 dark:text-gray-300 hover:underline ${vibrantPrimary}`}
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {contact.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <motion.div className="pt-4" variants={fadeUp}>
                    {" "}
                    <Button
                      asChild
                      className={`w-full ${vibrantPrimaryBg} hover:opacity-90 text-white font-semibold transition-all duration-300 ease-in-out`}
                    >
                      <Link to="/contact">
                        {" "}
                        Kirim Pesan Sekarang
                        <ArrowRight className="ml-2 h-4 w-4 animate-bounce-horizontal" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm"
              >
                <h3 className="mb-3 font-semibold text-lg text-gray-800 dark:text-gray-100">
                  Langganan Buletin Kami
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  Dapatkan tips kesejahteraan mental terbaru, riset, dan fitur
                  aplikasi langsung ke inbox Anda.
                </p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="newsletter-email"
                    placeholder="Masukan email anda"
                    type="email"
                    required
                    className="flex-grow h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow duration-200 focus:shadow-outline-teal"
                  />
                  <motion.div
                    whileHover={buttonHoverTap.hover}
                    whileTap={buttonHoverTap.tap}
                    className="flex-shrink-0"
                  >
                    <Button
                      type="submit"
                      className={`${vibrantAccentBg} hover:opacity-90 text-white font-medium transition-opacity duration-200 px-5`}
                    >
                      Subscribe
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutView;
