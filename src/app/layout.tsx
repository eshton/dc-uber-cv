import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEATHCROW | Ngoc Nguyen Quang",
  description: "Lead Escalation Officer @ SAP | IT Infrastructure & Security Specialist | Budapest, Hungary",
  keywords: ["IT Infrastructure", "Incident Management", "Network Engineering", "IT Security", "SAP"],
  authors: [{ name: "Ngoc Nguyen Quang" }],
  openGraph: {
    title: "DEATHCROW | Ngoc Nguyen Quang",
    description: "Lead Escalation Officer @ SAP | IT Infrastructure & Security",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
