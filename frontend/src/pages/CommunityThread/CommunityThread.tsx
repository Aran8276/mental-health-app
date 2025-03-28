import { useCallback, useEffect, useRef, useState } from "react";
import CommunityThreadView from "./CommunityThread.view";
import { useParams } from "react-router-dom";
import { FetchThreadDetailResponse, Thread } from "./CommunityThread.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function CommunityThread() {
  const [createCommentOpen, setCreateCommentOpen] = useState(false);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const params = useParams();
  const [thread, setThread] = useState<Thread | null>(null);

  const fetchThread = useCallback(async () => {
    try {
      const data: FetchThreadDetailResponse = (
        await client().get(`/thread/${params.id}`)
      ).data;
      setThread(data.payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        toast(error.message);
      }
    }
  }, [params.id]);

  useEffect(() => {
    fetchThread();
  }, [fetchThread]);

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
      thread={thread}
      textareaRef={textarea}
      createCommentOpen={createCommentOpen}
      setTextareaStatus={setTextareaStatus}
    />
  );
}
