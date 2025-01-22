"use client"

import { motion } from "framer-motion"

export default function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md bg-gray-800/70 p-4 shadow-md transition-all duration-300 hover:bg-opacity-80"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center text-white">Engenharia da Computação</h1>
    </motion.header>
  )
}
