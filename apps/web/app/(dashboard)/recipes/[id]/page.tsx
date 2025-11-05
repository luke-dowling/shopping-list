import type { Recipe } from "@repo/shared"

import BackButton from "../_components/BackButton"
import RecipeCard from "./_components/RecipeCard"

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`)
  if (!res.ok) throw new Error("Recipe not found")
  const { recipe } = (await res.json()) as { recipe: Recipe }
  console.log("recipe", recipe)

  return (
    <div className='min-h-screen bg-gray-50'>
      <BackButton />

      <RecipeCard recipe={recipe} />
    </div>
  )
}
