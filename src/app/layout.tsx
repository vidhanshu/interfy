import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/frontend/apollo-provider";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import NextSessionProvider from "@/components/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interfy - Secure Digital Identity Management",
  description:
    "Your one stop solution for interview preparations. Built with Next.js, GraphQL, and NextAuth for the best user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloWrapper>
          <NextSessionProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </NextSessionProvider>
        </ApolloWrapper>
        <Toaster position="bottom-right" duration={3000} richColors />
      </body>
    </html>
  );
}
