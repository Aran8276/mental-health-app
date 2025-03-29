import { FC } from "react";
import ThreadCard from "@/components/ThreadCard/ThreadCard";
import ActiveUserCard from "@/components/ActiveUserCard/ActiveUserCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquarePlus, Users, Info, Activity } from "lucide-react";
import { CommunityProps } from "./Community.type";
import {
  containerVariants,
  itemVariants,
  cardHoverEffect,
  buttonHoverEffect,
  exampleActiveUsers,
} from "./Community.data";

const CommunityView: FC<CommunityProps> = ({ threads }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30 min-h-screen"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
        className="w-full max-w-6xl mb-10"
      >
        <div className="flex space-x-6 text-4xl md:text-5xl self-start font-bold tracking-tight text-teal-700 dark:text-teal-400 items-center">
          <Activity className="w-10 h-10 hidden md:block text-teal-500" />
          <h2 className="text-center md:text-start">
            Forum Komunitas Sehat Jiwa
          </h2>
        </div>
        <p className="text-center text-base md:text-lg md:text-start text-gray-600 dark:text-gray-400 mt-2">
          Ruang aman untuk berbagi, mendukung, dan terhubung.
        </p>
      </motion.div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl mx-auto"
      >
        <motion.div
          variants={containerVariants}
          className="flex flex-col col-span-1 md:col-span-2 space-y-6 md:space-y-8 order-2 md:order-1"
        >
          <h2 className="text-2xl font-semibold text-teal-800 dark:text-teal-400 mb-4">
            Diskusi Terbaru
          </h2>
          {threads.length > 0 ? (
            threads.map((item, index) => <ThreadCard key={index} data={item} />)
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center text-gray-500 py-10"
            >
              Belum ada diskusi. Jadilah yang pertama!
            </motion.div>
          )}
        </motion.div>

        <aside className="flex flex-col space-y-8 order-1 md:order-2">
          {" "}
          <motion.div
            className="rounded-xl"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <Card className="h-auto bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-slate-800 dark:to-gray-800 shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
              <CardContent className="flex rounded-xl flex-col h-full space-y-4 p-6 justify-center items-center text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                >
                  <MessageSquarePlus className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-3" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-teal-800 dark:text-teal-400">
                  Bagikan Cerita Anda
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                  Mulai percakapan baru, ajukan pertanyaan, atau berikan
                  dukungan.
                </p>
                <Link to="/create-thread">
                  <motion.div
                    whileHover={buttonHoverEffect}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-teal-600 hover:bg-teal-500 text-white cursor-pointer rounded-full px-6 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                      Mulai Diskusi Baru
                    </Button>
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="bg-yellow-50 dark:bg-slate-800 border dark:border-inherit border-yellow-200 rounded-lg text-yellow-800 dark:text-gray-400 shadow-sm">
              <CardHeader className="flex flex-row items-center space-x-2 pt-4 pb-2 px-4">
                <Info className="w-5 h-5 text-yellow-600 dark:text-gray-400 flex-shrink-0" />
                <CardTitle className="text-lg font-semibold">
                  Pedoman Komunitas
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4  pb-4 text-sm">
                Mari jaga lingkungan ini tetap positif, suportif, dan saling
                menghormati.
                <Link
                  to="/community-guidelines"
                  className="text-teal-600 hover:underline ml-1 font-medium"
                >
                  Lihat Selengkapnya
                </Link>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="rounded-xl"
            whileHover={{ ...cardHoverEffect, scale: 1.0 }}
          >
            {" "}
            <Card className="shadow-lg rounded-xl bg-white dark:bg-slate-800 overflow-hidden pt-0">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-slate-800 dark:to-gray-800 px-6 pt-8 border-b">
                <CardTitle className="font-semibold text-xl text-teal-700 dark:text-teal-400 flex items-center gap-2">
                  <Users className="w-5 h-5" /> Pengguna Aktif
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 max-h-[400px] overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col space-y-3"
                >
                  {exampleActiveUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.03)", x: 2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      className="rounded-md"
                    >
                      <ActiveUserCard />{" "}
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </aside>
      </motion.section>
    </motion.section>
  );
};

export default CommunityView;