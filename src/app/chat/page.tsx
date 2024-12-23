import React from "react";
import { Chat } from "~/components/chat";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import Link from "next/link";
import { BookText } from "lucide-react";
import { ModeToggle } from "~/components/toggle-theme";

export const runtime = "edge";
export const preferredRegion = "auto";

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10">
                  <BookText className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Tractatus Chat</h1>
              <p className="text-sm text-muted-foreground">
                Chat with your Tractatus context
              </p>
            </div>
          </div>
          <ModeToggle />
        </div>
      </header>

      <Chat />
    </div>
  );
}
