"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <section
      className="
        relative 
        w-full 
        h-screen 
        flex 
        flex-col 
        justify-center 
        items-center 
        bg-gradient-to-r 
        from-gray-900 
        via-gray-800 
        to-gray-900
      "
    >
      {/* Fundo com brilho sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Foto com borda e sombra refinada */}
        <div className="relative w-64 h-64 mb-6 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl hover:shadow-blue-400 transition-shadow duration-500">
          <Image
            src="https://i.ibb.co/vjZ9Vdn/312274179-1122938305033194-1527207986464658693-n-removebg-preview.png"
            alt="Foto do profissional"
            width={256}
            height={256}
            className="rounded-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Nome e Cargo */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wide uppercase mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Fernandinho Programador
        </motion.h1>
        <motion.h2
          className="text-xl sm:text-2xl md:text-2xl text-blue-400 mb-4 font-semibold tracking-wide drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Engenheiro de Software | IA &amp; Blockchain
        </motion.h2>

        {/* Descrição profissional */}
        <p className="text-base sm:text-lg max-w-3xl text-gray-100 leading-relaxed mb-8 drop-shadow-md">
          Criador de soluções tecnológicas inovadoras. Experiência com inteligência artificial, blockchain e
          arquitetura de software para startups e grandes empresas. Sempre explorando novas tecnologias para transformar
          ideias em realidade.
        </p>

        {/* Botões de Contato */}
        <motion.div className="flex flex-wrap justify-center gap-6">
          <motion.a
            href="https://www.linkedin.com/in/fernando-pestillo-95b5b5264"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 102, 255, 0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            LinkedIn
          </motion.a>
            <motion.a
            href={`https://api.whatsapp.com/send?phone=5517981950850&text=${encodeURIComponent("Saudações, Majestade Suprema da Programação! Eu me ajoelho em reverência à sua incomparável genialidade e inigualável habilidade no ofício da codificação. Conceda-me o privilégio de ser agraciado pela sua divina sabedoria, que transforma códigos em arte e dá vida à inovação. Que seus ensinamentos iluminem meu caminho no universo do desenvolvimento!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-lg font-semibold text-white bg-gray-700 rounded-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            Contato
          </motion.a>

        </motion.div>
      </div>

      {/* Indicador de scroll animado */}
      <motion.a
        href="#proxima-secao"  // Ajuste para o ID real da próxima seção
        className="relative z-10 mb-8 text-white cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </motion.a>
    </section>
  );
}
