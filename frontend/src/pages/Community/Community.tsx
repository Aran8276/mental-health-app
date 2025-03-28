import { useEffect, useState } from "react";
import CommunityView from "./Community.view";
import { FetchThreadResponse, Thread } from "./Community.type";
import { client } from "@/config/axiosClient";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function Community() {
  const [threads, setThreads] = useState<Thread[]>([]);

  const fetchThreads = async () => {
    try {
      const data: FetchThreadResponse = (await client().get("/thread")).data;
      setThreads(data.payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  document.title = "Forum Komunitas - Mental Health App";
  return <CommunityView threads={threads} />;
}
