import mockRecipes from "@/data/mock-recipes.json"
import fs from "node:fs"

const recipesPath = "./data/mock-recipes.json"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const recipe = mockRecipes.find(async (r) => {
    await params
    return r.id === params.id
  })

  if (!recipe) {
    return Response.json({ error: "Recipe not found" }, { status: 404 })
  }

  return Response.json({ recipe })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { recipe: updatedRecipe } = await request.json()
  const index = mockRecipes.findIndex((r) => r.id === params.id)

  if (index === -1) {
    return Response.json({ error: "Recipe not found" }, { status: 404 })
  }

  mockRecipes[index] = {
    ...updatedRecipe,
    id: params.id,
  }

  fs.writeFileSync(recipesPath, JSON.stringify(mockRecipes, null, 2))

  return Response.json({
    message: "Recipe updated",
    recipe: mockRecipes[index],
  })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = mockRecipes.findIndex((r) => r.id === params.id)

  if (index === -1) {
    return Response.json({ error: "Recipe not found" }, { status: 404 })
  }

  mockRecipes.splice(index, 1)
  fs.writeFileSync(recipesPath, JSON.stringify(mockRecipes, null, 2))

  return Response.json({ message: "Recipe deleted" })
}
