"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    price: "R$ 99",
    features: ["Acesso básico", "Suporte por email", "1 projeto"],
  },
  {
    name: "Silver",
    price: "R$ 399/mês",
    features: ["Acesso intermediário", "Suporte prioritário", "5 projetos"],
  },
  {
    name: "Gold",
    price: "R$ 1999/mês",
    features: ["Acesso completo", "Suporte 24/7", "Projetos ilimitados"],
  },
]

// Estilização de cada plano
const planStyles = {
  Free: {
    background: "bg-gray-800/60",
    border: "border-gray-500",
    text: "text-white",
    hoverBg: "hover:bg-gray-700/80",
    hoverBorder: "hover:border-gray-400",
  },
  Silver: {
    background: "bg-gradient-to-br from-gray-600 via-gray-500 to-gray-600",
    border: "border-gray-400",
    text: "text-gray-50",
    hoverBg: "hover:from-gray-500 hover:to-gray-400",
    hoverBorder: "hover:border-gray-300",
  },
  Gold: {
    background: "bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-500",
    border: "border-yellow-400",
    text: "text-yellow-100",
    hoverBg: "hover:from-yellow-400 hover:to-yellow-300",
    hoverBorder: "hover:border-yellow-200",
  },
}

export default function Pricing() {
  return (
    <section className="py-16 bg-black flex justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-white uppercase tracking-wide drop-shadow-lg">
          Nossos Planos
        </h2>

        {/* Caixa cinza ao redor dos planos */}
        <div className="bg-gray-800/80 p-10 rounded-xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const styles = planStyles[plan.name] || planStyles.Free
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <Card
                    className={`relative ${styles.background} ${styles.border} border-2 rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 ${styles.hoverBg} ${styles.hoverBorder}`}
                  >
                    <CardHeader>
                      <CardTitle className={`text-3xl font-bold text-center drop-shadow-md ${styles.text}`}>
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-2xl text-center text-gray-200">{plan.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside text-gray-100 text-lg">
                        {plan.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button
                        className={`px-6 py-3 text-lg font-semibold text-black rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 ${
                          plan.name === "Gold"
                            ? "bg-yellow-500 hover:bg-yellow-400"
                            : plan.name === "Silver"
                            ? "bg-gray-500 hover:bg-gray-400"
                            : "bg-gray-600 hover:bg-gray-500"
                        }`}
                      >
                        Escolher Plano
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
