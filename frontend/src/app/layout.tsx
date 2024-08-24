import type { Metadata } from "next";

import "./globals.css";

import { roboto } from "@/fonts/font";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "EtherScan Clone Dapp - Ethereum(ETH) Blockchain Explorer",
  description:
    "Etherscan is a Block Explorer and Analytics Platform for Ethereum, a decentralized smart contracts platform.",
  keywords: "web3, dapp, block, explorer, data",
  openGraph: {
    url: "/",
    title: "EtherScan Clone Dapp - Ethereum(ETH) Blockchain Explorer",
    description:
      "Etherscan is a Block Explorer and Analytics Platform for Ethereum, a decentralized smart contracts platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // TODO image to be added later
    title: "EtherScan Clone Dapp - Ethereum(ETH) Blockchain Explorer",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
