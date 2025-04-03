import { FC, Fragment } from "react";
import { AIChatbotProps } from "./AIChatbot.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Send,
  Sparkles,
  User,
  Bot,
  Brain,
  Smile,
  Bed,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  pageLoadVariant,
  userMessageSpecific,
  botMessageSpecific,
  typingIndicatorVariant,
  suggestionsContainerVariant,
  suggestionChipVariant,
  sendButtonHoverTap,
  botBubbleColor,
  sendButtonGradient,
  suggestionChipColor,
  userBubbleColor,
} from "./AIChatbot.data";

const AIChatbotView: FC<AIChatbotProps> = ({
  setSelectedModel,
  handleSendMessage,
  handleSuggestionClick,
  selectedModel,
  isBotTyping,
  inputValue,
  setInputValue,
  messages,
  chatContainerRef,
}) => {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-gradient-to-br from-teal-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-black dark:to-purple-950/60 overflow-hidden">
      <motion.header
        variants={pageLoadVariant}
        initial="hidden"
        animate="visible"
        className="flex justify-center items-center p-3 border-b border-gray-200 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm z-10"
      >
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
      </motion.header>

      <ScrollArea className="flex-1 h-[400px]">
        {" "}
        <div
          ref={chatContainerRef}
          className="flex flex-col py-6 px-4 md:px-6 lg:px-8 space-y-4 max-w-4xl mx-auto"
        >
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
                    {message.text
                      .split(/(\*\*.*?\*\*)/)
                      .map((part, index) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={index}>{part.slice(2, -2)}</strong>
                        ) : (
                          <Fragment key={index}>{part}</Fragment>
                        )
                      )}
                  </p>{" "}
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
        className="sticky p-4 md:px-6 md:pb-4 border-t border-gray-200 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md"
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
                  <suggestion.icon className="w-3.5 h-3.5 mr-1.5 opacity-80" />
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
              whileHover={sendButtonHoverTap.hover}
              whileTap={sendButtonHoverTap.tap}
            >
              <Button
                type="submit"
                size="icon"
                className={`size-12 rounded-full ${sendButtonGradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={!inputValue.trim() || isBotTyping}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.footer>
    </div>
  );
};

export default AIChatbotView;
