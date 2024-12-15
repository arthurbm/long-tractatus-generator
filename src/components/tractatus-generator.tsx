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

export function TractatusGenerator() {
  const { input, handleInputChange, handleSubmit, completion, isLoading } =
    useCompletion({
      api: "/api/tractatus",
    });

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
            <Button type="submit" className="mt-4" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Tractatus"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {completion && (
            <div className="w-full">
              <h3 className="mb-2 text-lg font-semibold">
                Generated Tractatus:
              </h3>
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
