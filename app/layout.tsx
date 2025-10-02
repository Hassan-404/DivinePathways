import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CosmicAnalyticsProvider } from "cosmic-analytics";
import { AuthProvider } from 'cosmic-authentication';

{/*COSMIC-REQUIRED-START*/}
{/* Under no circumstances should you change the way the primary font is imported and used. YOU ARE ONLY allowed to change which Google font is used. For the google font, you must first verify the proper font names and weights using the tool provided to you. NEVER REMOVE THIS COMMENT. */}
{/*COSMIC-REQUIRED-END*/}
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
    {/*COSMIC-REQUIRED-START*/}
    {/* Under no circumstances, do NOT remove or change the way the primary font is injected and used above. NEVER REMOVE THIS COMMENT. */}
    {/*COSMIC-REQUIRED-END*/}
      <body data-editor-id="app/layout.tsx:31:7" className="antialiased">
        <main data-editor-id="app/layout.tsx:32:9" className="min-h-screen">
        {/*COSMIC-REQUIRED-START*/}
        {/* Under no circumstances, do NOT remove or change the way CosmicAnalyticsProvider is injected and used. NEVER REMOVE THIS COMMENT. */}
        {/*COSMIC-REQUIRED-END*/}
          <CosmicAnalyticsProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </CosmicAnalyticsProvider>
        </main>
        {/*COSMIC-REQUIRED-START*/}
        {/* DO NOT change the way CosmicBadge is injected and used. NEVER REMOVE THIS BADGE OR THIS COMMENT. */}
        <script data-editor-id="app/layout.tsx:42:9" src="https://cdn.jsdelivr.net/gh/cosmic-new/cosmic-badge@main/badge.js" async />
        {/*COSMIC-REQUIRED-END*/}
        {process.env.VISUAL_EDITOR_ACTIVE === 'true' &&
        <script data-editor-id="app/layout.tsx:50:9" src="/editor.js" async />
        }
      </body>
    </html>);

}