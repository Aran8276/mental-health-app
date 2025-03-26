import { Card, CardContent } from "../ui/card";
import { FC } from "react";
import { CommentCardProps } from "./CommentCard.type";
import ReplySection from "../ReplySection/ReplySection";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CommentCardView: FC<CommentCardProps> = ({
  replies,
  commentsOpen,
  setCommentsOpen,
  replyOpen,
  setReplyOpen,
  replyInputRef,
}) => {
  return (
    <Card>
      <CardContent className="flex space-x-6">
        <div className="">
          <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
              className="object-cover w-full h-full"
              alt="avatar"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <h5 className="font-semibold tracking-tight">User Name</h5>
          <p className="text-gray-700">
            komentar komentar komentar komentar komentar komentar komentar
            komentar komentar komentar komentar komentar komentar komentar
            komentar komentar
          </p>
          <section className="flex space-x-4 pt-4">
            {replies && (
              <div className="flex flex-col space-y-8">
                <p
                  onClick={() => setCommentsOpen(!commentsOpen)}
                  className="text-gray-600 cursor-pointer w-fit transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  {commentsOpen
                    ? "Tutup balasan"
                    : `Lihat ${replies.length} balasan`}
                </p>
              </div>
            )}
            <p
              onClick={() => setReplyOpen(!replyOpen)}
              className="text-gray-600 cursor-pointer w-fit transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
            >
              Balas
            </p>
          </section>

          <div className="py-4 pl-4 w-[400px]">
            {replyOpen && (
              <div className="flex flex-col space-y-4">
                <Input ref={replyInputRef} placeholder="Tambahkan balasan" />
                <div className="flex space-x-4 self-end">
                  <Button
                    onClick={() => setReplyOpen(false)}
                    className="cursor-pointer"
                    variant={"outline"}
                  >
                    Batal
                  </Button>
                  <Button className="cursor-pointer">Tambahkan</Button>
                </div>
              </div>
            )}
          </div>
          {replies && commentsOpen && (
            <section className="flex h-[300px] overflow-y-scroll flex-col space-y-3">
              {replies.map((item, index) => (
                <ReplySection data={item} key={index} />
              ))}
            </section>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentCardView;
