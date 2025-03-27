import { ThreadComment } from "@/pages/Community/Community.type";
import { ThreadCommentReply } from "@/pages/CommunityThread/CommunityThread.type";
import { Dispatch, RefObject, SetStateAction } from "react";

export interface CommentCardProps {
  data: ThreadComment;
  replies?: ThreadCommentReply[];
  commentsOpen: boolean;
  setCommentsOpen: Dispatch<SetStateAction<boolean>>;
  replyOpen: boolean;
  setReplyOpen: Dispatch<SetStateAction<boolean>>;
  replyInputRef: RefObject<HTMLInputElement | null>;
}
