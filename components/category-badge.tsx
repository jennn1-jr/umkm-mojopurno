import React from 'react'

export default function CategoryBadge({ category, large = false }: { category: string; large?: boolean }) {
  const categories = category.split(',').map(c => c.trim()).filter(Boolean)
  
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat, i) => {
        let color = 'bg-slate-100 text-slate-600 border-slate-200'
        const c = cat.toLowerCase()
        
        if (c.includes('sepatu') || c.includes('sandal') || c.includes('alas kaki')) {
          color = 'bg-sky-50 text-sky-700 border-sky-200' // Biru
        } else if (c.includes('kerajinan') || c.includes('souvenir')) {
          color = 'bg-emerald-50 text-emerald-700 border-emerald-200' // Hijau Emerald
        } else if (c.includes('rambak')) {
          color = 'bg-orange-50 text-orange-700 border-orange-200' // Oranye
        } else if (c.includes('kulit')) {
          color = 'bg-stone-50 text-stone-700 border-stone-200' // Fallback
        }
        
        return (
          <span key={i} className={`inline-flex items-center rounded-full border font-medium ${large ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'} ${color}`}>
            {cat}
          </span>
        )
      })}
    </div>
  )
}
