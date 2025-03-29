import { FC } from "react";
import { ReplySectionProps } from "./ReplySection.type";

const ReplySectionView: FC<ReplySectionProps> = ({ data }) => {
  return (
    <div className="flex space-x-5">
      <div className="">
        <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            className="object-cover w-full h-full"
            alt="avatar"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-semibold">{data.owner.name}</p>
        <p className="text-sm">{data.body}</p>
      </div>
    </div>
  );
};

export default ReplySectionView;
