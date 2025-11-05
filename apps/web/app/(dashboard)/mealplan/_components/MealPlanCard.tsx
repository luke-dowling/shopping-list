"use client"
// components/meal-plan/meal-plan-card.tsx

import { useState } from "react"
import { Trash2, Minus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface MealPlanCardProps {
  item: {
    id: string
    recipeId: string
    portions: number
    addedAt: string
    recipe: {
      id: string
      name: string
      ingredients: Array<{
        id: string
        name: string
        amount: number
        unit: string | null
      }>
      instructions: string
    }
  }
}

export function MealPlanCard({ item }: MealPlanCardProps) {
  const router = useRouter()
  const [portions, setPortions] = useState(item.portions)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const updatePortions = async (newPortions: number) => {
    if (newPortions < 1) return

    setPortions(newPortions)
    setIsUpdating(true)

    try {
      await fetch("/api/weekly-shop", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          portions: newPortions,
          userId: "user_1",
        }),
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to update portions:", error)
      setPortions(item.portions) // Revert on error
    } finally {
      setIsUpdating(false)
    }
  }

  const removeFromWeeklyShop = async () => {
    if (!confirm(`Remove ${item.recipe.name} from this week's plan?`)) return

    setIsRemoving(true)

    try {
      await fetch(`/api/weekly-shop?id=${item.id}&userId=user_1`, {
        method: "DELETE",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to remove recipe:", error)
      setIsRemoving(false)
    }
  }

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 transition-all ${
        isRemoving ? "opacity-50" : "hover:shadow-md"
      }`}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
            {item.recipe.name}
          </h3>
          <p className='text-sm text-gray-600 mb-4'>
            {item.recipe.ingredients.length} ingredients
          </p>

          {/* Ingredient Preview */}
          <div className='flex flex-wrap gap-2'>
            {item.recipe.ingredients.slice(0, 4).map((ing) => (
              <span
                key={ing.id}
                className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded'
              >
                {ing.name}
              </span>
            ))}
            {item.recipe.ingredients.length > 4 && (
              <span className='text-xs text-gray-500 px-2 py-1'>
                +{item.recipe.ingredients.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className='flex flex-col items-end gap-3'>
          {/* Portion Control */}
          <div className='flex flex-col items-center gap-2'>
            <span className='text-xs text-gray-950 font-medium'>Portions</span>
            <div className='flex items-center gap-2 bg-gray-100 rounded-lg p-1'>
              <button
                onClick={() => updatePortions(portions - 1)}
                disabled={portions <= 1 || isUpdating}
                className='w-8 h-8 flex items-center justify-center rounded hover:bg-white transition-colors text-gray-950 disabled:opacity-40 disabled:cursor-not-allowed'
              >
                <Minus size={16} />
              </button>
              <span className='w-8 text-center font-semibold text-gray-950'>
                {portions}
              </span>
              <button
                onClick={() => updatePortions(portions + 1)}
                disabled={isUpdating}
                className='w-8 h-8 flex items-center justify-center rounded hover:bg-white transition-colors disabled:opacity-40 text-gray-950'
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={removeFromWeeklyShop}
            disabled={isRemoving}
            className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40'
            title='Remove from weekly plan'
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
