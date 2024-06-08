import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/utils/providers";
import { ThemeModeScript } from "flowbite-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MOI - Dashboard",
  description: "MOI dashboard",
};

export default function RootLayout({ children }) {
  return (
        <html lang="en">
        <head>
          <ThemeModeScript/>
        </head>
        <body className={inter.className}>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
  );
}
