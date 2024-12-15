"use client";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useCompletion } from "ai/react";
import { Copy, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export function TractatusGenerator() {
  const {
    input,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    stop,
  } = useCompletion({
    api: "/api/tractatus",
  });

  const loadingMessages = [
    "☕ Grab a cup of coffee while I think...",
    "🤔 Processing your brilliant ideas...",
    "🧩 Organizing your thoughts Wittgenstein-style...",
    "🎯 Making your text more philosophical...",
    "🔄 Transforming chaos into order...",
    "🎨 Crafting your intellectual masterpiece...",
    "🌟 Almost there, just adding some sparkle...",
    "📚 Consulting the great philosophers...",
  ];

  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentMessage((prevMessage) => {
          if (!prevMessage) return loadingMessages[0];
          const currentIndex = loadingMessages.indexOf(prevMessage);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 3000); // Change message every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleCopy = async () => {
    if (completion) {
      await navigator.clipboard.writeText(completion);
      toast.success("Copied to clipboard", {
        description: "The tractatus has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Tractatus Generator</CardTitle>
          <CardDescription>
            Enter your text to generate a comprehensive tractatus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="Enter your text here..."
              className="min-h-[200px]"
              value={input}
              onChange={handleInputChange}
            />
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Generating..." : "Generate Tractatus"}
                </Button>
                {isLoading && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => stop()}
                  >
                    <StopCircle className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                )}
              </div>
              {isLoading && (
                <p className="animate-pulse text-sm text-muted-foreground">
                  {currentMessage}
                </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {completion && (
            <div className="w-full">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Tractatus:</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="ml-2"
                  disabled={isLoading}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
              <div className="whitespace-pre-wrap rounded-md bg-gray-100 p-4">
                {completion}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
