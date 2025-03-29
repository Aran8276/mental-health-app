// src/components/SmThreadCard/SmThreadCard.view.tsx

import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react"; // Added Clock if you want timestamp
import { FC } from "react";
import { SmThreadProps } from "./SmThreadCard.type"; // Make sure ThreadData matches
import { motion } from "framer-motion";
import UserAvatar from "../UserAvatar/UserAvatar"; // Import your UserAvatar component

// Animation Variants
const cardVariants = {
  // Assuming parent list handles entry animations (initial/animate)
  hover: {
    backgroundColor: "rgba(0, 128, 128, 0.07)", // Subtle teal hover background
    // Alternative using hsla for potential dark mode adjustment:
    // backgroundColor: "hsla(160, 80%, 90%, 0.5)", // Light teal with alpha
    // Dark mode variant if needed could be: "hsla(160, 40%, 20%, 0.5)"
    // Or simply use TW hover:bg-teal-50/50 dark:hover:bg-teal-900/20 in className
    scale: 1.02,
    boxShadow: "0px 4px 15px rgba(0, 128, 128, 0.08)", // Softer shadow
    transition: { type: "spring", stiffness: 350, damping: 20 },
  },
  tap: {
    scale: 0.97,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

const SmThreadCardView: FC<SmThreadProps> = ({ data }) => {
  // --- Safe Data Access ---
  const threadId = data.id;
  const title = data.title || "Tanpa Judul";
  const authorName = data.owner?.name || "Pengguna Anonim";
  const authorAvatar = data.owner?.avatar; // Get avatar URL
  const commentCount = data.thread_comments?.length || 0;
  // Optional: Add createdAt if available in your ThreadData type
  // const createdAt = data.createdAt;

  return (
    <motion.div
      layout // Smooth transitions if list reorders/filters
      variants={cardVariants}
      className="rounded-lg p-0"
      whileHover="hover"
      whileTap="tap"
      // If parent *doesn't* handle entry, uncomment these:
      // initial={{ opacity: 0, y: 10 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.3 }}
    >
      {/* Wrap with Link */}
      <Link
        to={`/community/${threadId}`}
        className="block p-2.5 rounded-lg transition-colors duration-150 ease-in-out cursor-pointer group" // `group` for potential internal hover states if needed
        aria-label={`Lihat diskusi: ${title}`}
      >
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="size-8">
            <UserAvatar src={authorAvatar} name={authorName} size="xs" />{" "}
            {/* Use smaller avatar */}
          </div>

          {/* Text Content */}
          <div className="flex-grow min-w-0">
            {" "}
            {/* Prevents text overflow */}
            {/* Title (most prominent) */}
            <h4
              className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate"
              title={title} // Tooltip for long titles
            >
              {title}
            </h4>
            {/* Metadata Line */}
            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {/* Author Name */}
              <span className="truncate hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {authorName}
              </span>

              {/* Comment Count */}
              <span className="flex items-center gap-1 flex-shrink-0">
                <MessageCircle className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                <span>{commentCount}</span>
              </span>

              {/* Optional: Timestamp */}
              {/* {createdAt && (
                                 <span className="hidden sm:flex items-center gap-1 flex-shrink-0">
                                      <Clock className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                                      <span className="whitespace-nowrap">{formatRelativeTime(createdAt)}</span>
                                 </span>
                              )} */}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SmThreadCardView;

// --- Ensure your types match ---
// Example in ./SmThreadCard.type.ts
/*
export interface ThreadOwner {
  id: string;
  name: string;
  avatar?: string; // Optional avatar URL
}

export interface ThreadComment {
  id: string;
  // ... other comment properties
}

// Ensure ThreadData matches what's passed (body is optional for this card)
export interface ThreadData {
  id: string | number;
  title: string;
  body?: string; // Optional or unused here
  owner: ThreadOwner;
  thread_comments: ThreadComment[];
  createdAt?: string | Date; // Optional timestamp
}

export interface SmThreadProps {
  data: ThreadData;
}
*/

// --- Remember the UserAvatar Component ---
// Make sure UserAvatar component exists and handles src, name, size props.
// Example `size="xs"` class might be 'w-6 h-6'. Adjust UserAvatar as needed.
