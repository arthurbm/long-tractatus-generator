import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  ArrowRight,
  BookText,
  Brain,
  FileText,
  LayoutList,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 py-8 md:p-24">
      <div className="container max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            AI Tractatus Generator
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Transform your ideas into a structured philosophical treatise,
            inspired by Wittgenstein&apos;s methodology
          </p>

          <Button asChild size="lg" className="gap-2">
            <Link href="/generate">
              Start Generating <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <BookText className="mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">What is a Tractatus?</h2>
            <p className="text-muted-foreground">
              A Tractatus is a philosophical work written in a hierarchically
              numbered format, where each statement shows its logical
              relationship to others, creating a clear and structured
              presentation of complex ideas.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Brain className="mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">AI-Powered Analysis</h2>
            <p className="text-muted-foreground">
              Our advanced AI system processes your content intelligently,
              identifying key concepts and creating logical hierarchies that
              reflect the depth and interconnections of your ideas.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <FileText className="mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">
              Perfect for Long Content
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Handles extensive content like books or articles</li>
              <li>• Smart sectioning beyond typical AI limits</li>
              <li>• Maintains coherence across sections</li>
              <li>• Preserves logical relationships</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <LayoutList className="mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Learn More</h2>
            <div className="space-y-2">
              <Link
                href="https://biblioteca.tds.company/tds-books-tractatus-a-wittgenstein-inspired-framework-for-structuring-knowledge-in-llms"
                className="block text-primary hover:underline"
              >
                • TDS Books - Tractatus Framework
              </Link>
              <Link
                href="https://pt.wikipedia.org/wiki/Tractatus_Logico-Philosophicus"
                className="block text-primary hover:underline"
              >
                • Wikipedia - Tractatus
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
