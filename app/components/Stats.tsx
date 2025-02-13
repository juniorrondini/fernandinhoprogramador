"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

const StatItem = ({ 
  label, 
  initialValue, 
  increment, 
  isPercentage = false, 
  delay, 
  minValue, 
  maxValue 
}) => {
  const [count, setCount] = useState(initialValue)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          // Se os limites estiverem definidos, calcula um incremento aleatório a cada tick
          if (minValue !== undefined && maxValue !== undefined) {
            const randomIncrement = Math.floor(Math.random() * 5) - 2 // gera um número entre -2 e 2
            let newValue = prevCount + randomIncrement
            if (newValue > maxValue) newValue = maxValue
            if (newValue < minValue) newValue = minValue
            return newValue
          } else {
            return prevCount + increment
          }
        })
      }, delay)
      return () => clearInterval(interval)
    }
  }, [inView, increment, delay, minValue, maxValue])

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-lg shadow-lg bg-gradient-to-br from-gray-700 via-gray-500 to-gray-700 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="text-5xl font-extrabold mb-2 text-white drop-shadow-lg">
        {count}{isPercentage && "%"}
      </div>
      <div className="text-lg font-semibold text-gray-200 tracking-widest">{label}</div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem 
            label="Clientes Satisfeitos" 
            initialValue={500} 
            increment={Math.floor(Math.random() * 3) + 1} 
            delay={1500} 
          />
          <StatItem 
            label="Projetos Concluídos" 
            initialValue={600} 
            increment={Math.floor(Math.random() * 4) + 1} 
            delay={1400} 
          />
          <StatItem 
            label="Taxa de Satisfação"  
            initialValue={94}  
            // O incremento aqui não será usado, pois os limites foram passados
            increment={Math.floor(Math.random() * 5) - 2} 
            isPercentage={true} 
            delay={800}
            minValue={90} 
            maxValue={98}
          />
        </div>
      </div>
    </section>
  )
}
