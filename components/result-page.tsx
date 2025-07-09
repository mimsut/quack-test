"use client"
import { Button } from "@/components/ui/button"
import { ShareIcon, Eye } from 'lucide-react'
import { useRef, useState } from "react"
import html2canvas from "html2canvas"
import * as gtag from "@/lib/gtag"

interface ResultPageProps {
  duckType: {
    name: string
    tags: string[]
    description: string
    strengths: string[]
    weaknesses: string[]
    compatible: string[]
    incompatible: string[]
  }
  username?: string
  onRestart: () => void
  onViewAllTypes: () => void
}

const duckImages: { [key: string]: string } = {
  가창오리: "/images/ducks/가창오리.png",
  고방오리: "/images/ducks/고방오리.png",
  발구지: "/images/ducks/발구지.png",
  비오리: "/images/ducks/비오리.png",
  바다비오리: "/images/ducks/바다비오리.png",
  호사비오리: "/images/ducks/호사비오리.png",
  원앙: "/images/ducks/원앙.png",
  쇠오리: "/images/ducks/쇠오리.png",
  청둥오리: "/images/ducks/청둥오리.png",
  청머리오리: "/images/ducks/청머리오리.png",
  홍머리오리: "/images/ducks/홍머리오리.png",
  알락오리: "/images/ducks/알락오리.png",
  점무늬오리: "/images/ducks/점무늬오리.png",
  혹부리오리: "/images/ducks/혹부리오리.png",
  황오리: "/images/ducks/황오리.png",
  흰등오리: "/images/ducks/흰등오리.png",
  흰뺨검둥오리: "/images/ducks/흰뺨오리.png",
  흰뺨오리: "/images/ducks/흰뺨오리.png",
  흰죽지: "/images/ducks/흰죽지.png",
  넓적부리: "/images/ducks/넓적부리.png",
}

const duckTypes = {
  가창오리: { name: "가창오리", tags: ["차분함", "관찰자"] },
  고방오리: { name: "고방오리", tags: ["논리적", "계획형"] },
  발구지: { name: "발구지", tags: ["자유", "즉흥형"] },
  비오리: { name: "비오리", tags: ["감성적", "섬세함"] },
  바다비오리: { name: "바다비오리", tags: ["논리", "전략가"] },
  호사비오리: { name: "호사비오리", tags: ["낭만", "열정파"] },
  원앙: { name: "원앙", tags: ["사교적", "중재자"] },
  쇠오리: { name: "쇠오리", tags: ["열정적", "리더형"] },
  청둥오리: { name: "청둥오리", tags: ["유연함", "적응력"] },
  청머리오리: { name: "청머리오리", tags: ["창의적", "아이디어"] },
  홍머리오리: { name: "홍머리오리", tags: ["직설적", "솔직함"] },
  알락오리: { name: "알락오리", tags: ["분석적", "세심함"] },
  점무늬오리: { name: "점무늬오리", tags: ["온화함", "협력형"] },
  혹부리오리: { name: "혹부리오리", tags: ["리더십", "결단력"] },
  황오리: { name: "황오리", tags: ["낙천", "긍정형"] },
  흰등오리: { name: "흰등오리", tags: ["중립", "안정형"] },
  흰뺨검둥오리: { name: "흰뺨검둥오리", tags: ["공감", "친절형"] },
  흰뺨오리: { name: "흰뺨오리", tags: ["창의", "아이디어형"] },
  흰죽지: { name: "흰죽지", tags: ["독립", "자기주도형"] },
  넓적부리: { name: "넓적부리", tags: ["여유", "평화형"] },
}

