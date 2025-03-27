import { useEffect, useRef, useState } from "react";
import CommentCardView from "./CommentCard.view";
import { ThreadComment } from "@/pages/Community/Community.type";
import { ThreadCommentReply } from "@/pages/CommunityThread/CommunityThread.type";

export default function CommentCard({
  replies,
  data,
}: {
  replies?: ThreadCommentReply[];
  data: ThreadComment;
}) {
  const replyInputRef = useRef<HTMLInputElement | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);

  useEffect(() => {
    if (replyOpen) {
      replyInputRef.current?.focus();
    }
  }, [replyOpen]);

  useEffect(() => {
    if (!commentsOpen) {
      setReplyOpen(false);
    }
  }, [commentsOpen]);

  return (
    <CommentCardView
      data={data}
      replyInputRef={replyInputRef}
      setCommentsOpen={setCommentsOpen}
      commentsOpen={commentsOpen}
      replies={replies}
      replyOpen={replyOpen}
      setReplyOpen={setReplyOpen}
    />
  );
}
