import { FC, Fragment, useRef, useState } from "react";
import { AIChatbotProps, Conversation } from "./AIChatbot.type";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  Send,
  Sparkles,
  User,
  Bot,
  Brain,
  Smile,
  Bed,
  Menu,
  X,
  Plus,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  pageLoadVariant,
  sidebarVariant,
  mobileOverlayVariant,
  suggestionsContainerVariant,
  suggestionChipVariant,
  botMessageSpecific,
  userMessageSpecific,
  typingIndicatorVariant,
  sendButtonHoverTap,
  listStagger,
  listItemFade,
  userBubbleColor,
  botBubbleColor,
  suggestionChipColor,
  sendButtonGradient,
  sidebarBg,
  sidebarHoverBg,
  sidebarActiveBg,
  sidebarTextColor,
  sidebarActiveTextColor,
  newChatButtonColor,
} from "./AIChatbot.data";

interface ChatItemProps {
  convo: Conversation;
  isActive: boolean;
  onSelect: (id: string | number) => void;
}
const ChatItem: FC<ChatItemProps> = ({ convo, isActive, onSelect }) => (
  <motion.li variants={listItemFade} whileHover="hover" whileTap="tap">
    <button
      onClick={() => onSelect(convo.id)}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors duration-150 ease-in-out",
        sidebarTextColor,
        sidebarHoverBg,
        isActive
          ? `${sidebarActiveBg} ${sidebarActiveTextColor} font-medium`
          : ""
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <MessageSquare
        className={cn(
          "w-4 h-4 flex-shrink-0",
          isActive ? sidebarActiveTextColor : "text-gray-500 dark:text-gray-400"
        )}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{convo.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
          {convo.lastMessage || "Belum ada pesan"}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-7 w-7 ml-auto flex-shrink-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
              isActive ? sidebarActiveTextColor : sidebarTextColor
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent> ... Actions ... </DropdownMenuContent>
      </DropdownMenu>
    </button>
  </motion.li>
);

interface ChatSidebarProps {
  conversations: Conversation[];
  activeChatId: string | number | null;
  onSelectChat: (id: string | number) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onClose?: () => void;
}
const ChatSidebar: FC<ChatSidebarProps> = ({
  conversations,
  activeChatId,
  onSelectChat,
  onNewChat,
  isOpen,
  onClose,
}) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && onClose && (
          <motion.div
            key="sidebar-overlay"
            variants={mobileOverlayVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        key="sidebar"
        variants={sidebarVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          "fixed inset-y-0 left-0 z-20 md:relative md:translate-x-0",
          "w-72 border-r border-gray-200 dark:border-gray-700/50 flex flex-col shadow-lg md:shadow-none",
          sidebarBg,
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Daftar Percakapan"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Percakapan
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-3 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNewChat}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors",
              newChatButtonColor
            )}
          >
            <Plus className="w-4 h-4" /> Percakapan Baru
          </motion.button>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto px-3 py-2">
          <motion.ul
            className="space-y-1"
            variants={listStagger}
            initial="hidden"
            animate="visible"
          >
            {conversations.map((convo) => (
              <ChatItem
                key={convo.id}
                convo={convo}
                isActive={activeChatId === convo.id}
                onSelect={onSelectChat}
              />
            ))}
            {conversations.length === 0 && (
              <motion.p
                variants={listItemFade}
                className="text-center text-sm text-gray-500 py-4 italic"
              >
                Mulai percakapan baru!
              </motion.p>
            )}
          </motion.ul>
        </ScrollArea>
      </motion.aside>
    </>
  );
};

