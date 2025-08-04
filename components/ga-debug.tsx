"use client"

import { useEffect, useState } from "react"
import { getGAStatus, sendTestEvent } from "@/lib/analytics"

export function GADebugger() {
  const [gaStatus, setGAStatus] = useState<any>(null)
  const [testResults, setTestResults] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const [loadingAttempts, setLoadingAttempts] = useState(0)

  useEffect(() => {
    // GA 상태를 더 자주 확인
    const checkGA = () => {
      const status = getGAStatus()
      setGAStatus(status)
      setLoadingAttempts((prev) => prev + 1)

      // 추가 디버그 정보
      if (typeof window !== "undefined") {
        console.log("GA 체크 시도:", loadingAttempts + 1)
        console.log("window.gtag 존재:", typeof window.gtag)
        console.log("window.dataLayer 존재:", Array.isArray(window.dataLayer))
        console.log("document.readyState:", document.readyState)
      }
    }

    // 즉시 확인
    checkGA()

    // 1초마다 상태 확인 (처음 15초간)
    const interval = setInterval(checkGA, 1000)
    setTimeout(() => clearInterval(interval), 15000)

    return () => clearInterval(interval)
  }, [])

  const handleTestEvent = () => {
    try {
      sendTestEvent()
      const timestamp = new Date().toLocaleTimeString()
      setTestResults((prev) => [...prev, `${timestamp}: 테스트 이벤트 전송 완료`])
    } catch (error) {
      const timestamp = new Date().toLocaleTimeString()
      setTestResults((prev) => [...prev, `${timestamp}: 전송 실패 - ${error}`])
    }
  }

  const handleForceReload = () => {
    window.location.reload()
  }

  const handleCheckRealtime = () => {
    window.open("https://analytics.google.com/analytics/web/#/p/realtime/overview", "_blank")
  }

  const handleCheckDataLayer = () => {
    if (typeof window !== "undefined") {
      console.log("=== GA 디버그 정보 ===")
      console.log("gtag function:", window.gtag)
      console.log("dataLayer:", window.dataLayer)
      console.log("document scripts:", document.querySelectorAll('script[src*="gtag"]'))
      console.log("===================")

      const timestamp = new Date().toLocaleTimeString()
      setTestResults((prev) => [...prev, `${timestamp}: 디버그 정보 콘솔 출력`])
    }
  }

  if (!isVisible) {
    return null
  }

  return null // UI에서 완전히 제거, 백그라운드에서만 동작
}
