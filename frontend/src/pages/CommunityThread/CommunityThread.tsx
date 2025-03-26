import { useEffect, useRef, useState } from "react";
import CommunityThreadView from "./CommunityThread.view";
import { useParams } from "react-router-dom";

export default function CommunityThread() {
  const [createCommentOpen, setCreateCommentOpen] = useState(false);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const params = useParams();
  console.log(params.id);

  document.title = "Forum Komunitas - Mental Health App";

  const setTextareaStatus = (value: boolean) => {
    setCreateCommentOpen(value);
    console.log(textarea);
  };

  useEffect(() => {
    if (createCommentOpen) {
      textarea.current?.focus();
    }
  }, [createCommentOpen]);

  return (
    <CommunityThreadView
      textareaRef={textarea}
      createCommentOpen={createCommentOpen}
      setTextareaStatus={setTextareaStatus}
    />
  );
}
