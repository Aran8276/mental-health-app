import { Dispatch, RefObject, SetStateAction } from "react";

export interface Replies {
  user: string;
  body: string;
}

export interface CommentCardProps {
  replies?: Replies[];
  commentsOpen: boolean;
  setCommentsOpen: Dispatch<SetStateAction<boolean>>;
  replyOpen: boolean;
  setReplyOpen: Dispatch<SetStateAction<boolean>>;
  replyInputRef: RefObject<HTMLInputElement | null>;
}
