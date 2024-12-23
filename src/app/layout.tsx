import "~/styles/globals.css";
import { Toaster } from "~/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
