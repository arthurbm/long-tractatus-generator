import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background p-24">
      <div className="max-w-3xl text-center">
        <h1 className="mb-8 text-5xl font-bold">AI Tractatus Generator</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          {
            "Transform your ideas into a structured philosophical treatise, inspired by Wittgenstein's Tractatus Logico-Philosophicus."
          }
        </p>
        <div className="mb-12 space-y-6 text-left">
          <div>
            <h2 className="mb-2 text-2xl font-semibold">
              What is a Tractatus?
            </h2>
            <p className="text-muted-foreground">
              A Tractatus is a philosophical work written in a hierarchically
              numbered format. Each statement is carefully numbered to show its
              logical relationship to other statements, creating a clear and
              structured presentation of complex ideas.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold">
              Perfect for Long Content
            </h2>
            <p className="text-muted-foreground">
              Unlike traditional AI tools, our generator excels at processing
              extensive content like entire books or long articles. It
              automatically:
            </p>
            <ul className="mt-2 list-inside list-disc text-muted-foreground">
              <li>Identifies and separates distinct sections in your text</li>
              <li>
                Generates a dedicated tractatus for each section, ensuring
                thorough coverage
              </li>
              <li>
                Processes content beyond typical AI token limits through smart
                sectioning
              </li>
              <li>Maintains logical coherence across all generated sections</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold">How it Works</h2>
            <p className="mt-0 text-muted-foreground">
              Our AI-powered generator takes your input and transforms it into a
              structured Tractatus format, organizing your ideas into logical
              hierarchies and relationships. Perfect for philosophers,
              researchers, and anyone interested in structured thinking.
            </p>
            <p className="mt-2 text-muted-foreground">
              For long texts, it intelligently breaks down the content into
              manageable sections, ensuring each part receives detailed
              attention while maintaining the overall logical flow.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold">Learn more</h2>
            <p className="mt-0 text-muted-foreground">
              Here are some links to learn more about Tractatus:
            </p>
            <ul className="list-inside list-disc text-muted-foreground">
              <li>
                <Link
                  href="https://biblioteca.tds.company/tds-books-tractatus-a-wittgenstein-inspired-framework-for-structuring-knowledge-in-llms"
                  className="text-primary underline"
                >
                  TDS Books - Tractatus: A Wittgenstein Inspired Framework for
                  Structuring Knowledge in LLMs
                </Link>
              </li>
              <li>
                <Link
                  href="https://pt.wikipedia.org/wiki/Tractatus_Logico-Philosophicus"
                  className="text-primary underline"
                >
                  Wikipedia - Tractatus
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Button asChild>
          <Link href="/generate">Start Generating</Link>
        </Button>
      </div>
    </main>
  );
}
