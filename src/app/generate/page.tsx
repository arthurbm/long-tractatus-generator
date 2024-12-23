import { TractatusGenerator } from "~/components/tractatus-generator";

export default function GeneratePage() {
  return (
    <main className="flex flex-col items-center px-4 py-8 md:p-24">
      <div className="container max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          Generate Your Tractatus
        </h1>
        <TractatusGenerator />
      </div>
    </main>
  );
}
