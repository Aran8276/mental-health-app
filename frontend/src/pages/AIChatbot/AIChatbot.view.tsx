import { FC } from "react";
import { AIChatbotProps } from "./AIChatbot.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AIChatbotView: FC<AIChatbotProps> = () => {
  return (
    <>
      <section className="flex flex-col space-y-8 h-screen items-center">
        <section className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex opacity-75 hover:opacity-100 transition-all cursor-pointer space-x-3 items-center">
                <span>Llama</span>
                <ChevronDown className="size-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute">
              <DropdownMenuLabel>Model Chatbot</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Llama 3.1</DropdownMenuItem>
              <DropdownMenuItem>GPT-4o</DropdownMenuItem>
              <DropdownMenuItem>Qwen</DropdownMenuItem>
              <DropdownMenuItem>Deepseek</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
        <section className="w-full h-[400px] px-50">
          <div className="flex self-start w-full flex-col space-y-8">
            <Card className="self-end max-w-[500px]">
              <CardContent>Pesan Anda Disini</CardContent>
            </Card>
            <Card className="self-start max-w-[500px]">
              <CardContent>
                Jawaban Bot Disini Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Expedita animi, illum voluptates minima
                asperiores dolores omnis laboriosam aspernatur provident eum
                blanditiis ratione optio qui earum cumque consequuntur
                perferendis culpa. Cupiditate?
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="w-full px-50">
          <div className="flex w-full items-center space-x-3">
            <Input placeholder="Tanya AI Chatbot" className="h-[50px] w-full" />
            <Button className="size-12 cursor-pointer">
              <Send />
            </Button>
          </div>
        </section>
      </section>
    </>
  );
};

export default AIChatbotView;
