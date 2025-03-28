import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { MessageCircle } from "lucide-react";
import { FC } from "react";
import { SmThreadProps } from "./SmThreadCard.type";

const SmThreadCardView: FC<SmThreadProps> = ({ data }) => {
  return (
    <Link to="/community/test">
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
          <div className="flex flex-col space-y-2">
            <h5 className="font-semibold text-sm tracking-tight">
              {data.owner.name}
            </h5>
            <h3 className="text-lg font-bold">{data.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2">
              {data.body}
            </p>
            <section className="pt-2">
              <div className="flex space-x-3">
                <MessageCircle />
                <span>
                  {data.thread_comments.length > 0 &&
                    data.thread_comments.length}
                </span>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SmThreadCardView;
