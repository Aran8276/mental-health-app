import ThreadCardView from "./ThreadCard.view";

export default function ThreadCard({ isFull }: { isFull?: boolean }) {
  return <ThreadCardView isFull={isFull} />;
}
