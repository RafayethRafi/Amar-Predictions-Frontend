import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/Provider/AuthProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/Provider/ThemeProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Amar Predictions",
  description: "Baler Bagh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}