"use client"

import { useState } from "react"

interface DuckCharacterProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: string
  expression?: "happy" | "excited" | "calm" | "thinking"
  animation?: "float" | "bounce" | "pulse" | "wiggle"
}

export function DuckCharacter({
  size = "md",
  color = "#779966",
  expression = "happy",
  animation = "float",
}: DuckCharacterProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }

  const expressions = {
    happy: { eyes: "• •", mouth: "◡" },
    excited: { eyes: "★ ★", mouth: "○" },
    calm: { eyes: "- -", mouth: "‿" },
    thinking: { eyes: "◔ ◔", mouth: "〜" },
  }

  return (
    <div
      className={`${sizeClasses[size]} relative ${animation === "float" ? "floating-animation" : ""} ${animation === "bounce" ? "bounce-animation" : ""} ${animation === "pulse" ? "pulse-animation" : ""} ${animation === "wiggle" ? "wiggle-animation" : ""}`}
      style={{ color }}
    >
      {/* Duck body */}
      <div className="w-full h-full rounded-full relative" style={{ backgroundColor: color }}>
        {/* Eyes */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold">
          {expressions[expression].eyes}
        </div>

        {/* Beak */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-orange-400 rounded-full"></div>

        {/* Mouth */}
        <div className="absolute top-3/5 left-1/2 transform -translate-x-1/2 text-white text-sm">
          {expressions[expression].mouth}
        </div>

        {/* Wing */}
        <div
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 rounded-full opacity-80"
          style={{ backgroundColor: color, filter: "brightness(0.8)" }}
        ></div>
      </div>

      {/* Feet */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        <div className="w-3 h-2 bg-orange-400 rounded-full"></div>
        <div className="w-3 h-2 bg-orange-400 rounded-full"></div>
      </div>
    </div>
  )
}
