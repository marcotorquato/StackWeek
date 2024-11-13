import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Raleway } from 'next/font/google'
import ClientSidebar from './_components/client-sidebar'
import { SidebarProvider } from './_components/ui/sidebar'
import './globals.css'

// Importando a fonte Raleway
const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
})

export const metadata = {
  title: 'Finance AI',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased dark`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <SidebarProvider>
            <ClientSidebar>{children}</ClientSidebar>
          </SidebarProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
