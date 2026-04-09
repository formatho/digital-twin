import Link from 'next/link';
import { AboutPageClient } from './AboutPageClient';

export const metadata = {
  title: 'About - Digital Twin OS',
  description: 'Learn about Digital Twin OS and how AI-powered digital twins can transform your decision-making.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
