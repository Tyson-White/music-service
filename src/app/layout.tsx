import { Andika } from "next/font/google";
import "@/shared/styles/globals.scss";
import "@/shared/styles/shared.scss";
import Navigation from "@/components/navigation";
import Header from "@/components/header";
import PlayerProvider from "@/components/provider/player-provider";
import PlayerBar from "@/components/layout/player-bar";

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
            </PlayerProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
