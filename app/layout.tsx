import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CosmicAnalyticsProvider } from "cosmic-analytics";
import { AuthProvider } from 'cosmic-authentication';

const primaryFont = Geist({
  weight: ["400", "600", "700"],
  subsets: ["latin"]
});

// Change the title and description to your own.
export const metadata: Metadata = {
  title: "Divine Pathways - Premium Umrah Packages",
  description: "Experience the spiritual journey of a lifetime with Divine Pathways. Premium Umrah packages with luxury hotels, flights, and personalized service."
};

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html data-editor-id="app/layout.tsx:27:5" lang="en" className={primaryFont.className}>
      <body data-editor-id="app/layout.tsx:31:7" className="antialiased">
        <main data-editor-id="app/layout.tsx:32:9" className="min-h-screen">
          <CosmicAnalyticsProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </CosmicAnalyticsProvider>
        </main>
        {process.env.VISUAL_EDITOR_ACTIVE === 'true' &&
        <script data-editor-id="app/layout.tsx:50:9" src="/editor.js" async />
        }
      </body>
    </html>);

}