import Image from "next/image"

export default function Profile() {
  return (
    <section className="container mx-auto px-4 py-12 flex flex-col items-center">
      <div className="relative w-64 h-64 mb-6">
        <Image
          src="https://i.ibb.co/vjZ9Vdn/312274179-1122938305033194-1527207986464658693-n-removebg-preview.png"
          alt="Foto do profissional"
          layout="fill"
          objectFit="cover"
          className="rounded-full shadow-lg"
        />
      </div>
      <p className="text-xl text-center max-w-2xl text-gray-300">
        Com mais de 10 anos de experiência em Engenharia da Computação, tenho trabalhado em projetos inovadores e
        soluções tecnológicas de ponta para empresas de diversos setores.
      </p>
    </section>
  )
}

