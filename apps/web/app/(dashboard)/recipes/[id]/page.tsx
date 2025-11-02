"use client"

import { useParams, useRouter } from "next/navigation"
import { Trash2, Edit } from "lucide-react"
import { useEffect, useState } from "react"
import type { Recipe } from "@repo/shared"

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/${params.id}`
        )
        if (!res.ok) throw new Error("Recipe not found")
        const data = await res.json()
        setRecipe(data.recipe)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipe()
  }, [params.id])

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${params.id}`,
        {
          method: "DELETE",
        }
      )
      if (res.ok) {
        router.push("/recipes")
      }
    } catch (error) {
      console.error("Failed to delete recipe:", error)
      alert("Failed to delete recipe")
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <p className='text-gray-600'>Loading...</p>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Recipe not found
          </h2>
          <button
            onClick={() => router.push("/recipes")}
            className='text-blue-600 hover:text-blue-700'
          >
            ← Back to Recipes
          </button>
        </div>
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
              onClick={() => router.push("/recipes")}
              className='text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors'
            >
              ← Back
            </button>
          </div>
        </div>
      </nav>

      <main className='max-w-4xl mx-auto px-4 py-6'>
        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            {recipe.name}
          </h2>

          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Ingredients
            </h3>
            <ul className='space-y-2'>
              {recipe.ingredients.map((ing) => (
                <li
                  key={ing.id}
                  className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex-1'>
                    <span className='font-medium text-gray-900 capitalize'>
                      {ing.name}
                    </span>
                  </div>
                  <span className='text-gray-600'>
                    {ing.amount}
                    {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {recipe.instructions && (
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                Instructions
              </h3>
              <p className='text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg'>
                {recipe.instructions}
              </p>
            </div>
          )}

          <div className='flex gap-3'>
            <button className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
              Add to Shopping List
            </button>
            <button
              onClick={() => router.push(`/recipes/${recipe.id}/edit`)}
              className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2'
            >
              <Edit size={20} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className='px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors'
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
