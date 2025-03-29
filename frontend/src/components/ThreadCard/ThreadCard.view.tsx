// src/components/ThreadCard/ThreadCard.view.tsx

import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"; // Added Header/Footer
import { MessageSquare, Clock } from "lucide-react"; // Using MessageSquare, added Clock
import { FC } from "react";
import UserAvatar from "../UserAvatar/UserAvatar"; // Assuming this is styled
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns"; // Optional: for relative time
import { id } from "date-fns/locale"; // Optional: for Indonesian locale
import { ThreadCardProps } from "./ThreadCard.type";

// Helper function for relative time (optional, replace with your preferred method)
const formatRelativeTime = (dateString: string | Date): string => {
  try {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true, locale: id }); // 'id' for Indonesian locale
  } catch (error) {
    console.error("Error formatting date:", error);
    return "beberapa waktu lalu"; // Fallback
  }
};

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.0,
    boxShadow: "0px 8px 25px rgba(0, 128, 128, 0.15)", // Tealish shadow
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

const ThreadCardView: FC<ThreadCardProps> = ({ isFull, data }) => {
  const WrapperComponent = isFull ? motion.div : motion(Link); // Choose wrapper based on isFull
  const linkProps = isFull ? {} : { to: `/community/${data.id}` };

  // Extract necessary data with fallbacks
  const authorName = data.owner?.name || "Pengguna Anonim";
  const authorAvatar = data.owner?.avatar; // Assuming avatar URL is here
  const threadTitle = data.title || "Tanpa Judul";
  const threadBody = data.body || "";
  const commentCount = data.thread_comments?.length || 0;
  const createdAt = data.createdAt; // Make sure this exists in your data type

  const cardContent = (
    <Card className="py-0 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl overflow-hidden border border-teal-100 dark:border-teal-900 ">
      <CardHeader className="flex flex-row items-center space-x-4 p-4 pb-2 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 dark:from-teal-900/30 dark:to-cyan-900/30 border-b border-teal-100 dark:border-teal-800">
        <UserAvatar src={authorAvatar} name={authorName} size="sm" />{" "}
        {/* Pass src/name, maybe size */}
        <div className="flex flex-col flex-grow">
          <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
            {authorName}
          </span>
          {createdAt && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
              <Clock className="w-3 h-3 mr-1" />
              {formatRelativeTime(createdAt)}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className={`${isFull ? "pl-6 pb-12" : "pl-6"}`}>
        {" "}
        {/* Adjusted padding */}
        <CardTitle className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 leading-tight">
          {threadTitle}
        </CardTitle>
        {/* Use dangerouslySetInnerHTML only if data.body is *guaranteed* to be safe HTML, otherwise prefer plain text */}
        <div
          className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed ${
            isFull ? "" : "line-clamp-3"
          }`}
          // If body can contain simple HTML formatting like breaks or emphasis:
          dangerouslySetInnerHTML={{ __html: threadBody }}
          // If body is plain text:
          // <p className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed ${ isFull ? '' : 'line-clamp-3' }`}>{threadBody}</p>
        />
      </CardContent>
      {/* Footer only shown when not in full view */}
      {!isFull && (
        <CardFooter className="py-5 bg-gray-50 dark:bg-slate-800/50 px-4 border-t border-teal-100 dark:border-teal-800">
          <div className="flex items-center space-x-4 text-xs text-teal-600 dark:text-teal-400">
            <div className="flex items-center space-x-1 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>{commentCount} Komentar</span>
            </div>
            {/* Add other interactions here if needed (e.g., likes, views) */}
          </div>
        </CardFooter>
      )}
    </Card>
  );

  return (
    <WrapperComponent
      {...linkProps}
      className={`w-full rounded-xl ${isFull ? "cursor-default" : ""}`}
      variants={cardVariants} // Apply base variants
      initial="hidden" // Initial state for entry animation (can be simple)
      animate="visible" // Animate to visible state
      whileHover={!isFull ? "hover" : undefined} // Apply hover only if it's a link
      whileTap={!isFull ? "tap" : undefined} // Apply tap only if it's a link
      layout // Enable smooth layout transitions if size changes
    >
      {cardContent}
    </WrapperComponent>
  );
};

export default ThreadCardView;
