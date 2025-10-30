"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ShoppingCart } from "lucide-react"
import mockShoppingList from "@/data/mock-shopping-list.json"

export default function ShoppingListPage() {
  const router = useRouter()
  const [items, setItems] = useState(mockShoppingList)

  const togglePurchased = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    )
  }

  const clearPurchased = () => {
    setItems(items.filter((item) => !item.purchased))
  }

  const clearAll = () => {
    if (confirm("Clear entire shopping list?")) {
      setItems([])
    }
  }

  const purchasedCount = items.filter((item) => item.purchased).length

  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white border-b border-gray-200 sticky top-0 z-10'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>
            <h1 className='text-xl font-bold text-gray-900'>Kitchen Manager</h1>
            <button
              onClick={() => router.push("/")}
              className='text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors'
            >
              ← Back
            </button>
          </div>
        </div>
      </nav>

      <main className='max-w-4xl mx-auto px-4 py-6'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>Shopping List</h2>
            <p className='text-sm text-gray-600 mt-1'>
              {purchasedCount} of {items.length} items purchased
            </p>
          </div>
          <div className='flex gap-2'>
            {purchasedCount > 0 && (
              <button
                onClick={clearPurchased}
                className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm'
              >
                Clear Purchased
              </button>
            )}
            {items.length > 0 && (
              <button
                onClick={clearAll}
                className='px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm'
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className='text-center py-12 bg-white rounded-lg border border-gray-200'>
            <ShoppingCart size={48} className='mx-auto text-gray-400 mb-4' />
            <p className='text-gray-600 mb-2'>Your shopping list is empty</p>
            <p className='text-sm text-gray-500'>
              Add ingredients from your recipes to get started
            </p>
          </div>
        ) : (
          <div className='space-y-2'>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => togglePurchased(item.id)}
                className={`flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all ${
                  item.purchased ? "opacity-60" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded border-2 transition-colors ${
                    item.purchased
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  {item.purchased && <Check size={16} className='text-white' />}
                </div>
                <div className='flex-1'>
                  <span
                    className={`font-medium ${
                      item.purchased
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  className={`text-sm ${
                    item.purchased ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.quantity}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
