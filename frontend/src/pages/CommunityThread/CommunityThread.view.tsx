import { FC } from "react";
import { CommunityThreadProps } from "./CommunityThread.type";
import ThreadCard from "@/components/ThreadCard/ThreadCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommentCard from "@/components/CommentCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SmThreadCard from "@/components/SmSmThreadCard/SmThreadCard";
import { Link } from "react-router-dom";
import LoadableButton from "@/components/LoadableButton/LoadableButton";

const CommunityThreadView: FC<CommunityThreadProps> = ({
  error,
  loading,
  submitThread,
  createCommentOpen,
  setTextareaStatus,
  textareaRef,
  thread,
  threadsList,
}) => {
  return (
    <>
      <section className="flex items-center md:items-start flex-col space-y-12 w-full">
        <h1 className="text-4xl font-bold tracking-tighter">
          Percakapan Forum
        </h1>
        <div>
          <Link to="/community">
            <Button className="cursor-pointer">Kembali ke Komunitas</Button>
          </Link>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 mx-8 gap-8">
          <div className="flex flex-col col-span-2 space-y-12">
            {thread && <ThreadCard data={thread} isFull />}
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
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <div className="flex space-x-4 self-end">
                        <Button
                          onClick={() => setTextareaStatus(false)}
                          className="cursor-pointer"
                          variant={"outline"}
                        >
                          Batal
                        </Button>
                        <LoadableButton
                          isLoading={loading}
                          onClick={() => submitThread()}
                          className="cursor-pointer"
                        >
                          Tambahkan
                        </LoadableButton>
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
                {thread?.thread_comments.map((item, index) => (
                  <CommentCard
                    key={index}
                    data={item}
                    replies={item.thread_comment_replies}
                  />
                ))}
              </div>
            </section>
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
                <h3 className="font-semibold text-xl">Forum Terbaru</h3>
                <div className="flex flex-col space-y-4">
                  {threadsList.map((item, index) => (
                    <SmThreadCard data={item} key={index} />
                  ))}
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
