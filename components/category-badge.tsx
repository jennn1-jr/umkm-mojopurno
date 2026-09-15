import React from 'react'

export default function CategoryBadge({ category, large = false }: { category: string; large?: boolean }) {
  let color = 'bg-slate-100 text-slate-600 border-slate-200'
  const c = category.toLowerCase()
  
  if (c.includes('sepatu') || c.includes('sandal') || c.includes('alas kaki')) {
    color = 'bg-sky-50 text-sky-700 border-sky-200'
  } else if (c.includes('kulit') || c.includes('souvenir') || c.includes('kerajinan') || c.includes('rambak')) {
    color = 'bg-amber-50 text-amber-700 border-amber-200'
  }
  
  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${large ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'} ${color}`}>
      {category}
    </span>
  )
}
