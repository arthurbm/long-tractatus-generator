import "~/styles/globals.css";
import { Toaster } from "~/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tractatus Generator",
  description:
    "Transform your ideas into a structured philosophical treatise, inspired by Wittgenstein's Tractatus Logico-Philosophicus.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <div className="min-h-screen bg-background">{children}</div>
        <Toaster richColors />
      </body>
    </html>
  );
}
