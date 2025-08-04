"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
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
    return (
      <div className="fixed bottom-4 right-4 z-50">
        
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">GA4 디버거 v2</h3>
        <Button onClick={() => setIsVisible(false)} size="sm" variant="ghost" className="p-1 h-6 w-6">
          ✕
        </Button>
      </div>

      <div className="text-xs space-y-1 mb-3">
        <div>측정 ID: G-LN3TR1CKGS</div>
        <div>체크 시도: {loadingAttempts}회</div>
        {gaStatus && (
          <>
            <div>gtag: {gaStatus.gtag}</div>
            <div>DataLayer: {gaStatus.dataLayer}</div>
            <div className={`font-bold ${gaStatus.overall === "정상" ? "text-green-600" : "text-red-600"}`}>
              상태: {gaStatus.overall}
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <Button onClick={handleTestEvent} size="sm" className="w-full text-xs">
          테스트 이벤트 전송
        </Button>

        <Button onClick={handleCheckDataLayer} size="sm" variant="outline" className="w-full text-xs bg-transparent">
          디버그 정보 출력
        </Button>

        <Button onClick={handleForceReload} size="sm" variant="outline" className="w-full text-xs bg-red-50">
          페이지 새로고침
        </Button>

        <Button onClick={handleCheckRealtime} size="sm" variant="outline" className="w-full text-xs bg-transparent">
          실시간 보고서 확인
        </Button>
      </div>

      {testResults.length > 0 && (
        <div className="text-xs bg-gray-100 p-2 rounded mt-2 max-h-20 overflow-y-auto">
          {testResults.slice(-3).map((result, index) => (
            <div key={index} className="truncate">
              {result}
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500 mt-2">
        Next.js Script 컴포넌트 사용
        <br />
        로딩 안되면 새로고침 시도
      </div>
    </div>
  )
}
