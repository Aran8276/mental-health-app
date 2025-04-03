import { FC } from "react";
import { ReplySectionProps } from "./ReplySection.type";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { humanize } from "@/utils/humanize";

const ReplySectionView: FC<ReplySectionProps> = ({ data }) => {
  return (
    <div className="flex space-x-5">
      <Link to={`/profile/${data.owner.id}`}>
        <UserAvatar name={data.owner.name} size="sm" />
      </Link>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-3">
          <Link
            to={`/profile/${data.owner.id}`}
            className="text-sm font-semibold"
          >
            {data.owner.name}
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {data.created_at && humanize(data.created_at)}
          </span>
        </div>
        <p className="text-sm">{data.body}</p>
      </div>
    </div>
  );
};

export default ReplySectionView;
