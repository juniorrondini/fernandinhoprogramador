"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

const StatItem = ({ label, initialValue, increment }) => {
  const [count, setCount] = useState(initialValue)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + increment
          return newCount
        })
      }, 3000) // Incrementa a cada 3 segundos
      return () => clearInterval(interval)
    }
  }, [inView, increment])

  return (
    <motion.div
      ref={ref}
      className="text-center relative p-6 rounded-lg bg-gradient-to-b from-purple-900 to-black"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl font-bold mb-2 text-white">{count}</div>
      <div className="text-gray-300">{label}</div>
      <motion.div
        className="absolute inset-0 bg-purple-500 rounded-lg z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem label="Clientes Satisfeitos" initialValue={500} increment={1} />
          <StatItem label="Projetos Concluídos" initialValue={600} increment={1} />
          <StatItem label="Taxa de Satisfação" initialValue={98} increment={0} />
        </div>
      </div>
    </section>
  )
}

