import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import WordExtractor from "word-extractor";

interface ErrorResponse {
  error: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json<ErrorResponse>(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    let extractedText = "";
    const fileType = file.name.split(".").pop()?.toLowerCase();

    switch (fileType) {
      case "pdf":
        try {
          const pdfData = await pdfParse(Buffer.from(buffer));
          if (pdfData && typeof pdfData.text === 'string') {
            extractedText = pdfData.text;
          } else {
            throw new Error('Invalid PDF data structure');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown PDF error';
          return NextResponse.json<ErrorResponse>(
            { error: "Failed to parse PDF file", message: errorMessage },
            { status: 400 }
          );
        }
        break;

      case "docx":
        try {
          const extractor = new WordExtractor();
          const docxBuffer = Buffer.from(buffer);
          const extracted = await extractor.extract(docxBuffer);
          extractedText = extracted.getBody();

          if (!extractedText) {
            throw new Error('No text content found in DOCX file');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown DOCX error';
          return NextResponse.json<ErrorResponse>(
            { error: "Failed to parse DOCX file", message: errorMessage },
            { status: 400 }
          );
        }
        break;

      case "txt":
        try {
          extractedText = await new Response(file).text();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown text error';
          return NextResponse.json<ErrorResponse>(
            { error: "Failed to parse TXT file", message: errorMessage },
            { status: 400 }
          );
        }
        break;

      default:
        return NextResponse.json<ErrorResponse>(
          { error: "Unsupported file type. Please upload a PDF, DOCX, or TXT file." },
          { status: 400 }
        );
    }

    if (!extractedText) {
      return NextResponse.json<ErrorResponse>(
        { error: "No text could be extracted from the file" },
        { status: 400 }
      );
    }

    extractedText = extractedText
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return NextResponse.json({ text: extractedText });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json<ErrorResponse>(
      { error: "Error processing file", message: errorMessage },
      { status: 500 }
    );
  }
} 