const duckSummaries = {
  가창오리: "조용히 관찰하며 신중하게 행동하는 깊이 있는 사색가",
  고방오리: "체계적인 계획으로 모든 일을 완벽하게 처리하는 전략가",
  발구지: "자유롭고 즉흥적인 에너지로 새로운 모험을 즐기는 탐험가",
  비오리: "섬세한 감성으로 타인의 마음을 깊이 이해하는 공감자",
  바다비오리: "논리적 사고로 문제를 분석하고 해결하는 냉철한 전략가",
  호사비오리: "낭만적 감성과 열정으로 삶을 예술처럼 살아가는 몽상가",
  원앙: "사교적 매력으로 사람들을 하나로 묶어주는 천성의 중재자",
  쇠오리: "강한 추진력과 리더십으로 목표를 달성하는 실행가",
  청둥오리: "유연한 적응력으로 어떤 상황에서도 자연스럽게 어울리는 조화자",
  청머리오리: "끝없는 창의력으로 새로운 아이디어를 만들어내는 발명가",
  홍머리오리: "솔직하고 직설적인 소통으로 진실을 추구하는 정직한 친구",
  알락오리: "꼼꼼한 분석력으로 완벽을 추구하는 디테일의 달인",
  점무늬오리: "온화한 성품으로 평화와 조화를 만들어가는 중재자",
  혹부리오리: "강한 결단력과 카리스마로 팀을 이끄는 천상의 리더",
  황오리: "밝은 에너지와 긍정적 마인드로 주변을 환하게 만드는 비타민",
  흰등오리: "차분한 안정감으로 든든한 버팀목이 되어주는 신뢰의 상징",
  흰뺨검둥오리: "따뜻한 공감과 친절함으로 모든 이를 포용하는 천사",
  흰뺨오리: "무한한 상상력과 창의성으로 새로운 세계를 그려내는 아티스트",
  흰죽지: "독립적이고 자기주도적으로 자신만의 길을 개척하는 개척자",
  넓적부리: "여유로운 마음으로 평화롭게 살아가는 자연주의자",
}

