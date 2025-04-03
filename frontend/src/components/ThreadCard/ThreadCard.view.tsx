import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MessageSquare, Clock } from "lucide-react";
import { FC } from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import { motion } from "framer-motion";
import { ThreadCardProps } from "./ThreadCard.type";
import { cardVariants } from "./ThreadCard.data";
import { humanize } from "@/utils/humanize";

const ThreadCardView: FC<ThreadCardProps> = ({ isFull, data }) => {
  const WrapperComponent = isFull ? motion.div : motion(Link);
  const linkProps = isFull ? {} : { to: `/community/${data.id}` };

  const authorName = data.owner?.name || "Pengguna Anonim";
  const authorAvatar = "avatar";
  const threadTitle = data.title || "Tanpa Judul";
  const threadBody = data.body || "";
  const commentCount = data.thread_comments?.length || 0;
  const createdAt = data.created_at || "";

  const cardContent = (
    <Card className="py-0 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl overflow-hidden border border-teal-100 dark:border-teal-900 ">
      <CardHeader className="flex flex-row items-center space-x-4 p-4 pb-2 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 dark:from-teal-900/30 dark:to-cyan-900/30 border-b border-teal-100 dark:border-teal-800">
        <UserAvatar src={authorAvatar} name={authorName} size="sm" />{" "}
        <div className="flex flex-col flex-grow">
          <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
            {authorName}
          </span>
          {createdAt && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
              <Clock className="w-3 h-3 mr-1" />
              {humanize(createdAt)}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className={`${isFull ? "pl-6 pb-12" : "pl-6"}`}>
        {" "}
        <CardTitle className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 leading-tight">
          {threadTitle}
        </CardTitle>
        <div
          className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed ${
            isFull ? "" : "line-clamp-3"
          }`}
          dangerouslySetInnerHTML={{ __html: threadBody }}
        />
      </CardContent>

      {!isFull && (
        <CardFooter className="py-5 bg-gray-50 dark:bg-slate-800/50 px-4 border-t border-teal-100 dark:border-teal-800">
          <div className="flex items-center space-x-4 text-xs text-teal-600 dark:text-teal-400">
            <div className="flex items-center space-x-1 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>{commentCount} Komentar</span>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );

  return (
    <WrapperComponent
      {...linkProps}
      className={`w-full rounded-xl ${isFull ? "cursor-default" : ""}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!isFull ? "hover" : undefined}
      whileTap={!isFull ? "tap" : undefined}
      layout
    >
      {cardContent}
    </WrapperComponent>
  );
};

export default ThreadCardView;
