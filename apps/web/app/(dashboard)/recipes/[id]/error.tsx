"use client"

import Link from "next/link"

export default function Error() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          Recipe not found
        </h2>
        <Link href={"/recipes"}>
          <button className='text-blue-600 hover:text-blue-700'>
            ← Back to Recipes
          </button>
        </Link>
      </div>
    </div>
  )
}
