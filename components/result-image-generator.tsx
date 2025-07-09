"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

interface ResultImageGeneratorProps {
  duckType: {
    name: string
    tags: string[]
    description: string
    strengths: string[]
    weaknesses: string[]
    compatible: string[]
  }
}

export function ResultImageGenerator({ duckType }: ResultImageGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateImage = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 1200

    // Garden background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#E8F5E8")
    gradient.addColorStop(0.7, "#D4E8D4")
    gradient.addColorStop(1, "#C0DBC0")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add garden elements
    ctx.fillStyle = "rgba(119, 153, 102, 0.1)"
    // Grass at bottom
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100)

    // Flowers
    ctx.fillStyle = "rgba(255, 182, 193, 0.6)"
    ctx.beginPath()
    ctx.arc(100, canvas.height - 60, 15, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "rgba(255, 255, 0, 0.6)"
    ctx.beginPath()
    ctx.arc(700, canvas.height - 80, 12, 0, Math.PI * 2)
    ctx.fill()

    // Main content area with garden theme
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
    ctx.roundRect(50, 150, canvas.width - 100, canvas.height - 300, 30)
    ctx.fill()

    // Try to load and draw the actual duck image
    const duckImagePath = `/images/ducks/${duckType.name}.png`
    try {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.drawImage(img, canvas.width / 2 - 60, 250, 120, 120)
      }
      img.src = duckImagePath
    } catch (error) {
      // Fallback to simple duck drawing
      ctx.fillStyle = "#779966"
      ctx.beginPath()
      ctx.arc(canvas.width / 2, 310, 60, 0, Math.PI * 2)
      ctx.fill()
    }

    // Rest of the text content remains the same...
    ctx.fillStyle = "#333"
    ctx.font = "bold 48px TmoneyRoundWind, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(duckType.name, canvas.width / 2, 450)

    // Tags
    ctx.font = "24px TmoneyRoundWind, sans-serif"
    const tagsText = duckType.tags.map((tag) => `#${tag}`).join(" ")
    ctx.fillText(tagsText, canvas.width / 2, 500)

    // Description
    ctx.font = "20px TmoneyRoundWind, sans-serif"
    ctx.textAlign = "left"
    const words = duckType.description.split(" ")
    let line = ""
    let y = 580
    const maxWidth = canvas.width - 140

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " "
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 90, y)
        line = words[n] + " "
        y += 30
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, 90, y)

    return canvas.toDataURL("image/png")
  }

  const handleSaveImage = async () => {
    const dataUrl = await generateImage()
    if (!dataUrl) return

    // Create download link
    const link = document.createElement("a")
    link.download = `${duckType.name}_결과.png`
    link.href = dataUrl
    link.click()
  }

  const handleShare = async () => {
    const dataUrl = await generateImage()
    if (!dataUrl) return

    if (navigator.share) {
      try {
        // Convert data URL to blob
        const response = await fetch(dataUrl)
        const blob = await response.blob()
        const file = new File([blob], `${duckType.name}_결과.png`, { type: "image/png" })

        await navigator.share({
          title: `나는 ${duckType.name}!`,
          text: `내 안의 꽥 테스트 결과: ${duckType.name}`,
          files: [file],
        })
      } catch (error) {
        console.error("Error sharing:", error)
        // Fallback to text sharing
        await navigator.share({
          title: `나는 ${duckType.name}!`,
          text: `내 안의 꽥 테���트 결과: ${duckType.name} - ${duckType.tags.join(", ")}`,
          url: window.location.href,
        })
      }
    } else {
      // Fallback for browsers without Web Share API
      const text = `나는 ${duckType.name}! 내 안의 꽥 테스트 결과: ${duckType.tags.join(", ")}`
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text)
        alert("결과가 클립보드에 복사되었습니다!")
      }
    }
  }

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />

      <Button
        onClick={handleSaveImage}
        className="w-full hover:bg-gray-800 text-white py-4 text-lg rounded-full font-bold bg-[rgba(119,153,102,1)]"
      >
        <Download className="w-5 h-5 mr-2 border-0" />
        이미지로 저장하기
      </Button>

      <Button
        onClick={handleShare}
        variant="outline"
        className="w-full border-2 border-[#779966] text-[#779966] hover:bg-[#779966] hover:text-white py-4 text-lg rounded-full font-bold bg-transparent"
      >
        <Share2 className="w-5 h-5 mr-2" />
        결과 공유하기
      </Button>
    </div>
  )
}
