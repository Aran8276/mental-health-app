import { useCallback, useEffect, useRef, useState } from "react";
import CommunityThreadView from "./CommunityThread.view";
import { useParams } from "react-router-dom";
import {
  FetchAllThreadsResponse,
  FetchThreadDetailResponse,
  Payload,
  PostThreadCommentResponse,
  Thread,
} from "./CommunityThread.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function CommunityThread() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [thread, setThread] = useState<Thread | null>(null);
  const [threadsList, setThreadsList] = useState<Payload[]>([]);
  const [createCommentOpen, setCreateCommentOpen] = useState(false);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const params = useParams();

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

  const fetchAllThreads = async () => {
    try {
      const data: FetchAllThreadsResponse = (await client().get(`/thread`))
        .data;
      setThreadsList(data.payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  const submitThread = async () => {
    setLoading(true);
    setError("");

    if (isNaN(parseInt(params.id || ""))) {
      return;
    }
    try {
      const data: PostThreadCommentResponse = (
        await client().post("/thread-comment", {
          thread_id: parseInt(params.id || ""),
          body: textarea.current?.value,
        })
      ).data;

      toast(data.msg);
      await fetchThread();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.msg || "Terjadi kesalahan.");
        return;
      }

      console.log(error);
    } finally {
      setLoading(false);
      setCreateCommentOpen(false);
    }
  };

  useEffect(() => {
    fetchThread();
  }, [fetchThread]);

  useEffect(() => {
    fetchAllThreads();
  }, []);

  document.title = "Forum Komunitas - Mental Health App";

  const setTextareaStatus = (value: boolean) => {
    setCreateCommentOpen(value);
  };

  useEffect(() => {
    if (createCommentOpen) {
      textarea.current?.focus();
    }
  }, [createCommentOpen]);

  return (
    <CommunityThreadView
      error={error}
      loading={loading}
      submitThread={submitThread}
      threadsList={threadsList}
      thread={thread}
      textareaRef={textarea}
      createCommentOpen={createCommentOpen}
      setTextareaStatus={setTextareaStatus}
    />
  );
}
