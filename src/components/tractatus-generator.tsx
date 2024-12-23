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
import { Copy, StopCircle, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export function TractatusGenerator() {
  const [requestType, setRequestType] = useState<"json" | "text">("text");
  const [model, setModel] = useState<
    "gpt-4o-mini" | "gemini-flash-1.5" | "gemini-flash-2.0"
  >("gpt-4o-mini");
  const [language, setLanguage] = useState<
    "same" | "en" | "pt-BR" | "es" | "fr" | "it"
  >("same");
  const [uploadedText, setUploadedText] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const {
    input,
    complete,
    handleInputChange,
    completion,
    isLoading,
    stop,
    setCompletion,
    setInput,
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
      }, 3000);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCompletion("");
    const combinedText = [uploadedText, input].filter(Boolean).join("\n\n");
    await complete(combinedText, {
      body: {
        returnType: requestType,
        modelValue: model,
        language,
      },
    });
  };

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = (await response.json()) as { message: string };
          throw new Error(error.message || "Failed to upload file");
        }

        const data = (await response.json()) as { text: string };
        setUploadedText(data.text);
        setUploadedFileName(file.name);
        toast.success("File uploaded successfully", {
          description:
            "The file content has been processed and will be included in the generation.",
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file", {
          description:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    },
    [],
  );

  const clearUploadedFile = useCallback(() => {
    setUploadedText("");
    setUploadedFileName("");
    toast.success("File removed", {
      description: "The uploaded file has been removed.",
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Tractatus Generator</CardTitle>
          <CardDescription>
            Generate a comprehensive tractatus from your text and/or uploaded
            files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Output Format
                </label>
                <Select
                  value={requestType}
                  onValueChange={(value: "json" | "text") =>
                    setRequestType(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Output Language
                </label>
                <Select
                  value={language}
                  onValueChange={(
                    value: "same" | "en" | "pt-BR" | "es" | "fr" | "it",
                  ) => setLanguage(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select output language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="same">Same as Material</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt-BR">Portuguese (Brazil)</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Model</label>
                <RadioGroup
                  value={model}
                  onValueChange={(
                    value:
                      | "gpt-4o-mini"
                      | "gemini-flash-1.5"
                      | "gemini-flash-2.0",
                  ) => setModel(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gpt-4o-mini" id="gpt4" />
                    <label htmlFor="gpt4" className="text-sm">
                      GPT-4o Mini
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gemini-flash-1.5" id="gemini" />
                    <label htmlFor="gemini" className="text-sm">
                      Gemini Flash 1.5
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gemini-flash-2.0" id="gemini2" />
                    <label htmlFor="gemini2" className="text-sm">
                      Gemini Flash 2.0
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Input Methods</label>
                <div className="rounded-md border p-4">
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">
                      1. Upload File (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </Button>
                      {uploadedFileName && (
                        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1">
                          <span className="text-sm text-muted-foreground">
                            {uploadedFileName}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={clearUploadedFile}
                            className="h-auto p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      2. Manual Text Input (Optional)
                    </label>
                    <Textarea
                      placeholder="Enter your text here..."
                      className="min-h-[200px]"
                      value={input}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isLoading || (!input && !uploadedText)}
                >
                  {isLoading ? "Generating..." : "Generate Tractatus"}
                </Button>
                {isLoading && (
                  <Button type="button" variant="destructive" onClick={stop}>
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
              <div className="whitespace-pre-wrap rounded-md bg-muted p-4">
                {completion}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
