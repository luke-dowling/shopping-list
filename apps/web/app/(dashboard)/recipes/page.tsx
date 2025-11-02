import Link from "next/link"
import { ChefHat, Plus } from "lucide-react"
import type { Recipe } from "@repo/shared"

async function getAllRecipes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch recipes")
  return res.json()
}

export default async function RecipesPage() {
  const { recipes } = await getAllRecipes()

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-4xl mx-auto px-4 py-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-900'>Recipes</h2>
          <Link
            href='/recipes/new'
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            <Plus size={20} />
            New Recipe
          </Link>
        </div>

        {recipes.length === 0 ? (
          <div className='text-center py-12 bg-white rounded-lg border border-gray-200'>
            <ChefHat size={48} className='mx-auto text-gray-400 mb-4' />
            <p className='text-gray-600 mb-2'>No recipes yet</p>
            <p className='text-sm text-gray-500'>
              Create your first recipe to get started
            </p>
          </div>
        ) : (
          <div className='grid gap-4'>
            {recipes.map((recipe: Recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                      {recipe.name}
                    </h3>
                    <p className='text-sm text-gray-600'>
                      {recipe.ingredients.length} ingredients
                    </p>
                  </div>
                  <ChefHat className='text-gray-400' size={24} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
