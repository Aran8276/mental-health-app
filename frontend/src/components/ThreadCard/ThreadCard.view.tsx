import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { MessageCircle } from "lucide-react";
import { FC } from "react";
import { ThreadCardProps } from "./ThreadCard.type";

const ThreadCardView: FC<ThreadCardProps> = ({ isFull, data }) => {
  return (
    <Link to={`/community/${data.id}`}>
      <Card>
        <CardContent className="flex space-x-6">
          <div className="">
            <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                className="object-cover w-full h-full"
                alt="avatar"
              />
            </div>
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
                  <span>20</span>
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
