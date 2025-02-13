import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fernando Pestillo - Programador e Desenvolvedor',
  description:
    'Fernando Pestillo é um experiente programador e desenvolvedor, criando soluções inovadoras em desenvolvimento web e mobile. Descubra projetos e tecnologias modernas para transformar sua ideia em realidade.',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'Fernando Pestillo',
    'programador',
    'desenvolvedor',
    'programação',
    'desenvolvimento web',
    'tecnologia',
    'Next.js',
    'React',
  ],
  authors: [{ name: 'Fernando Pestillo', url: 'https://fernandopestillo.com' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  )
}
