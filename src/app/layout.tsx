import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { dark } from '@clerk/themes'
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SleepWise AI",
  description: "A modern AI platform for sleep improvement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
        baseTheme: dark,
      }}
    >
    <ConvexClerkProvider 
    >
      <html lang="en">
        
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10"></div>
          <Navbar />
          
          <main className="">
            
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ConvexClerkProvider>
    </ClerkProvider>
  
    
  );
}
