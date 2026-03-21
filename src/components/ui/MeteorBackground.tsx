"use client"

import  { useEffect, useRef } from "react"

export const MeteorBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const createMeteor = () => {
      const meteor = document.createElement('div')
      
      // 随机位置和大小
      const left = Math.random() * 100
      const size = Math.random() * 3 + 2 // 2-5px
      const duration = Math.random() * 3 + 2 // 2-5秒
      const delay = Math.random() * 2 // 0-2秒

      meteor.style.position = 'absolute'
      meteor.style.left = `${left}%`
      meteor.style.top = '-10px'
      meteor.style.width = `${size}px`
      meteor.style.height = `${size}px`
      meteor.style.backgroundColor = 'white' // 流星颜色为白色  
      meteor.style.borderRadius = '50%'
      meteor.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.8)'
      meteor.style.pointerEvents = 'none'
      meteor.style.zIndex = '1'
      meteor.style.animation = `meteor ${duration}s linear ${delay}s infinite`

      containerRef.current?.appendChild(meteor)

      // 创建尾迹元素
      const tail = document.createElement('div')
      tail.style.position = 'absolute'
      tail.style.left = '0'
      tail.style.top = '0'
      tail.style.width = '50px'
      tail.style.height = '1px'
      tail.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'
      tail.style.transformOrigin = 'left center'
      tail.style.transform = 'rotate(225deg)'
      tail.style.pointerEvents = 'none'
      tail.style.zIndex = '0'

      meteor.appendChild(tail)

      // 清理
      setTimeout(() => {
        meteor.remove()
      }, (duration + delay) * 1000)
    }
    
    // 创建多个流星
    const interval = setInterval(createMeteor, 500)

    // 初始创建一些流星
    for (let i = 0; i < 10; i++) {
      setTimeout(createMeteor, i * 200)
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        perspective: '1000px'
      }}
    />
  )
}