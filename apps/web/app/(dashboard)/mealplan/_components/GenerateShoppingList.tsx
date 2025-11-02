"use client"

import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface GenerateShoppingListButtonProps {
  recipeCount: number
}

export function GenerateShoppingListButton({
  recipeCount,
}: GenerateShoppingListButtonProps) {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      // TODO: Call API to generate/update shopping list
      await fetch("/api/shopping-list/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user_1" }),
      })

      router.push("/shopping-list")
    } catch (error) {
      console.error("Failed to generate shopping list:", error)
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      className='flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
    >
      <ShoppingCart size={20} />
      {isGenerating
        ? "Generating..."
        : `Generate Shopping List (${recipeCount})`}
    </button>
  )
}
