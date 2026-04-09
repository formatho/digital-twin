import '../../src/styles/globals.css';
import { OSLayoutClient } from './OSLayoutClient';

export const metadata = {
  title: 'Digital Twin OS - Dashboard',
  description: 'AI-powered digital twin platform dashboard',
};

export default function OSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OSLayoutClient>{children}</OSLayoutClient>;
}
