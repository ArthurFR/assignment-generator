import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'
import MainNav from '@/components/MainNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skill assessments builder',
  description: 'Create technicall challenges/skill assessments for you positions using AI',
}

const bodyStyle = clsx(inter.className, 'bg-zinc-900 text-white')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={bodyStyle}>
        <MainNav />
        {children}
      </body>
    </html>
  )
}
