import Header from "./components/Header"
import Profile from "./components/Profile"
import Stats from "./components/Stats"
import Blog from "./components/Blog"
import Pricing from "./components/Pricing"
import Rinha from "./components/rinha"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Profile />
      <Stats />
      <Blog />
      <Pricing />
      <Rinha />
    </main>
  )
}

