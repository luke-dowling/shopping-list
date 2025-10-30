import mockRecipes from "@/data/mock-recipes.json"

export async function GET() {
  return Response.json({ recipes: mockRecipes })
}
