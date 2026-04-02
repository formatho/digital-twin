import '../../src/styles/globals.css';

export const metadata = {
  title: 'Digital Twin OS - AI-Powered Decision Intelligence',
  description: 'Transform strategic decisions with AI-powered digital twins. 5 Council Twins for strategy, 10 Skill Twins for execution.',
  siteUrl: 'https://www.digital-twin.formatho.com',
  openGraph: {
    title: 'Digital Twin OS',
    description: 'AI-powered digital twin platform for strategic decision-making',
    url: 'https://www.digital-twin.formatho.com',
    siteName: 'Digital Twin OS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Twin OS',
    description: 'AI-powered digital twin platform for strategic decision-making',
  },
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="website-layout">
      {children}
    </div>
  );
}
