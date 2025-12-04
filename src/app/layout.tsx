import { Providers } from "./providers";
// import SessionWrapper from "@/components/SessionWrapper";
import "./global.css";
import NavBar from "@/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {/* <SessionWrapper> */}
          <NavBar />
          {children}
          {/* </SessionWrapper> */}
        </Providers>
      </body>
    </html>
  );
}
