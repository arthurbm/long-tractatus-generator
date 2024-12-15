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
import { useEffect, useRef } from "react";
import { Copy, StopCircle } from "lucide-react";
import { toast } from "sonner";

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

  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (isLoading && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [completion, isLoading]);

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
            <div className="mt-4 flex gap-2">
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
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {completion && (
            <div className="w-full" ref={resultRef}>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Tractatus:</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="ml-2"
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
