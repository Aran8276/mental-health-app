import { FC } from "react";
import { ReplySectionProps } from "./ReplySection.type";
import UserAvatar from "../UserAvatar/UserAvatar";

const ReplySectionView: FC<ReplySectionProps> = ({ data }) => {
  return (
    <div className="flex space-x-5">
      <div>
        <UserAvatar name={data.owner.name} size="sm" />
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-semibold">{data.owner.name}</p>
        <p className="text-sm">{data.body}</p>
      </div>
    </div>
  );
};

export default ReplySectionView;
