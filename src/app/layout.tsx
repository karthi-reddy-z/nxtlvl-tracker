import type { Metadata } from "next";
import { Inter, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "NxtLvl Tracker | Level up your habits",
    description: "Organize your life with elegance",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${dmSans.variable} ${playfair.variable} antialiased font-sans`}
            >
                {children}
            </body>
        </html>
    );
}
