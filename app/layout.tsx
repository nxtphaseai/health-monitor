import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Debug information logged at app startup
  console.log('=== Health Monitor App Debug Info ===');
  console.log('Environment Variables:', {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
  });
  
  console.log('App Information:', {
    baseUrl:   'https://healthmonitor.icywater-62a3a3af.westeurope.azurecontainerapps.io',
    version: process.env.npm_package_version || '1.0.0',
    nextVersion: process.versions?.node,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch
  });

  console.log('App Paths:', {
    appDir: process.cwd(),
    rootDir: process.env.PWD,
  });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
