import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { MessageCircle } from "lucide-react";
import { FC } from "react";
import { ThreadCardProps } from "./ThreadCard.type";
import UserAvatar from "../UserAvatar/UserAvatar";

const ThreadCardView: FC<ThreadCardProps> = ({ isFull, data }) => {
  return (
    <Link
      className={`${isFull && "cursor-default"}`}
      to={`/community/${data.id}`}
    >
      <Card>
        <CardContent className="flex space-x-6">
          <div className="">
            <UserAvatar />
          </div>
          <div className="flex flex-col space-y-3">
            <h5 className="font-semibold tracking-tight">{data.owner.name}</h5>
            <h3 className="text-2xl font-bold">{data.title}</h3>
            <p
              className={`text-gray-700 dark:text-gray-400 ${
                isFull || "line-clamp-3"
              }`}
            >
              {data.body}
            </p>
            {isFull || (
              <section className="pt-3">
                <div className="flex space-x-3">
                  <MessageCircle />
                  <span>
                    {data.thread_comments.length > 0 &&
                      data.thread_comments.length}
                  </span>
                </div>
              </section>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ThreadCardView;
