import React from 'react'

export default function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : 'text-left'}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-5xl font-heading font-bold text-zentry-white tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-zentry-gray font-light text-lg max-w-2xl leading-relaxed
          ${center ? 'mx-auto' : ''}">
          {subtitle}
        </p>
      )}
    </div>
  )
}
