import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "내 안의 꽥 - 오리 성격 테스트",
  description: "꽥꽥이로 알아보는 멘탈 방어 유형",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Google Analytics - Next.js Script 컴포넌트 사용 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-LN3TR1CKGS" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LN3TR1CKGS');
            
            // 로딩 완료 확인
            console.log('GA4 Script 로드 완료');
            console.log('gtag function:', typeof window.gtag);
            console.log('dataLayer:', window.dataLayer);
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
