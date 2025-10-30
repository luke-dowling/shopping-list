import Link from "next/link"
import { ChefHat, Plus } from "lucide-react"

async function getAllRecipes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
  console.log(res)
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

        <div className='grid gap-4'>
          {recipes.map((recipe) => (
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
      </main>
    </div>
  )
}
