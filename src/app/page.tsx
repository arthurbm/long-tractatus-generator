import { TractatusGenerator } from "~/components/tractatus-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-24">
      <h1 className="mb-8 text-4xl font-bold">AI Tractatus Generator</h1>
      <TractatusGenerator />
    </main>
  );
}
