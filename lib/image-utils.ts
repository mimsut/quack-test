export const createFallbackCanvas = (
  duckType: {
    name: string
    tags: string[]
    description: string
    strengths: string[]
    weaknesses: string[]
  },
  username?: string,
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("Canvas context not available")
  }

  // Set canvas size
  canvas.width = 800
  canvas.height = 1200

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, "#749665")
  gradient.addColorStop(1, "#5a7a4d")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Main card background
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
  ctx.roundRect(40, 80, canvas.width - 80, canvas.height - 160, 30)
  ctx.fill()

  // Title
  ctx.fillStyle = "#374151"
  ctx.font = "bold 24px MoneyGraphy, sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(`${username || "당신"}의 꽥은`, canvas.width / 2, 150)

  // Duck name
  ctx.font = "bold 48px MoneyGraphy, sans-serif"
  ctx.fillStyle = "#1f2937"
  ctx.fillText(duckType.name, canvas.width / 2, 220)

  // Tags
  ctx.font = "20px MoneyGraphy, sans-serif"
  ctx.fillStyle = "#92400e"
  const tagsText = duckType.tags.map((tag) => `#${tag}`).join(" ")
  ctx.fillText(tagsText, canvas.width / 2, 260)

  // Duck placeholder
  ctx.fillStyle = "#6b7280"
  ctx.font = "80px sans-serif"
  ctx.fillText("🦆", canvas.width / 2, 380)

  // Description
  ctx.font = "18px MoneyGraphy, sans-serif"
  ctx.fillStyle = "#374151"
  ctx.textAlign = "left"

  const words = duckType.description.split(" ")
  let line = ""
  let y = 450
  const maxWidth = canvas.width - 120
  const lineHeight = 25

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " "
    const metrics = ctx.measureText(testLine)

    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, 80, y)
      line = words[n] + " "
      y += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, 80, y)

  // Strengths
  y += 60
  ctx.font = "bold 20px MoneyGraphy, sans-serif"
  ctx.fillText("나의 매력", 80, y)

  y += 30
  ctx.font = "16px MoneyGraphy, sans-serif"
  ctx.fillStyle = "#1e40af"
  duckType.strengths.slice(0, 5).forEach((strength, index) => {
    if (index % 3 === 0 && index > 0) y += 25
    const x = 80 + (index % 3) * 200
    ctx.fillText(`• ${strength}`, x, y)
  })

  return canvas
}

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
  canvas.toBlob(
    (blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.download = filename
        link.href = url
        link.style.display = "none"

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }
    },
    "image/png",
    1.0,
  )
}
