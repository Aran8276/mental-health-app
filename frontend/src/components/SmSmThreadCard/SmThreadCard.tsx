import { Payload } from "@/pages/CommunityThread/CommunityThread.type";
import SmThreadCardView from "./SmThreadCard.view";

export default function SmThreadCard({ data }: {
  data: Payload
}) {
  return <SmThreadCardView data={data} />;
}
