"use client"
import { Button } from "@/components/ui/button"
import { ShareIcon, RotateCcw, Eye, Download } from "lucide-react"
import { useRef } from "react"

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
  username: string
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

export function ResultPage({ duckType, username, onRestart, onViewAllTypes }: ResultPageProps) {
  const resultCardRef = useRef<HTMLDivElement>(null)

  const handleSaveImage = async () => {
    if (!resultCardRef.current) return

    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: "white",
        scale: 2,
        useCORS: true,
      })

      const link = document.createElement("a")
      link.download = `${username}_${duckType.name}_결과.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error("이미지 저장 실패:", error)
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
            <h2 className="text-lg font-bold text-gray-700 mb-2">{username}의 꽥은</h2>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">{duckType.name}</h1>
            <div className="flex justify-center gap-2 mb-4">
              {duckType.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border-black border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Duck Character */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-56 h-56 rounded-full border-4 flex items-center justify-center bg-transparent border-transparent">
                <img
                  src={duckImages[duckType.name] || "/placeholder.svg"}
                  alt={duckType.name}
                  className="w-48 h-48 object-contain"
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
            <div className="flex flex-wrap justify-center gap-2">
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
            <div className="flex justify-center items-center gap-6">
              {duckType.compatible.slice(0, 2).map((compatibleType, index) => (
                <div key={index} className="text-center flex flex-col items-center">
                  <div className="h-16 w-16 bg-blue-200/50 rounded-full border-4 border-blue-400 flex items-center justify-center mb-2">
                    <img
                      src={duckImages[compatibleType] || "/placeholder.svg"}
                      alt={compatibleType}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="text-sm font-bold text-gray-800 mb-1">{compatibleType}</div>
                  <div className="flex gap-1 justify-center mb-1">
                    {duckTypes[compatibleType as keyof typeof duckTypes]?.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs border border-black"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 text-center px-2">
                    {compatibilityDescriptions[duckType.name as keyof typeof compatibilityDescriptions]?.compatible[
                      compatibleType as keyof any
                    ] || "서로 잘 맞는 관계예요"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incompatible section */}
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">잘</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">안</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">맞</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">아</span>
              </div>
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-white font-bold text-base">ㅠ</span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-6">
              {duckType.incompatible.slice(0, 2).map((incompatibleType, index) => (
                <div key={index} className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-200/50 rounded-full border-4 border-red-400 flex items-center justify-center mb-2">
                    <img
                      src={duckImages[incompatibleType] || "/placeholder.svg"}
                      alt={incompatibleType}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="text-sm font-bold text-gray-800 mb-1">{incompatibleType}</div>
                  <div className="flex gap-1 justify-center">
                    {duckTypes[incompatibleType as keyof typeof duckTypes]?.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs border border-black"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button
            onClick={handleSaveImage}
            className="w-full bg-[#779966] hover:bg-[#6a8659] text-white py-4 text-lg rounded-full font-bold shadow-lg border-2 border-white"
          >
            <Download className="mr-2 size-5" />
            이미지 저장하기
          </Button>

          <Button
            onClick={onViewAllTypes}
            className="w-full bg-white/30 hover:bg-white/50 text-black py-4 text-lg rounded-full font-bold shadow-lg border-2 border-white backdrop-blur-sm"
          >
            <Eye className="w-5 h-5 mr-2" />
            모든 유형 보기
          </Button>

          <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 text-lg rounded-full font-bold shadow-lg border-2 border-white">
            <ShareIcon className="w-6 h-6 mr-2" />
            결과 공유하기
          </Button>

          <Button
            onClick={() => window.open("https://forms.gle/9Y5PbUNNr4KujFtb7", "_blank")}
            className="w-full bg-[#9BB88A] hover:bg-[#86A276] text-white py-4 text-lg rounded-full font-bold shadow-lg border-2 border-white"
          >
            멘탈케어 게임 오리의 꿈 사전예약 하러가기
          </Button>

          <Button
            onClick={onRestart}
            variant="ghost"
            className="w-full text-white py-4 text-lg rounded-full font-bold underline hover:bg-white/10"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            테스트 다시하기
          </Button>
        </div>
      </div>
    </div>
  )
}
