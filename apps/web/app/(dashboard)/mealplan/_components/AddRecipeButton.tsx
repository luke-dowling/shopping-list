"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface AddRecipeButtonProps {
  variant?: "default" | "primary"
}

export function AddRecipeButton({ variant = "default" }: AddRecipeButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push("/recipes")
  }

  if (variant === "primary") {
    return (
      <button
        onClick={handleClick}
        className='inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium'
      >
        <Plus size={20} />
        Add Recipes
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
    >
      <Plus size={20} />
      Add Recipe
    </button>
  )
}
