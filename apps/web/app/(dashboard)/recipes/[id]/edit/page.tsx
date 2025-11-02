"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"
import type { Recipe } from "@repo/shared"

interface IngredientInput {
  id?: string
  name: string
  amount: string
  unit: string
}

export default function EditRecipePage() {
  const params = useParams()
  const router = useRouter()
  const [recipeName, setRecipeName] = useState("")
  const [instructions, setInstructions] = useState("")
  const [ingredients, setIngredients] = useState<IngredientInput[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/${params.id}`
        )
        if (!res.ok) throw new Error("Recipe not found")
        const { recipe }: { recipe: Recipe } = await res.json()

        setRecipeName(recipe.name)
        setInstructions(recipe.instructions || "")
        setIngredients(
          recipe.ingredients.map((ing) => ({
            id: ing.id,
            name: ing.name,
            amount: ing.amount.toString(),
            unit: ing.unit || "",
          }))
        )
      } catch (error) {
        console.error(error)
        alert("Failed to load recipe")
        router.push("/recipes")
      } finally {
        setLoading(false)
      }
    }
    fetchRecipe()
  }, [params.id, router])

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const updateIngredient = (
    index: number,
    field: keyof IngredientInput,
    value: string
  ) => {
    const newIngs = [...ingredients]
    newIngs[index][field] = value
    setIngredients(newIngs)
  }

  const handleSave = async () => {
    if (!recipeName.trim()) {
      alert("Please enter a recipe name")
      return
    }
    const hasEmptyIngredients = ingredients.some(
      (ing) => !ing.name.trim() || !ing.amount.trim()
    )
    if (hasEmptyIngredients) {
      alert("Please fill in all ingredient name and amount fields")
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipe: {
              name: recipeName,
              instructions: instructions || null,
              ingredients: ingredients.map((ing) => ({
                id: ing.id,
                name: ing.name,
                amount: parseFloat(ing.amount),
                unit: ing.unit || null,
              })),
            },
          }),
        }
      )

      if (res.ok) {
        router.push(`/recipes/${params.id}`)
        router.refresh()
      } else {
        alert("Failed to update recipe")
      }
    } catch (error) {
      console.error("Failed to update recipe:", error)
      alert("Failed to update recipe")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <p className='text-gray-600'>Loading...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white border-b border-gray-200 sticky top-0 z-10'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>
            <h1 className='text-xl font-bold text-gray-900'>Kitchen Manager</h1>
            <button
              onClick={() => router.push(`/recipes/${params.id}`)}
              className='text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors'
            >
              ← Back
            </button>
          </div>
        </div>
      </nav>

      <main className='max-w-4xl mx-auto px-4 py-6'>
        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Edit Recipe</h2>

          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Recipe Name
              </label>
              <input
                type='text'
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='e.g., Spaghetti Carbonara'
              />
            </div>

            <div>
              <div className='flex justify-between items-center mb-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Ingredients
                </label>
                <button
                  type='button'
                  onClick={addIngredient}
                  className='text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1'
                >
                  <Plus size={16} />
                  Add Ingredient
                </button>
              </div>
              <div className='space-y-2'>
                {ingredients.map((ing, index) => (
                  <div key={index} className='flex gap-2'>
                    <input
                      type='text'
                      value={ing.name}
                      onChange={(e) =>
                        updateIngredient(index, "name", e.target.value)
                      }
                      className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Ingredient name'
                    />
                    <input
                      type='text'
                      value={ing.amount}
                      onChange={(e) =>
                        updateIngredient(index, "amount", e.target.value)
                      }
                      className='w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Amount'
                    />
                    <input
                      type='text'
                      value={ing.unit}
                      onChange={(e) =>
                        updateIngredient(index, "unit", e.target.value)
                      }
                      className='w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Unit'
                    />
                    {ingredients.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeIngredient(index)}
                        className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Instructions (Optional)
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={6}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Step by step cooking instructions...'
              />
            </div>

            <div className='flex gap-3'>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className='flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => router.push(`/recipes/${params.id}`)}
                disabled={isSaving}
                className='px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
