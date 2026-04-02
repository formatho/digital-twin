import '../src/styles/globals.css';

export const metadata = {
  title: 'Digital Twin OS',
  description: 'AI-powered digital twin platform for strategic decision-making',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
