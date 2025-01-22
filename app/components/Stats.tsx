"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

const StatItem = ({ label, initialValue, increment, isPercentage = false, delay }) => {
  const [count, setCount] = useState(initialValue)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + increment)
      }, delay)
      return () => clearInterval(interval)
    }
  }, [inView, increment, delay])

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
          <StatItem label="Clientes Satisfeitos" initialValue={500} increment={Math.floor(Math.random() * 3) + 1} delay={2500} />
          <StatItem label="Projetos Concluídos" initialValue={600} increment={Math.floor(Math.random() * 2) + 1} delay={3500} />
          <StatItem label="Taxa de Satisfação" initialValue={98} increment={0} isPercentage={true} />
        </div>
      </div>
    </section>
  )
}
