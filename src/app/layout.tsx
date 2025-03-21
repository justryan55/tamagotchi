import type { Metadata } from "next";
import "../styles/globals.css";
import { StrictMode } from "react";
import { StatsProvider } from "@/providers/StatsProvider";
import { UserProvider } from "@/providers/UserProvider";

export const metadata: Metadata = {
  title: "Tamagotchi",
  description: "Tamagotchi application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <StatsProvider>
          <body>
            <StrictMode>{children}</StrictMode>
          </body>
        </StatsProvider>
      </UserProvider>
    </html>
  );
}