export function ResultPage({ duckType, username, onRestart, onViewAllTypes }: ResultPageProps) {
  const resultCardRef = useRef<HTMLDivElement>(null)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  const handleShare = async () => {
    // Track share action
    gtag.event({
      action: "share_result",
      category: "social",
      label: duckType.name,
    })

    const resultText = `🦆 나는 ${duckType.name}!\n\n${duckType.tags.map((tag) => `#${tag}`).join(" ")}\n\n${username || "나"}의 꽥 테스트 결과를 확인해보세요!`
    const testUrl = window.location.origin

    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${duckType.name}!`,
          text: resultText,
          url: testUrl,
        })
      } catch (error) {
        console.error("공유 실패:", error)
      }
    } else {
      // 클립보드에 복사
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${resultText}\n\n테스트 해보기: ${testUrl}`)
        alert("결과가 클립보드에 복사되었습니다!")
      }
    }
  }

  const preloadImages = async (): Promise<void> => {
    const imageUrls = [
      duckImages[duckType.name],
      ...duckType.compatible.slice(0, 2).map((type) => duckImages[type]),
      ...duckType.incompatible.slice(0, 2).map((type) => duckImages[type]),
    ].filter(Boolean)

    const imagePromises = imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => resolve()
        img.onerror = () => {
          console.warn(`Failed to preload image: ${url}`)
          resolve() // Continue even if some images fail
        }
        img.src = url
      })
    })

    await Promise.all(imagePromises)
  }

  const handleSaveImage = async () => {
    if (isGeneratingImage) return

    setIsGeneratingImage(true)

    try {
      // Track image save action
      gtag.event({
        action: "save_image",
        category: "engagement",
        label: duckType.name,
      })

      const element = resultCardRef.current
      if (!element) {
        throw new Error("결과 카드 요소를 찾을 수 없습니다.")
      }

      // Preload all images first
      await preloadImages()

      // Wait for any pending renders and font loading
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store original styles
      const originalStyle = element.style.cssText
      const originalTransform = element.style.transform
      const originalPosition = element.style.position

      // Apply enhanced styles for better capture
      element.style.transform = "none"
      element.style.position = "relative"
      element.style.zIndex = "9999"
      element.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      element.style.minHeight = "auto"
      element.style.width = "400px"
      element.style.maxWidth = "400px"
      element.style.margin = "0 auto"

      // Force layout recalculation
      element.offsetHeight

      // Enhanced canvas options for better quality and compatibility
      const canvas = await html2canvas(element, {
        backgroundColor: "#749665",
        scale: window.devicePixelRatio || 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: 400,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 400,
        windowHeight: element.scrollHeight,
        foreignObjectRendering: true,
        removeContainer: true,
        onclone: (clonedDoc, clonedElement) => {
          // Enhanced font loading and styling for cloned document
          const style = clonedDoc.createElement("style")
          style.textContent = `
          @font-face {
            font-family: "MoneyGraphy";
            src: url("${window.location.origin}/fonts/Moneygraphy-Rounded.ttf") format("truetype");
            font-display: block;
          }
          @font-face {
            font-family: "TmoneyRoundWind";
            src: url("${window.location.origin}/fonts/TmoneyRoundWindRegular.ttf") format("truetype");
            font-display: block;
          }
          
          * {
            font-family: "MoneyGraphy", "TmoneyRoundWind", -apple-system, BlinkMacSystemFont, system-ui, sans-serif !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            box-sizing: border-box !important;
          }
          
          /* Enhanced centering for all circular elements */
          .w-10.h-10, .w-12.h-12, .w-16.h-16 {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            position: relative !important;
          }
          
          .w-10.h-10 span, .w-12.h-12 span, .w-16.h-16 span {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            line-height: 1 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            text-align: center !important;
            font-weight: bold !important;
          }
          
          /* Enhanced tag styling */
          .rounded-full.inline-flex {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }
          
          .rounded-full.inline-flex span {
            position: static !important;
            transform: none !important;
            line-height: 1.2 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          /* Image centering and sizing */
          img {
            display: block !important;
            margin: 0 auto !important;
            max-width: 100% !important;
            height: auto !important;
          }
          
          /* Container centering */
          .text-center {
            text-align: center !important;
          }
          
          .flex.justify-center {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
          
          .flex.items-center {
            display: flex !important;
            align-items: center !important;
          }
          
          /* Background and layout fixes */
          .bg-white\\/80 {
            background-color: rgba(255, 255, 255, 0.95) !important;
          }
          
          .backdrop-blur-sm {
            backdrop-filter: none !important;
          }
          
          /* Ensure proper spacing */
          .mb-6 { margin-bottom: 1.5rem !important; }
          .mb-4 { margin-bottom: 1rem !important; }
          .mb-3 { margin-bottom: 0.75rem !important; }
          .mb-2 { margin-bottom: 0.5rem !important; }
          .mb-10 { margin-bottom: 2.5rem !important; }
          
          /* Fix flex layouts */
          .flex.flex-col {
            display: flex !important;
            flex-direction: column !important;
          }
          
          .flex.gap-2 {
            display: flex !important;
            gap: 0.5rem !important;
          }
          
          .flex.gap-4 {
            display: flex !important;
            gap: 1rem !important;
          }
          
          /* Ensure text wrapping */
          .flex-wrap {
            flex-wrap: wrap !important;
          }
          
          /* Duck image specific styling */
          .duck-main-image {
            transform: scale(1.2) !important;
            transform-origin: center center !important;
          }
        `
          clonedDoc.head.appendChild(style)

          // Fix all image sources in cloned document
          const images = clonedDoc.querySelectorAll("img")
          images.forEach((img) => {
            if (img.src.startsWith("/")) {
              img.src = window.location.origin + img.src
            }
            img.crossOrigin = "anonymous"
          
            // Ensure duck image has proper scaling
            if (img.alt && img.alt.includes("오리")) {
              img.style.transform = "scale(1.2)"
              img.style.transformOrigin = "center center"
            }
          })

          // Force all text elements to be properly centered
          const textElements = clonedDoc.querySelectorAll(".w-10, .w-12, .w-16")
          textElements.forEach((el) => {
            const span = el.querySelector("span")
            if (span) {
              span.style.position = "absolute"
              span.style.top = "50%"
              span.style.left = "50%"
              span.style.transform = "translate(-50%, -50%)"
              span.style.display = "flex"
              span.style.alignItems = "center"
              span.style.justifyContent = "center"
              span.style.width = "100%"
              span.style.height = "100%"
              span.style.textAlign = "center"
              span.style.lineHeight = "1"
            }
          })

          // Ensure all flex containers are properly centered
          const flexContainers = clonedDoc.querySelectorAll(".flex")
          flexContainers.forEach((el) => {
            if (el.classList.contains("justify-center")) {
              el.style.display = "flex"
              el.style.justifyContent = "center"
              el.style.alignItems = "center"
            }
          })
        },
      })

      // Restore original styles
      element.style.cssText = originalStyle
      element.style.transform = originalTransform
      element.style.position = originalPosition

      // Validate canvas
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error("캔버스 생성에 실패했습니다.")
      }

      // Create a new canvas with proper dimensions and background
      const finalCanvas = document.createElement("canvas")
      const finalCtx = finalCanvas.getContext("2d")
    
      if (!finalCtx) {
        throw new Error("최종 캔버스 컨텍스트를 생성할 수 없습니다.")
      }

      // Set final canvas dimensions with padding
      const padding = 40
      finalCanvas.width = canvas.width + (padding * 2)
      finalCanvas.height = canvas.height + (padding * 2)

      // Draw background
      const gradient = finalCtx.createLinearGradient(0, 0, 0, finalCanvas.height)
      gradient.addColorStop(0, "#749665")
      gradient.addColorStop(1, "#5a7a4d")
      finalCtx.fillStyle = gradient
      finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)

      // Draw the captured content centered
      finalCtx.drawImage(canvas, padding, padding)

      // Convert to blob with high quality
      const blob = await new Promise<Blob | null>((resolve) => {
        finalCanvas.toBlob(resolve, "image/png", 1.0)
      })

      if (!blob) {
        throw new Error("이미지 변환에 실패했습니다.")
      }

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = `${duckType.name}_결과_${new Date().getTime()}.png`
      link.href = url
      link.style.display = "none"

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 1000)

      // Show success message
      alert("이미지가 성공적으로 저장되었습니다!")
    } catch (error) {
      console.error("이미지 저장 실패:", error)

      // Track error
      gtag.event({
        action: "save_image_error",
        category: "error",
        label: error instanceof Error ? error.message : "Unknown error",
      })

      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
      alert(`이미지 저장에 실패했습니다: ${errorMessage}\n\n다시 시도해주세요.`)
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const handlePreorderClick = () => {
    // Track preorder button click
    gtag.event({
      action: "click_preorder_result",
      category: "conversion",
      label: "preorder_from_result",
    })
  }

  return (
    <div
      className="min-h-screen px-4 py-6 overflow-y-auto"
      style={{
        backgroundColor: "#749665",
        backgroundImage: "url('/images/instagram-story-11.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <img src="/images/symple-logo.png" alt="SYMPLE" className="h-4 mx-auto opacity-60" />
        </div>

        {/* Main Card */}
        <div
          ref={resultCardRef}
          data-result-card
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg relative mx-0 image-capture-card"
          style={{
            minWidth: "320px",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          {/* Title */}
          <div className="text-center my-0 mb-[50px]">
            <h2 className="text-lg font-bold text-gray-700 mb-2">{username || "당신"}의 꽥은</h2>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">{duckType.name}</h1>
            <div className="flex justify-center gap-2 mb-4">
              {duckType.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-black inline-flex items-center justify-center"
                  style={{ lineHeight: "1.2" }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Duck Character - Full width prominent display with dynamic scaling */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4 w-full flex justify-center">
              <div
                className="flex items-center justify-center my-10 mb-[60px] w-6/12 h-fit"
                style={{ transform: "scale(2)" }}
              >
                <img
                  src={duckImages[duckType.name] || "/placeholder.svg?height=200&width=200&text=Duck"}
                  alt={duckType.name}
                  className="w-48 h-48 object-contain transition-transform duration-300 hover:scale-110"
                  style={{
                    transform: "scale(1.2)",
                    transformOrigin: "center center",
                  }}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.warn("Failed to load duck image in UI:", duckImages[duckType.name])
                    e.currentTarget.src = "/placeholder.svg?height=200&width=200&text=🦆"
                  }}
                />
              </div>
            </div>

            {/* Personality circles */}
            <div className="flex justify-center gap-2">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white text-lg font-bold leading-none flex items-center justify-center h-full w-full">
                  성
                </span>
              </div>
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white text-lg font-bold leading-none flex items-center justify-center h-full w-full">
                  격
                </span>
              </div>
            </div>
          </div>

          {/* Description with highlighted keywords */}
          <div className="text-center text-gray-700 text-sm leading-relaxed mb-10">
            {duckType.description
              .split(" ")
              .map((word, index) => {
                // Check if word contains any of the personality keywords
                const isKeyword =
                  duckType.strengths.some((strength) => word.includes(strength)) ||
                  duckType.weaknesses.some((weakness) => word.includes(weakness)) ||
                  duckType.tags.some((tag) => word.includes(tag))

                return isKeyword ? (
                  <span key={index} className="bg-green-200/50 px-1 rounded">
                    {word}
                  </span>
                ) : (
                  word
                )
              })
              .reduce((prev, curr, index) => [prev, " ", curr])}
          </div>

          {/* My charm section - Two line layout with fixed text alignment */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  나
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  의
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  매
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  력
                </span>
              </div>
            </div>
            {/* Two-line layout for keywords */}
            <div className="flex flex-col items-center gap-2 my-0 mb-10">
              {/* First line - 3 keywords */}
              <div className="flex justify-center gap-2">
                {duckType.strengths.slice(0, 3).map((strength, index) => (
                  <span
                    key={index}
                    className="bg-blue-400/60 text-black px-3 py-1 rounded-full text-sm font-medium border-black border inline-flex items-center justify-center"
                    style={{ lineHeight: "1.2" }}
                  >
                    {strength}
                  </span>
                ))}
              </div>
              {/* Second line - 2 keywords */}
              <div className="flex justify-center gap-2">
                {duckType.strengths.slice(3, 5).map((strength, index) => (
                  <span
                    key={index + 3}
                    className="bg-blue-400/60 text-black px-3 py-1 rounded-full text-sm font-medium border-black border inline-flex items-center justify-center"
                    style={{ lineHeight: "1.2" }}
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Caution section with fixed text alignment */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white text-base font-black leading-none flex items-center justify-center h-full w-full">
                  조
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  심
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  할
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  것
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {duckType.weaknesses.slice(0, 5).map((weakness, index) => (
                <span
                  key={index}
                  className="bg-red-400/60 text-black px-3 py-1 rounded-full text-sm font-medium border-black border inline-flex items-center justify-center"
                  style={{ lineHeight: "1.2" }}
                >
                  {weakness}
                </span>
              ))}
            </div>
          </div>

          {/* Compatible section with fixed text alignment */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  찰
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  떡
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  궁
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  합
                </span>
              </div>
            </div>
            <div className="flex justify-center items-start gap-4 mb-10">
              {duckType.compatible.slice(0, 2).map((compatibleType, index) => (
                <div key={index} className="text-center flex flex-col items-center max-w-[140px]">
                  <div className="bg-blue-200/50 rounded-full border-blue-400 flex items-center justify-center mb-2 border-2 size-auto w-16 h-16">
                    <img
                      src={duckImages[compatibleType] || "/placeholder.svg?height=48&width=48&text=🦆"}
                      alt={compatibleType}
                      className="w-12 h-12 object-contain"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=48&width=48&text=🦆"
                      }}
                    />
                  </div>
                  <div className="text-sm font-bold text-gray-800 mb-1">{compatibleType}</div>
                  <div className="flex gap-1 justify-center mb-2 flex-wrap">
                    {duckTypes[compatibleType as keyof typeof duckTypes]?.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs border border-black inline-flex items-center justify-center"
                        style={{ lineHeight: "1.2" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center leading-tight">
                    {duckSummaries[compatibleType as keyof typeof duckSummaries]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incompatible section with fixed text alignment */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  안
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  맞
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  아
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base leading-none flex items-center justify-center h-full w-full">
                  요
                </span>
              </div>
            </div>
            <div className="flex justify-center items-start gap-4 mb-10">
              {duckType.incompatible.slice(0, 2).map((incompatibleType, index) => (
                <div key={index} className="text-center flex flex-col items-center max-w-[140px]">
                  <div className="w-16 h-16 bg-red-200/50 rounded-full border-red-400 flex items-center justify-center mb-2 border-2">
                    <img
                      src={duckImages[incompatibleType] || "/placeholder.svg?height=48&width=48&text=🦆"}
                      alt={incompatibleType}
                      className="w-12 h-12 object-contain"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=48&width=48&text=🦆"
                      }}
                    />
                  </div>
                  <div className="text-sm font-bold text-gray-800 mb-1">{incompatibleType}</div>
                  <div className="flex gap-1 justify-center mb-2 flex-wrap">
                    {duckTypes[incompatibleType as keyof typeof duckTypes]?.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs border border-black inline-flex items-center justify-center"
                        style={{ lineHeight: "1.2" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center leading-tight">
                    {duckSummaries[incompatibleType as keyof typeof duckSummaries]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-6">
            

            <Button
              onClick={onViewAllTypes}
              className="w-full bg-white/30 hover:bg-white/50 text-black py-4 rounded-full font-bold shadow-lg border-2 border-white backdrop-blur-sm text-base"
            >
              <Eye className="w-5 h-5 mr-2" />
              모든 유형 보기
            </Button>

            <Button
              onClick={handleShare}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-full font-bold shadow-lg border-2 border-white text-base"
            >
              <ShareIcon className="w-6 h-6 mr-2" />
              결과 공유하기
            </Button>

            <Button
              onClick={() => {
                handlePreorderClick()
                window.open("https://forms.gle/9Y5PbUNNr4KujFtb7", "_blank")
              }}
              className="w-full bg-[#9BB88A] hover:bg-[#86A276] text-white py-4 rounded-full font-bold shadow-lg border-2 border-white text-base"
            >
              오리의 꿈 사전예약 하러가기
            </Button>

            <Button
              onClick={onRestart}
              variant="ghost"
              className="w-full py-4 rounded-full underline hover:bg-white/10 text-black text-sm font-extralight"
            >
              테스트 다시하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
