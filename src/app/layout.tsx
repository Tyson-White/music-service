"use client";

import { Andika } from "next/font/google";
import "@/shared/styles/globals.scss";
import "@/shared/styles/shared.scss";
import Navigation from "@/components/layout/navigation";
import Header from "@/components/layout/header";
import PlayerProvider from "@/components/providers/player-provider";
import PlayerBar from "@/components/layout/player-bar";
import PlayerBarMobile from "@/components/layout/player-bar-mobile";
import { useEffect } from "react";
import axiosInstance from "@/shared/services/api/axios.config";
import queries from "@/shared/services/api/queries";
import usePlaylistsStore from "@/shared/store/playlists-store";
import { EnumPlaylists } from "@/shared/store/playlists-store/playlists-store.types";

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
  const { setPlaylistData } = usePlaylistsStore();

  useEffect(() => {
    const requestPlaylist = async () => {
      const { data } = await axiosInstance.get(queries.getTracks);

      setPlaylistData(data, EnumPlaylists.main);
    };

    requestPlaylist();
  }, []);

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
              {/* <PlayerBarMobile /> */}
            </PlayerProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
