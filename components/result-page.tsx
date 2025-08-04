"use client"
import { Button } from "@/components/ui/button"
import { ShareIcon, Eye, Download } from "lucide-react"
import { useRef } from "react"
import html2canvas from "html2canvas"
// Note: You need to install html2canvas: npm install html2canvas @types/html2canvas
import { trackImageSave, trackShare } from "@/lib/analytics"

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
  username?: string // optional로 변경
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
  흰뺨검둥오리: "/images/ducks/흰뺨검둥오리.png",
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

const compatibilityDescriptions = {
  가창오리: {
    compatible: {
      홍머리오리: "솔직한 홍머리오리가 가창오리의 진심을 끌어내줘요",
      청둥오리: "유연한 청둥오리가 가창오리의 신중함을 이해해줘요",
    },
    incompatible: {
      쇠오리: "적극적인 쇠오리가 가창오리에게는 부담스러울 수 있어요",
      발구지: "즉흥적인 발구지와는 속도 차이가 날 수 있어요",
    },
  },
  // ... 다른 유형들도 추가
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

  const handleSaveImage = async () => {
    try {
      if (!resultCardRef.current) {
        console.error("Result card ref not available")
        return
      }

      // Function to convert image to base64 data URL
      const imageToDataURL = async (imgElement: HTMLImageElement): Promise<string> => {
        return new Promise((resolve, reject) => {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            reject(new Error("Canvas context not available"))
            return
          }

          const img = new Image()
          img.crossOrigin = "anonymous"

          img.onload = () => {
            canvas.width = img.naturalWidth || img.width
            canvas.height = img.naturalHeight || img.height
            ctx.drawImage(img, 0, 0)

            try {
              const dataURL = canvas.toDataURL("image/png")
              resolve(dataURL)
            } catch (error) {
              // Fallback: create a placeholder data URL
              canvas.width = 200
              canvas.height = 200
              ctx.fillStyle = "#779966"
              ctx.fillRect(0, 0, 200, 200)
              ctx.fillStyle = "#ffffff"
              ctx.font = "48px Arial"
              ctx.textAlign = "center"
              ctx.fillText("🦆", 100, 120)
              resolve(canvas.toDataURL("image/png"))
            }
          }

          img.onerror = () => {
            // Create fallback placeholder
            canvas.width = 200
            canvas.height = 200
            ctx.fillStyle = "#779966"
            ctx.fillRect(0, 0, 200, 200)
            ctx.fillStyle = "#ffffff"
            ctx.font = "48px Arial"
            ctx.textAlign = "center"
            ctx.fillText("🦆", 100, 120)
            resolve(canvas.toDataURL("image/png"))
          }

          img.src = imgElement.src
        })
      }

      // Get all images in the result card
      const images = resultCardRef.current.querySelectorAll("img")
      const imageDataMap = new Map<string, string>()

      // Convert all images to data URLs
      for (const img of Array.from(images)) {
        try {
          const dataURL = await imageToDataURL(img as HTMLImageElement)
          imageDataMap.set(img.src, dataURL)
        } catch (error) {
          console.warn("Failed to convert image to data URL:", img.src, error)
        }
      }

      // Temporarily replace image sources with data URLs
      const originalSources: { element: HTMLImageElement; originalSrc: string }[] = []

      images.forEach((img) => {
        const htmlImg = img as HTMLImageElement
        originalSources.push({ element: htmlImg, originalSrc: htmlImg.src })

        const dataURL = imageDataMap.get(htmlImg.src)
        if (dataURL) {
          htmlImg.src = dataURL
        }
      })

      // Wait a moment for the DOM to update
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Capture with html2canvas with enhanced settings
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
        logging: false,
        width: resultCardRef.current.scrollWidth,
        height: resultCardRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: resultCardRef.current.scrollWidth,
        windowHeight: resultCardRef.current.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all images in the cloned document use data URLs
          const clonedImages = clonedDoc.querySelectorAll("img")
          clonedImages.forEach((clonedImg) => {
            const htmlClonedImg = clonedImg as HTMLImageElement
            const dataURL = imageDataMap.get(htmlClonedImg.src)
            if (dataURL) {
              htmlClonedImg.src = dataURL
            }
          })
        },
      })

      // Restore original image sources
      originalSources.forEach(({ element, originalSrc }) => {
        element.src = originalSrc
      })

      // Convert canvas to blob and download
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.download = `${username || "나"}_${duckType.name}_결과.png`
            link.href = url
            link.click()
            URL.revokeObjectURL(url)
            trackImageSave(duckType.name) // 이 줄 추가
          }
        },
        "image/png",
        1.0,
      )
    } catch (error) {
      console.error("이미지 저장 실패:", error)
      alert("이미지 저장에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const handleShare = async () => {
    const text = `나는 ${duckType.name}! 내 안의 꽥 테스트 결과: ${duckType.tags.join(", ")}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${duckType.name}!`,
          text: text,
          url: window.location.href,
        })
        trackShare(duckType.name, "native_share") // 이 줄 추가
      } catch (error) {
        console.error("공유 실패:", error)
      }
    } else {
      // 클립보드에 복사
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text + " " + window.location.href)
        trackShare(duckType.name, "clipboard") // 이 줄 추가
        alert("결과가 클립보드에 복사되었습니다!")
      }
    }
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
        <div ref={resultCardRef} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-gray-700 mb-2">{username || "당신"}의 꽥은</h2>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">{duckType.name}</h1>
            <div className="flex justify-center gap-2 mb-4">
              {duckType.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-black"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Duck Character - Full width prominent display */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4 w-full flex justify-center">
              <div className="max-w-xs h-64 flex items-center justify-center my-[-52px] w-full">
                <img
                  src={duckImages[duckType.name] || "/placeholder.svg?height=200&width=200&text=Duck"}
                  alt={duckType.name}
                  className="w-full h-full object-contain max-w-[200px] max-h-[200px]"
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
                <span className="text-white text-lg font-bold">성</span>
              </div>
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white text-lg font-bold">격</span>
              </div>
            </div>
          </div>

          {/* Description with highlighted keywords */}
          <div className="text-center text-gray-700 text-sm leading-relaxed mb-6">
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

          {/* My charm section */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">나</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">의</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">매</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">력</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 flex-row items-start py-[px] my-0 mb-0">
              {duckType.strengths.slice(0, 5).map((strength, index) => (
                <span
                  key={index}
                  className="bg-blue-400/60 text-black px-3 py-1 rounded-full text-sm font-medium border-black border"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Caution section */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white text-base font-black">조</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">심</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">할</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">것</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {duckType.weaknesses.slice(0, 5).map((weakness, index) => (
                <span
                  key={index}
                  className="bg-red-400/60 text-black px-3 py-1 rounded-full text-sm font-medium border-black border"
                >
                  {weakness}
                </span>
              ))}
            </div>
          </div>

          {/* Compatible section */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">찰</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">떡</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">궁</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">합</span>
              </div>
            </div>
            <div className="flex justify-center items-start gap-4">
              {duckType.compatible.slice(0, 2).map((compatibleType, index) => (
                <div key={index} className="text-center flex flex-col items-center max-w-[140px]">
                  <div className="bg-blue-200/50 rounded-full border-blue-400 flex items-center justify-center mb-2 border-2 size-auto w-16 h-16">
                    <img
                      src={duckImages[compatibleType] || "/placeholder.svg?height=48&width=48&text=🦆"}
                      alt={compatibleType}
                      className="w-12 h-12 object-contain"
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
                        className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs border border-black"
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

          {/* Incompatible section */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">안</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">맞</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">아</span>
              </div>
            </div>
            <div className="flex justify-center items-start gap-4">
              {duckType.incompatible.slice(0, 2).map((incompatibleType, index) => (
                <div key={index} className="text-center flex flex-col items-center max-w-[140px]">
                  <div className="w-16 h-16 bg-red-200/50 rounded-full border-red-400 flex items-center justify-center mb-2 border-2">
                    <img
                      src={duckImages[incompatibleType] || "/placeholder.svg?height=48&width=48&text=🦆"}
                      alt={incompatibleType}
                      className="w-12 h-12 object-contain"
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
                        className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs border border-black"
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
              onClick={handleSaveImage}
              className="w-full bg-[#779966] hover:bg-[#6a8659] text-white py-4 rounded-full font-bold shadow-lg border-2 border-white text-center text-base"
            >
              <Download className="mr-2 size-5" />
              이미지 저장하기
            </Button>

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
              onClick={() => window.open("https://forms.gle/9Y5PbUNNr4KujFtb7", "_blank")}
              className="w-full bg-[#9BB88A] hover:bg-[#86A276] text-white py-4 rounded-full font-bold shadow-lg border-2 border-white text-base"
            >
              오리의 꿈 사전예약 하러가기
            </Button>

            <Button
              onClick={onRestart}
              variant="ghost"
              className="w-full py-4 rounded-full font-bold underline hover:bg-white/10 text-base text-black"
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
