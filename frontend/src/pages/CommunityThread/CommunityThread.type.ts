import { RefObject } from "react";

export interface CommunityThreadProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  createCommentOpen: boolean;
  setTextareaStatus: (value: boolean) => void;
}
