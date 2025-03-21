"use client";

import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card } from "~/components/ui/card";
import { Loader2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { generateId } from "ai";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";

const initialMessageId = generateId();

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

  const { messages, input, setInput, status, handleSubmit } = useChat({
    api: "/api/chat",
    body: {
      tractatus,
    },
    initialMessages: [
      {
        id: initialMessageId,
        role: "assistant",
        content:
          "Hello! I'm here to help you explore and understand your generated Tractatus. What would you like to discuss?",
      },
    ],
  });

  const isLoading = status === "streaming" || status === "submitted";

  if (!tractatus) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <Card
                  className={`max-w-[80%] p-4 ${
                    message.role === "assistant"
                      ? "bg-secondary"
                      : "bg-background"
                  }`}
                >
                  <div
                    className={`prose prose-neutral dark:prose-invert ${message.role === "user" ? "text-right" : ""}`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl gap-2">
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
