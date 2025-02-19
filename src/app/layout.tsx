import { Andika } from "next/font/google";
import "@/shared/styles/globals.scss";
import "@/shared/styles/shared.scss";
import Navigation from "@/components/layout/navigation";
import Header from "@/components/layout/header";
import PlayerProvider from "@/components/providers/player-provider";
import PlayerBar from "@/components/layout/player-bar";
import PlayerBarMobile from "@/components/layout/player-bar-mobile";

const andika = Andika({
  variable: "--font-andika-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${andika.variable} antialiased`}>
        <div className="app-wrapper">
          <Navigation />
          <div className="app-content">
            <PlayerProvider>
              <Header />
              {children}
              <PlayerBar />
              <PlayerBarMobile />
            </PlayerProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
