import { useContext, useEffect, useRef, useState } from "react";
import CommentCardView from "./CommentCard.view";
import { ThreadComment } from "@/pages/Community/Community.type";
import { ThreadCommentReply } from "@/pages/CommunityThread/CommunityThread.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { PostThreadReplyResponse } from "./CommentCard.type";
import { FetchThreadContext } from "@/pages/CommunityThread/CommunityThread.context";

export default function CommentCard({
  replies,
  data,
  loggedIn,
}: {
  replies?: ThreadCommentReply[];
  data: ThreadComment;
  loggedIn: boolean;
}) {
  const replyInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const fetchThread = useContext(FetchThreadContext);

  const submitReply = async () => {
    setLoading(true);
    setError("");
    try {
      const replyData: PostThreadReplyResponse = (
        await client().post("/thread-comment-reply", {
          comment_id: data.id,
          body: replyInputRef.current?.value,
        })
      ).data;

      toast(replyData.msg);

      fetchThread();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.msg || "Terjadi kesalahan.");
        return;
      }
      console.log(error);
    } finally {
      setLoading(false);
      setReplyOpen(false);
    }
  };

  useEffect(() => {
    if (replyOpen) {
      replyInputRef.current?.focus();
      if (!commentsOpen) {
        setCommentsOpen(true);
      }
    }
  }, [replyOpen]);

  useEffect(() => {
    if (!commentsOpen) {
      setReplyOpen(false);
    }
  }, [commentsOpen]);

  return (
    <CommentCardView
      error={error}
      loading={loading}
      submitReply={submitReply}
      data={data}
      replyInputRef={replyInputRef}
      setCommentsOpen={setCommentsOpen}
      commentsOpen={commentsOpen}
      replies={replies}
      replyOpen={replyOpen}
      setReplyOpen={setReplyOpen}
      loggedIn={loggedIn}
    />
  );
}
