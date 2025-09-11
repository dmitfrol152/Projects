import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: "Tik Tak Toe Online",
  description: "Online multiplayer tik tak toe game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={inter.className}>
      <body>
        {children}
        <div id="modal"></div>
      </body>
    </html>
  );
}
