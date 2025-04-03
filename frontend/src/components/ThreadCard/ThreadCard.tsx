import { Thread } from "@/pages/Community/Community.type";
import ThreadCardView from "./ThreadCard.view";
import { toast } from "sonner";

import { ThreadCardProps } from "./ThreadCard.type";
import { client } from "@/config/axiosClient";
import { useUser } from "../Header/Header.context";

export default function ThreadCard({
  isFull,
  data,
}: {
  isFull?: boolean;
  data: Thread;
}) {
  const { user } = useUser();
  const currentUserId = user?.id;

  const handleDeleteThread = async (threadId: string | number) => {
    try {
      await client().delete(`/thread/${threadId}`);
      toast.success("Thread berhasil dihapus.");
    } catch (error) {
      console.error("Error deleting thread:", error);
      toast.error("Gagal menghapus thread.");
    }
  };

  const viewProps: ThreadCardProps = {
    isFull,
    data,
    handleDelete: handleDeleteThread,
    currentUserId: currentUserId,
  };

  return <ThreadCardView {...viewProps} />;
}
