import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const posts = [
  {
    title: "Desenvolvimento de Software Personalizado",
    description: "Criamos soluções de software sob medida para atender às necessidades específicas do seu negócio.",
  },
  {
    title: "Consultoria em TI",
    description:
      "Oferecemos consultoria especializada para ajudar sua empresa a tomar as melhores decisões tecnológicas.",
  },
  {
    title: "Automação de Processos",
    description: "Implementamos soluções de automação para aumentar a eficiência e reduzir custos operacionais.",
  },
]

export default function Blog() {
  return (
    <section className="py-12 bg-gradient-to-b from-black to-purple-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="transition-transform duration-300 hover:scale-105">
              <Card className="h-full bg-gradient-to-b from-purple-900 to-black border-purple-700 overflow-hidden">
                <div className="relative">
                  <CardHeader>
                    <CardTitle className="text-white">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">{post.description}</CardDescription>
                  </CardContent>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-900 to-transparent opacity-50" />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

