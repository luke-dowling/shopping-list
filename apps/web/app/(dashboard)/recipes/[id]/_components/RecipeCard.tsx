"use client"

import { Trash2, Edit } from "lucide-react"
import { useRouter } from "next/navigation"

import { Recipe } from "@repo/shared"

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${recipe.id}`,
        {
          method: "DELETE",
        }
      )
      if (res.ok) {
        alert("recipe deleted")
        router.push("/recipes")
      }
    } catch (error) {
      console.error("Failed to delete recipe:", error)
      alert("Failed to delete recipe")
    }
  }
  return (
    <main className='max-w-4xl mx-auto px-4 py-6'>
      <div className='bg-white rounded-lg border border-gray-200 p-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>{recipe.name}</h2>

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
            className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-black flex items-center gap-2'
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
  )
}
