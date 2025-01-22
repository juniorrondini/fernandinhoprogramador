"use client"

import { motion } from "framer-motion"

export default function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md bg-purple-900 bg-opacity-30 p-4 shadow-lg transition-all duration-300 hover:bg-opacity-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center text-gray-300">Engenharia da Computação</h1>
    </motion.header>
  )
}

