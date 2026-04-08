import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata = {
  title: "GDSC ANU",
  description: "Google Developer Student Club ANU Event Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />

        </ThemeProvider>
      </body>
    </html>
  );
}