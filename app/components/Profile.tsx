"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      {/* Fundo aprimorado com brilho sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-95"></div>

      {/* Foto com efeito neon removido */}
      <div className="relative w-64 h-64 mb-6 rounded-full overflow-hidden border-[6px] border-blue-500 shadow-xl hover:shadow-blue-400 transition-shadow duration-500">
        <Image
          src="https://i.ibb.co/vjZ9Vdn/312274179-1122938305033194-1527207986464658693-n-removebg-preview.png"
          alt="Foto do profissional"
          width={256}
          height={256}
          className="rounded-full hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Nome e Cargo com alto contraste e responsivo */}
      <motion.h1
        className="
          text-4xl 
          sm:text-5xl 
          md:text-6xl
          font-extrabold 
          text-white 
          tracking-wide 
          uppercase 
          mb-2 
          drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]
        "
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Fernandinho Programador
      </motion.h1>
      <motion.h2
        className="
          text-xl
          sm:text-2xl
          md:text-2xl
          text-blue-400 
          mb-4 
          font-semibold 
          tracking-wide 
          drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]
        "
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Engenheiro de Software | IA & Blockchain
      </motion.h2>

      {/* Descrição Profissional aprimorada */}
      <p className="text-base sm:text-lg max-w-3xl text-gray-100 leading-relaxed mb-6 px-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
        Criador de soluções tecnológicas inovadoras. Experiência com inteligência artificial, blockchain e arquitetura
        de software para startups e grandes empresas. Sempre explorando novas tecnologias para transformar ideias em
        realidade.
      </p>

      {/* Botões de Contato aprimorados */}
      <motion.div className="flex flex-wrap justify-center gap-6">
        <motion.a
          href="https://www.linkedin.com/in/seu-perfil"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
          whileHover={{ scale: 1.15, boxShadow: "0px 0px 15px rgba(0, 102, 255, 0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          LinkedIn
        </motion.a>
        <motion.a
          href="mailto:seuemail@email.com"
          className="px-6 py-3 text-lg font-semibold text-white bg-gray-700 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
          whileHover={{ scale: 1.15, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          Contato
        </motion.a>
      </motion.div>
    </section>
  );
}
