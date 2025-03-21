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
import { useCompletion } from "@ai-sdk/react";
import {
  Copy,
  StopCircle,
  Upload,
  X,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./toggle-theme";

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

export function TractatusGenerator() {
  const router = useRouter();
  const [requestType, setRequestType] = useState<"json" | "text">("text");
  const [model, setModel] = useState<"gpt-4o-mini" | "gemini-flash-2.0">(
    "gpt-4o-mini",
  );
  const [language, setLanguage] = useState<
    "same" | "en" | "pt-BR" | "es" | "fr" | "it"
  >("same");
  const [uploadedText, setUploadedText] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const {
    input,
    complete,
    handleInputChange,
    completion,
    isLoading,
    stop,
    setCompletion,
  } = useCompletion({
    api: "/api/tractatus",
    onFinish: () => {
      setCurrentMessageIndex(0);
    },
  });

  const handleCopy = useCallback(async () => {
    if (completion) {
      await navigator.clipboard.writeText(completion);
      toast.success("Copied to clipboard", {
        description: "The tractatus has been copied to your clipboard.",
      });
    }
  }, [completion]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
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
    },
    [
      complete,
      uploadedText,
      input,
      requestType,
      model,
      language,
      setCompletion,
    ],
  );

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        setIsUploading(true);
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
      } finally {
        setIsUploading(false);
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % loadingMessages.length,
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const currentMessage = loadingMessages[currentMessageIndex];

  const isSubmitDisabled = useMemo(
    () => isLoading || isUploading || (!input && !uploadedText),
    [isLoading, isUploading, input, uploadedText],
  );

  const handleModelChange = useCallback(
    (value: "gpt-4o-mini" | "gemini-flash-2.0") => {
      if (!isLoading) {
        setModel(value);
      }
    },
    [isLoading],
  );

  const handleRequestTypeChange = useCallback((value: "json" | "text") => {
    setRequestType(value);
  }, []);

  const handleLanguageChange = useCallback(
    (value: "same" | "en" | "pt-BR" | "es" | "fr" | "it") => {
      setLanguage(value);
    },
    [],
  );

  const handleChatClick = useCallback(() => {
    if (completion) {
      localStorage.setItem("tractatus", completion);
      router.push("/chat");
    }
  }, [completion, router]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Tractatus Generator
          <ModeToggle />
        </CardTitle>
        <CardDescription>
          Generate a comprehensive tractatus from your text and/or uploaded
          files
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Output Format
              </label>
              <Select
                value={requestType}
                onValueChange={handleRequestTypeChange}
                disabled={isLoading}
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
                onValueChange={handleLanguageChange}
                disabled={isLoading}
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
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Model</label>
            <RadioGroup
              value={model}
              onValueChange={handleModelChange}
              className="grid gap-2 md:grid-cols-2"
              disabled={isLoading}
            >
              <label className="cursor-pointer">
                <div
                  className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50"
                  onClick={() => handleModelChange("gpt-4o-mini")}
                >
                  <RadioGroupItem value="gpt-4o-mini" id="gpt4" />
                  <span className="text-sm">GPT-4o Mini</span>
                </div>
              </label>
              <label className="cursor-pointer">
                <div
                  className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50"
                  onClick={() => handleModelChange("gemini-flash-2.0")}
                >
                  <RadioGroupItem value="gemini-flash-2.0" id="gemini2" />
                  <span className="text-sm">Gemini Flash 2.0</span>
                </div>
              </label>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Input Methods</label>
            <div className="space-y-4 rounded-md border p-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  1. Upload File (Optional)
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={isLoading || isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                    disabled={isLoading || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </>
                    )}
                  </Button>
                  {uploadedFileName && (
                    <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1">
                      <span className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {uploadedFileName}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearUploadedFile}
                        className="h-auto p-0"
                        disabled={isLoading || isUploading}
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
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={isSubmitDisabled}>
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
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">Generated Tractatus:</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="shrink-0"
                  disabled={isLoading}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleChatClick}
                  className="shrink-0"
                  disabled={isLoading}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with Tractatus
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto whitespace-pre-wrap rounded-md bg-muted p-4">
              {completion}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