const AIChatbotView: FC<AIChatbotProps> = ({
  setSelectedModel,
  handleSendMessage,
  handleSuggestionClick,
  selectedModel,
  isBotTyping,
  inputValue,
  setInputValue,
  messages,
  conversations,
  activeChatId,
  handleSelectChat,
  handleNewChat,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          handleSelectChat(id);
          setIsMobileSidebarOpen(false);
        }}
        onNewChat={() => {
          handleNewChat();
          setIsMobileSidebarOpen(false);
        }}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-teal-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-black dark:to-purple-950/60 overflow-hidden">
        <motion.header
          variants={pageLoadVariant}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm z-10 flex-shrink-0"
        >
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2 h-9 w-9 rounded-lg"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Buka Daftar Percakapan</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-1.5 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Model: {selectedModel}</span>
                <ChevronDown className="w-4 h-4 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuLabel>Pilih Model AI</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedModel}
                onValueChange={setSelectedModel}
              >
                <DropdownMenuRadioItem value="Llama 3.1">
                  Llama 3.1
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="GPT-4o">
                  GPT-4o
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Qwen 2">
                  Qwen 2
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Deepseek Coder">
                  Deepseek Coder
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="md:hidden w-9"></div>{" "}
        </motion.header>

        <ScrollArea className="flex-1 h-[1px]" ref={viewportRef}>
          {" "}
          <div className="flex flex-col py-6 px-4 md:px-6 lg:px-8 space-y-4 max-w-4xl mx-auto min-h-full">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  layout
                  variants={
                    message.sender === "user"
                      ? userMessageSpecific
                      : botMessageSpecific
                  }
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={cn(
                    "flex items-end gap-2",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-700 shadow-sm flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400">
                        <Bot className="w-4 h-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-xl px-4 py-2.5 shadow-md",
                      message.sender === "user"
                        ? `${userBubbleColor} rounded-br-none`
                        : `${botBubbleColor} rounded-bl-none`
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {typeof message.text === "string"
                        ? message.text
                            .split(/(\*\*.*?\*\*)/g)
                            .map((part, index) =>
                              part.startsWith("**") && part.endsWith("**") ? (
                                <strong key={index}>{part.slice(2, -2)}</strong>
                              ) : (
                                <Fragment key={index}>{part}</Fragment>
                              )
                            )
                        : message.text}{" "}
                    </p>
                    <span
                      className={cn(
                        "text-xs opacity-70 mt-1 block",
                        message.sender === "user"
                          ? "text-right text-teal-100 dark:text-teal-300"
                          : "text-left text-gray-500 dark:text-gray-400"
                      )}
                    >
                      {message.timestamp}
                    </span>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 border-2 border-teal-200 dark:border-teal-700 shadow-sm flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-teal-400 to-blue-400">
                        <User className="w-4 h-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              {isBotTyping && (
                <motion.div
                  key="typing-indicator"
                  layout
                  variants={typingIndicatorVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-end gap-2 justify-start"
                >
                  <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400">
                      <Bot className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`${botBubbleColor} rounded-xl rounded-bl-none px-4 py-3 shadow-md flex items-center space-x-1.5`}
                  >
                    <span
                      className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <motion.footer
          variants={pageLoadVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="sticky bottom-0 p-4 md:px-6 md:pb-4 border-t border-gray-200 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md flex-shrink-0"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={suggestionsContainerVariant}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 mb-3"
            >
              {[
                { text: "Bagaimana cara menenangkan diri?", icon: Smile },
                { text: "Bantu saya mengatasi kecemasan", icon: Brain },
                { text: "Saya sulit tidur akhir-akhir ini", icon: Bed },
              ].map((suggestion) => (
                <motion.div
                  key={suggestion.text}
                  variants={suggestionChipVariant}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-auto py-1 px-3 rounded-full text-xs font-medium border-transparent transition-colors duration-200 ${suggestionChipColor}`}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <suggestion.icon className="w-3.5 h-3.5 mr-1.5 opacity-80" />{" "}
                    {suggestion.text}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            <form
              className="flex items-center gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Ketik pesanmu di sini..."
                className="flex-1 h-12 px-4 rounded-lg bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-400 dark:focus:ring-teal-500 dark:placeholder-gray-400 transition-colors"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={sendButtonHoverTap}
              >
                <Button
                  type="submit"
                  size="icon"
                  className={`size-12 rounded-full ${sendButtonGradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={!inputValue.trim() || isBotTyping}
                  aria-label="Kirim pesan"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.footer>
      </div>{" "}
    </div>
  );
};

export default AIChatbotView;
