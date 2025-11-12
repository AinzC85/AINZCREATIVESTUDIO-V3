export const metadata = {
  title: "Ainz FX",
  description: "We create effects that transform reality",
};
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#fafafa]">{children}</body>
    </html>
  );
}
