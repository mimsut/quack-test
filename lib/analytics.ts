// Google Analytics 이벤트 추적을 위한 유틸리티 함수들

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
    dataLayer: any[]
  }
}

// GA 로드 확인 함수
export const isGALoaded = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function"
}

// 페이지뷰 추적
export const pageview = (url: string) => {
  if (isGALoaded()) {
    console.log("GA Pageview:", url)
    window.gtag("config", "G-LN3TR1CKGS", {
      page_path: url,
    })
  } else {
    console.warn("GA not loaded for pageview:", url)
  }
}

// 이벤트 추적
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (isGALoaded()) {
    const eventData = {
      event_category: category,
      event_label: label,
      value: value,
    }

    console.log("GA Event:", action, eventData)
    window.gtag("event", action, eventData)
  } else {
    console.warn("GA not loaded for event:", action, category, label)
  }
}

// 테스트 관련 이벤트들
export const trackTestStart = (username?: string) => {
  const timestamp = new Date().toISOString()
  event({
    action: "test_start",
    category: "engagement",
    label: `${username || "anonymous"}_${timestamp}`,
    value: 1,
  })
}

export const trackTestComplete = (duckType: string, username?: string) => {
  const timestamp = new Date().toISOString()
  event({
    action: "test_complete",
    category: "engagement",
    label: `${duckType}_${username || "anonymous"}_${timestamp}`,
    value: 1,
  })

  // 추가로 결과별 이벤트도 전송
  event({
    action: "duck_result",
    category: "results",
    label: duckType,
    value: 1,
  })
}

export const trackImageSave = (duckType: string) => {
  event({
    action: "image_save",
    category: "engagement",
    label: duckType,
    value: 1,
  })
}

export const trackShare = (duckType: string, method: string) => {
  event({
    action: "share",
    category: "engagement",
    label: `${duckType}_${method}`,
    value: 1,
  })
}

export const trackViewAllTypes = () => {
  event({
    action: "view_all_types",
    category: "engagement",
    label: "all_types_viewed",
    value: 1,
  })
}

export const trackRestart = () => {
  event({
    action: "test_restart",
    category: "engagement",
    label: "restart_clicked",
    value: 1,
  })
}

// 디버그용 함수
export const sendTestEvent = () => {
  const timestamp = new Date().toISOString()
  event({
    action: "debug_test",
    category: "debug",
    label: `manual_test_${timestamp}`,
    value: 1,
  })
}

// GA 상태 확인 함수
export const getGAStatus = () => {
  if (typeof window === "undefined") {
    return "서버 사이드"
  }

  const hasGtag = typeof window.gtag === "function"
  const hasDataLayer = Array.isArray(window.dataLayer)

  return {
    gtag: hasGtag ? "✅ 로드됨" : "❌ 로드 안됨",
    dataLayer: hasDataLayer ? `✅ 로드됨 (${window.dataLayer.length}개 항목)` : "❌ 로드 안됨",
    overall: hasGtag && hasDataLayer ? "정상" : "문제 있음",
  }
}
