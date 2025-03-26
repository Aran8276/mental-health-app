import { Replies } from "../CommentCard/CommentCard.type";
import ReplySectionView from "./ReplySection.view";

export default function ReplySection({ data }: { data: Replies }) {
  return <ReplySectionView data={data} />;
}
