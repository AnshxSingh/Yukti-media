import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yukti Media — Video Editing, 3D Web & Digital Agency',
  description: 'Yukti Media — High-impact video editing, 3D interactive web applications, and viral social media marketing.',
  icons: {
    icon: '/favicon/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#231e10] text-white font-inter antialiased selection:bg-[#fac638] selection:text-[#231e10]">
        {children}
      </body>
    </html>
  );
}
