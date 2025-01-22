"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    features: ["Acesso básico", "Suporte por email", "1 projeto"],
  },
  {
    name: "Silver",
    price: "R$ 99/mês",
    features: ["Acesso intermediário", "Suporte prioritário", "5 projetos"],
  },
  {
    name: "Gold",
    price: "R$ 199/mês",
    features: ["Acesso completo", "Suporte 24/7", "Projetos ilimitados"],
  },
]

export default function Pricing() {
  return (
    <section className="py-12 bg-gradient-to-b from-purple-900 to-black relative">
      <motion.div
        className="absolute inset-0 bg-purple-900 opacity-10 rounded-3xl mx-4 md:mx-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Nossos Planos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card
                className={`transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-b from-purple-900 to-black overflow-hidden
                ${plan.name === "Silver" ? "border-2 border-gray-400" : plan.name === "Gold" ? "border-2 border-yellow-400" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-xl text-center text-gray-300">{plan.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-gray-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    variant={plan.name === "Gold" ? "default" : "outline"}
                    className="transition-all duration-300 hover:scale-105 bg-purple-700 text-white hover:bg-purple-600"
                  >
                    Escolher Plano
                  </Button>
                </CardFooter>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-900 to-transparent opacity-50" />
              </Card>
              {(plan.name === "Silver" || plan.name === "Gold") && (
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${plan.name === "Silver" ? "from-gray-400 to-gray-600" : "from-yellow-400 to-yellow-600"} rounded-lg z-[-1] opacity-75`}
                  animate={{
                    opacity: [0.5, 0.75, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

