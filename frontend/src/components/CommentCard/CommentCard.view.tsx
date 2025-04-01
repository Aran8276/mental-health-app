import { FC, RefObject } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadableButton from "../LoadableButton/LoadableButton";
import ReplySection from "../ReplySection/ReplySection";
import UserAvatar from "../UserAvatar/UserAvatar";
import { motion, AnimatePresence } from "framer-motion";
import {
  CornerDownRight,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  Clock,
} from "lucide-react";
import { CommentCardProps } from "./CommentCard.type";
import {
  sectionRevealVariants,
  buttonHoverEffect,
  repliesListVariants,
  replyItemVariants,
} from "./CommentCard.data";
import { Link } from "react-router-dom";

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
  const ownerAvatar = "avatar";
  const commentBody = data.body || "";
  const createdAt = "created at";

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex space-x-3 py-4 border-b border-gray-100 dark:border-slate-700/50"
    >
      <Link to={`/profile/${data.owner.id}`} className="flex-shrink-0 pt-1">
        <UserAvatar src={ownerAvatar} name={ownerName} size="sm" />{" "}
      </Link>

      <div className="flex flex-col w-full min-w-0">
        {" "}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <Link
              to={`/profile/${data.owner.id}`}
              className="font-semibold tracking-tight text-sm text-gray-800 dark:text-gray-100"
            >
              {ownerName}
            </Link>
            {createdAt && (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {"date goes here"}
              </span>
            )}
          </div>

          <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed break-words">
            {commentBody}
          </div>
        </div>
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
            onClick={() => setReplyOpen(!replyOpen)}
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 cursor-pointer group"
            aria-controls={`reply-form-${data.id}`}
            aria-expanded={replyOpen}
          >
            <CornerDownRight className="w-3.5 h-3.5" />
            <span>Balas</span>
          </button>
        </section>
        <AnimatePresence initial={false}>
          {replyOpen && (
            <motion.div
              key={`reply-form-${data.id}`}
              id={`reply-form-${data.id}`}
              variants={sectionRevealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-auto md:w-[500px] px-3 pt-3"
            >
              <div className="flex flex-col space-y-3">
                <Input
                  ref={replyInputRef as RefObject<HTMLInputElement>}
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
                  <motion.button
                    whileHover={buttonHoverEffect}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LoadableButton
                      isLoading={loading}
                      onClick={submitReply}
                      className="cursor-pointer bg-teal-600 hover:bg-teal-500 text-white rounded-md px-3 h-8 text-xs shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" /> Kirim
                    </LoadableButton>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {replies && replies.length > 0 && commentsOpen && (
            <motion.section
              key={`replies-list-${data.id}`}
              variants={sectionRevealVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pl-5 mt-3 border-l-2 border-teal-100 dark:border-teal-900/50"
            >
              <motion.div
                className="flex flex-col space-y-4"
                variants={repliesListVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {replies.map((item) => (
                  <motion.div key={item.id} variants={replyItemVariants}>
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
