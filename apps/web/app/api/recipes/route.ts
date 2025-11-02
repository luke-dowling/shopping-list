import mockRecipes from "@/data/mock-recipes.json"
import fs from "node:fs"
import { v4 } from "uuid"

const recipesPath = "./data/mock-recipes.json"

export async function GET() {
  return Response.json({ recipes: mockRecipes })
}

export async function POST(request: Request) {
  const { recipe } = await request.json()

  recipe.id = `recipe_${v4()}`
  recipe.ingredients = recipe.ingredients.map((ing: { name: string; amount: string; unit: string }) => ({
    id: `ingredient_${v4()}`,
    name: ing.name.toLowerCase().trim(),
    amount: parseFloat(ing.amount),
    unit: ing.unit || null,
  }))

  mockRecipes.push(recipe)

  fs.writeFileSync(recipesPath, JSON.stringify(mockRecipes, null, 2))

  return Response.json({ message: "Recipe added", recipe })
}
