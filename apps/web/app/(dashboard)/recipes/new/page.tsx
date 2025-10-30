"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"

export default function NewRecipePage() {
  const router = useRouter()
  const [recipeName, setRecipeName] = useState("")
  const [instructions, setInstructions] = useState("")
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }])

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (!recipeName.trim()) {
      alert("Please enter a recipe name")
      return
    }
    const hasEmptyIngredients = ingredients.some(
      (ing) => !ing.name.trim() || !ing.quantity.trim()
    )
    if (hasEmptyIngredients) {
      alert("Please fill in all ingredient fields")
      return
    }
    alert("Recipe created! (This will save to database)")
    router.push("/recipes")
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
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>New Recipe</h2>

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
                      onChange={(e) => {
                        const newIngs = [...ingredients]
                        newIngs[index].name = e.target.value
                        setIngredients(newIngs)
                      }}
                      className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Ingredient name'
                    />
                    <input
                      type='text'
                      value={ing.quantity}
                      onChange={(e) => {
                        const newIngs = [...ingredients]
                        newIngs[index].quantity = e.target.value
                        setIngredients(newIngs)
                      }}
                      className='w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Amount'
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
                className='flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
              >
                Create Recipe
              </button>
              <button
                onClick={() => router.push("/recipes")}
                className='px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
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
