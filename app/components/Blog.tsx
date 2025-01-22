import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const posts = [
  {
    title: "Desenvolvimento de Software Personalizado",
    description: "Criamos soluções de software sob medida para atender às necessidades específicas do seu negócio.",
  },
  {
    title: "Consultoria em TI",
    description: "Oferecemos consultoria especializada para ajudar sua empresa a tomar as melhores decisões tecnológicas.",
  },
  {
    title: "Automação de Processos",
    description: "Implementamos soluções de automação para aumentar a eficiência e reduzir custos operacionais.",
  },
]

export default function Blog() {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg">
          Nossos Serviços
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="transition-transform duration-300 hover:scale-105">
              <Card className="h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border border-gray-500 rounded-lg p-6 shadow-xl hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-2xl font-bold drop-shadow-md">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-lg drop-shadow-sm">
                    {post.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
