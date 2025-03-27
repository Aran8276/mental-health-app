import { Thread } from "@/pages/Community/Community.type";
import ThreadCardView from "./ThreadCard.view";

export default function ThreadCard({
  isFull,
  data,
}: {
  isFull?: boolean;
  data: Thread;
}) {
  return <ThreadCardView data={data} isFull={isFull} />;
}
