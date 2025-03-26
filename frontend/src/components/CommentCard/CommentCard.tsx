import { useEffect, useRef, useState } from "react";
import { Replies } from "./CommentCard.type";
import CommentCardView from "./CommentCard.view";

export default function CommentCard({ replies }: { replies?: Replies[] }) {
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
      replyInputRef={replyInputRef}
      setCommentsOpen={setCommentsOpen}
      commentsOpen={commentsOpen}
      replies={replies}
      replyOpen={replyOpen}
      setReplyOpen={setReplyOpen}
    />
  );
}
