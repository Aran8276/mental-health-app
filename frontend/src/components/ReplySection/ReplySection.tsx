import { ThreadCommentReply } from "@/pages/CommunityThread/CommunityThread.type";
import ReplySectionView from "./ReplySection.view";

export default function ReplySection({ data }: { data: ThreadCommentReply }) {
  return <ReplySectionView data={data} />;
}
