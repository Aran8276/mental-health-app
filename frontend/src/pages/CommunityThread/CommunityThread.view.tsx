import { FC } from "react";
import { CommunityThreadProps } from "./CommunityThread.type";
import ThreadCard from "@/components/ThreadCard/ThreadCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommentCard from "@/components/CommentCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SmThreadCard from "@/components/SmSmThreadCard/SmThreadCard";

const CommunityThreadView: FC<CommunityThreadProps> = ({
  createCommentOpen,
  setTextareaStatus,
  textareaRef,
}) => {
  return (
    <>
      <section className="flex flex-col space-y-12 w-full">
        <h1 className="text-4xl font-bold tracking-tighter">Forum Komunitas</h1>
        <section className="grid grid-cols-3 mx-8 gap-8">
          <div className="flex flex-col col-span-2 space-y-12">
            <ThreadCard isFull />
            <section className="flex flex-col space-y-8">
              <h3 className="text-2xl font-semibold">Komentar</h3>
              <div className="flex flex-col space-y-8">
                {createCommentOpen ? (
                  <Card>
                    <CardContent className="flex flex-col space-y-6">
                      <Textarea
                        ref={textareaRef}
                        className="h-[130px]"
                        placeholder="Tambahkan komentar"
                      />
                      <div className="flex space-x-4 self-end">
                        <Button
                          onClick={() => setTextareaStatus(false)}
                          className="cursor-pointer"
                          variant={"outline"}
                        >
                          Batal
                        </Button>
                        <Button className="cursor-pointer">Tambahkan</Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent>
                      <Input
                        onClick={() => setTextareaStatus(true)}
                        placeholder="Tambahkan komentar"
                      />
                    </CardContent>
                  </Card>
                )}

                <CommentCard
                  replies={[
                    { user: "Aran", body: "hello" },
                    { user: "N", body: "hello" },
                    { user: "Aan", body: "hello" },
                    { user: "Arftan", body: "hello" },
                    { user: "Arftan", body: "hello" },
                    { user: "Arftan", body: "hello" },
                  ]}
                />
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
              </div>
            </section>
          </div>

          <div className="flex flex-col space-y-8">
            <Card className="h-[200px]">
              <CardContent className="flex flex-col h-full space-y-6 justify-center items-center">
                <h3 className="text-2xl font-semibold">
                  Bagaimana Perasaan Anda?
                </h3>
                <Button className="bg-indigo-500 hover:bg-indigo-400 cursor-pointer">
                  Mulai Percakapan Baru
                </Button>
              </CardContent>
            </Card>
            <Card className="h-[440px] overflow-scroll">
              <CardContent className="flex flex-col space-y-6">
                <h3 className="font-semibold text-xl">Forum Terbaru</h3>
                <div className="flex flex-col space-y-4">
                  <SmThreadCard />
                  <SmThreadCard />
                  <SmThreadCard />
                  <SmThreadCard />
                  <SmThreadCard />
                  <SmThreadCard />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </section>
    </>
  );
};

export default CommunityThreadView;
