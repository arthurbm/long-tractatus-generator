"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card } from "~/components/ui/card";
import { Loader2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { RiRobot2Line } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { generateId } from "ai";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";

export function Chat() {
  const router = useRouter();
  const [tractatus, setTractatus] = useState<string | null>(null);

  useEffect(() => {
    const storedTractatus = localStorage.getItem("tractatus");
    if (!storedTractatus) {
      router.push("/generate");
      return;
    }
    setTractatus(storedTractatus);
  }, [router]);

  const { messages, input, setInput, status, append } = useChat({
    api: "/api/chat",
    body: {
      tractatus,
    },
    initialMessages: [
      {
        id: generateId(),
        role: "assistant",
        content:
          "Hello! I'm here to help you explore and understand your generated Tractatus. What would you like to discuss?",
      },
    ],
  });

  const isLoading = status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setInput("");
    void append({
      content: input,
      role: "user",
    });
  };

  if (!tractatus) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <Card
                key={i}
                className={`flex items-start gap-3 p-4 ${
                  message.role === "assistant"
                    ? "bg-secondary"
                    : "bg-background"
                }`}
              >
                <Avatar>
                  <AvatarFallback className="flex items-center justify-center">
                    {message.role === "user" ? (
                      <BsPerson className="h-5 w-5" />
                    ) : (
                      <RiRobot2Line className="h-5 w-5" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col space-y-2 self-center">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your generated Tractatus..."
            className="min-h-[48px] w-full resize-none rounded-md bg-secondary"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
