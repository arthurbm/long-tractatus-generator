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
      <body className="bg-background font-sans antialiased">
        <div className="min-h-screen">
          <main className="flex-1">{children}</main>
        </div>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
