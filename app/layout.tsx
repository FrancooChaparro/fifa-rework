import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from " @/components/Nav/Nav";
import localFont from "next/font/local";
import MyProvider from "../context/ListProvider";
import { Post } from " @/components/Post/Post";
import { GameDetails } from " @/components/GameDetails/GameDetails";
import ContactMeComponent from " @/components/Footer/Footer";
import AuthProvider from " @/context/SessionProvider";
import { AddTeam } from " @/components/AddTeam/AddTeam";

const inter = Inter({ subsets: ["latin"] });

const geistLight = localFont({
  src: "../fonts/Geist-Light.otf",
  variable: "--font-geist-light",
});

const geistBold = localFont({
  src: "../fonts/Geist-SemiBold.otf",
  variable: "--font-geist-bold",
});

const geistRegular = localFont({
  src: "../fonts/Geist-Regular.otf",
  variable: "--font-geist-regular",
});

export const metadata: Metadata = {
  title: "FIFA",
  description: "Copa mundial de clubes",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistLight.variable} ${geistBold.variable} ${geistRegular.variable} antialiased`}
      >
         <AuthProvider>
        <MyProvider>
          {/* <Nav /> */}
          <div className="relative">
            {/* <GameDetails /> */}
            {/* <AddTeam /> */}
            {/* <Post /> */}
          </div>
          {children}
          {/* <ContactMeComponent /> */}
        </MyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
