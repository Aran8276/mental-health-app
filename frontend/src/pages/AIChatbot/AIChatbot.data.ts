const pageLoadVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const suggestionsContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const suggestionChipVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  hover: {
    scale: 1.08,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.95 },
};

const messageVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 250, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

const botMessageSpecific = {
  hidden: { ...messageVariant.hidden, x: -20 },
  visible: { ...messageVariant.visible, x: 0 },
  exit: { ...messageVariant.exit, x: -20 },
};

const userMessageSpecific = {
  hidden: { ...messageVariant.hidden, x: 20 },
  visible: { ...messageVariant.visible, x: 0 },
  exit: { ...messageVariant.exit, x: 20 },
};

const typingIndicatorVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

const sendButtonHoverTap = {
  hover: { scale: 1.1, transition: { type: "spring", stiffness: 400 } },
  tap: { scale: 0.9 },
};

const userBubbleColor = "bg-teal-600 dark:bg-teal-500 text-white";
const botBubbleColor =
  "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100";
const suggestionChipColor =
  "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/60";
const sendButtonGradient =
  "bg-gradient-to-r from-teal-500 via-purple-500 to-teal-600 hover:from-teal-600 hover:via-purple-600 hover:to-teal-700";

export {
  pageLoadVariant,
  suggestionsContainerVariant,
  suggestionChipVariant,
  messageVariant,
  botMessageSpecific,
  userMessageSpecific,
  typingIndicatorVariant,
  sendButtonHoverTap,
  userBubbleColor,
  botBubbleColor,
  suggestionChipColor,
  sendButtonGradient,
};
