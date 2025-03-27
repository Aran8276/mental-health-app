import { FC } from "react";
import { CommunityProps } from "./Community.type";
import ThreadCard from "@/components/ThreadCard/ThreadCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActiveUserCard from "@/components/ActiveUserCard/ActiveUserCard";
import { Link } from "react-router-dom";

const CommunityView: FC<CommunityProps> = ({ threads }) => {
  return (
    <>
      <section className="flex items-center md:items-start flex-col space-y-12 w-full">
        <h1 className="text-4xl font-bold tracking-tighter">Forum Komunitas</h1>
        <section className="grid grid-cols-1 md:grid-cols-3 mx-8 gap-8">
          <div className="flex row-start-2 md:row-start-auto flex-col col-span-2 space-y-8">
            {threads.map((item, index) => (
              <ThreadCard data={item} key={index} />
            ))}
          </div>

          <div className="flex flex-col space-y-8">
            <Card className="h-[200px]">
              <CardContent className="flex flex-col h-full space-y-6 justify-center items-center">
                <h3 className="text-2xl font-semibold">
                  Bagaimana Perasaan Anda?
                </h3>
                <Link to="/create-thread">
                  <Button className="bg-indigo-500 hover:bg-indigo-400 text-white cursor-pointer">
                    Mulai Percakapan Baru
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="h-[440px] overflow-scroll">
              <CardContent className="flex flex-col space-y-6">
                <h3 className="font-semibold text-xl">Pengguna Paling Aktif</h3>
                <div className="flex flex-col space-y-4">
                  <ActiveUserCard />
                  <ActiveUserCard />
                  <ActiveUserCard />
                  <ActiveUserCard />
                  <ActiveUserCard />
                  <ActiveUserCard />
                  <ActiveUserCard />
                  <ActiveUserCard />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </section>
    </>
  );
};

export default CommunityView;
