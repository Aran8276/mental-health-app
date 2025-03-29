// src/components/CommentCard/CommentCard.view.tsx

import { FC, RefObject } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadableButton from "../LoadableButton/LoadableButton";
import ReplySection from "../ReplySection/ReplySection"; // Assuming this component exists and is styled
import UserAvatar from "../UserAvatar/UserAvatar"; // Assuming this component exists
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  CornerDownRight,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

// Helper for Time Formatting (Optional)
const formatRelativeTime = (dateString: string | Date): string => {
  try {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    // Adjust locale if needed
    return formatDistanceToNow(date, { addSuffix: true, locale: id });
  } catch {
    return "beberapa waktu lalu"; // Fallback
  }
};

// Animation Variants
const sectionRevealVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    marginBottom: 0,
    overflow: "hidden",
  },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: "1rem", // Add space when revealed
    marginBottom: "0.5rem",
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, // Cubic bezier for smooth ease
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    marginBottom: 0,
    overflow: "hidden",
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

const repliesListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  }, // Stagger replies
  exit: { opacity: 0 },
};

const replyItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

const buttonHoverEffect = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 15 },
};

const CommentCardView: FC<CommentCardProps> = ({
  error,
  loading,
  submitReply,
  data,
  replies,
  commentsOpen,
  setCommentsOpen,
  replyOpen,
  setReplyOpen,
  replyInputRef,
}) => {
  const ownerName = data.owner?.name || "Pengguna Anonim";
  const ownerAvatar = data.owner?.avatar;
  const commentBody = data.body || "";
  const createdAt = data.createdAt; // Ensure this exists in your type

  return (
    // Using motion.div as the root for potential list animations in parent
    // Keeping background transparent or inheriting from parent (as per request)
    // Adding padding and border for visual separation within the list
    <motion.div
      layout="position" // Smoothly animates position changes if list reorders
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex space-x-3 py-4 border-b border-gray-100 dark:border-slate-700/50" // Horizontal space & border separator
    >
      {/* Avatar Column */}
      <div className="flex-shrink-0 pt-1">
        <UserAvatar src={ownerAvatar} name={ownerName} size="sm" />{" "}
        {/* Use dynamic avatar */}
      </div>

      {/* Content Column */}
      <div className="flex flex-col w-full min-w-0">
        {" "}
        {/* min-w-0 prevents content overflow issues */}
        {/* Author Info & Body */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-semibold tracking-tight text-sm text-gray-800 dark:text-gray-100">
              {ownerName}
            </span>
            {createdAt && (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatRelativeTime(createdAt)}
              </span>
            )}
          </div>
          {/* Using div for potentially rich text, sanitize if necessary! */}
          <div
            className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed break-words" // break-words for long text without spaces
            // If using HTML: dangerouslySetInnerHTML={{ __html: commentBody }}
            // If plain text:
          >
            {commentBody}
          </div>
          {/* Or if plain text <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed break-words">{commentBody}</p> */}
        </div>
        {/* Action Buttons */}
        <section className="flex items-center space-x-4 pt-2 text-xs">
          {replies && replies.length > 0 && (
            <button
              onClick={() => setCommentsOpen(!commentsOpen)}
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer group"
              aria-expanded={commentsOpen}
            >
              {commentsOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
              <span>
                {commentsOpen ? "Sembunyikan" : `${replies.length} Balasan`}
              </span>
            </button>
          )}
          <button
            onClick={() => setReplyOpen(!replyOpen)} // Toggle reply input
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer group"
            aria-controls={`reply-form-${data.id}`} // Accessibility
            aria-expanded={replyOpen}
          >
            <CornerDownRight className="w-3.5 h-3.5" />
            <span>Balas</span>
          </button>
          {/* Add other actions like 'Like' here if needed */}
        </section>
        {/* Reply Input Section (Animated) */}
        <AnimatePresence initial={false}>
          {replyOpen && (
            <motion.div
              key={`reply-form-${data.id}`}
              id={`reply-form-${data.id}`}
              variants={sectionRevealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-[500px] px-3 pt-3" // Full width, padding top adjusted in variants
            >
              {/* Simplified reply input structure */}
              <div className="flex flex-col space-y-3">
                <Input
                  ref={replyInputRef as RefObject<HTMLInputElement>} // Cast needed?
                  placeholder={`Balas ke ${ownerName}...`}
                  className="text-sm bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                />
                {error && <p className="text-red-500 text-xs px-1">{error}</p>}
                <div className="flex space-x-2 self-end">
                  <Button
                    onClick={() => setReplyOpen(false)}
                    className="cursor-pointer text-gray-600 dark:text-gray-300 px-3 h-8 text-xs"
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-3.5 h-3.5 mr-1" /> Batal
                  </Button>
                  <LoadableButton
                    isLoading={loading}
                    onClick={submitReply} // Direct function pass
                    className="cursor-pointer bg-teal-600 hover:bg-teal-500 text-white rounded-md px-3 h-8 text-xs shadow-sm"
                    size="sm" // Ensure consistent size
                    whileHover={buttonHoverEffect}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" /> Kirim
                  </LoadableButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Replies List Section (Animated) */}
        <AnimatePresence initial={false}>
          {replies && replies.length > 0 && commentsOpen && (
            <motion.section
              key={`replies-list-${data.id}`}
              variants={sectionRevealVariants} // Reuse reveal animation
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pl-5 mt-3 border-l-2 border-teal-100 dark:border-teal-900/50" // Indentation & visual line
            >
              <motion.div
                className="flex flex-col space-y-4" // Tighter spacing for replies
                variants={repliesListVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {replies.map((item) => (
                  <motion.div key={item.id} variants={replyItemVariants}>
                    {/* Render Reply using ReplySection or similar component */}
                    <ReplySection data={item} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CommentCardView;

// --- Make sure your types match ---
// Example in ./CommentCard.type.ts (Ensure CommentData includes needed fields)
/*
export interface CommentOwner {
  id: string;
  name: string;
  avatar?: string; // Make avatar optional
}

export interface CommentReplyData { // Type for replies data passed to ReplySection
  id: string;
  body: string;
  owner: CommentOwner;
  createdAt: string | Date;
  // ... other reply fields
}

export interface CommentData {
  id: string;
  body: string;
  owner: CommentOwner;
  createdAt: string | Date; // Added timestamp
  // Potentially likes, etc.
}

export interface CommentCardProps {
  data: CommentData;
  replies?: CommentReplyData[]; // Array of replies for this comment
  commentsOpen: boolean;
  setCommentsOpen: (isOpen: boolean) => void;
  replyOpen: boolean;
  setReplyOpen: (isOpen: boolean) => void;
  replyInputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | undefined>; // Adjust based on Input/Textarea used for reply
  submitReply: () => void; // Consider if it needs arguments
  loading: boolean;
  error: string | null;
}
*/

// --- Suggestion for ReplySection (if needed) ---
// Ensure ReplySection also uses a similar structure (Avatar, Author+Time, Body)
// but perhaps visually slightly smaller or simpler than the main CommentCard.
// Example minimal structure:
/*
const ReplySection = ({ data }) => (
  <motion.div layout className="flex space-x-2 py-2">
    <div className="flex-shrink-0"><UserAvatar src={data.owner?.avatar} name={data.owner?.name} size="xs"/></div> // Extra small avatar
    <div className="text-xs">
      <span className="font-medium text-gray-700 dark:text-gray-200">{data.owner?.name}</span>
      <span className="text-gray-400 dark:text-gray-500 ml-1.5">{formatRelativeTime(data.createdAt)}</span>
      <p className="text-gray-600 dark:text-gray-300 mt-0.5">{data.body}</p>
    </div>
  </motion.div>
);
*/
