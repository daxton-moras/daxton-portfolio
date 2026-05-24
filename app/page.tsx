import ParticlesCanvas from '@/components/particles-canvas'
import SectionRail from '@/components/section-rail'
import Hero from '@/components/hero'
import About from '@/components/about'
import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Career from '@/components/career'
import Contact from '@/components/contact'

export default function HomePage() {
  return (
    <div className="site-shell">
      <div className="grain-layer" />
      <ParticlesCanvas />
      <SectionRail />

      <main className="main-column">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Career />
        <Contact />
      </main>
    </div>
  )
}