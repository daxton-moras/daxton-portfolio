import ParticlesCanvas from '@/components/particles-canvas'
import CustomCursor from '@/components/custom-cursor'
import PointerEffects from '@/components/pointer-effects'
import ScrollProgress from '@/components/scroll-progress'
import SectionRail from '@/components/section-rail'
import Hero from '@/components/hero'
import About from '@/components/about'
import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Career from '@/components/career'
import Credentials from '@/components/credentials'
import Contact from '@/components/contact'

export default function HomePage() {
  return (
    <div className="site-shell">
      <div className="grain-layer" aria-hidden="true" />
      <ParticlesCanvas />
      <ScrollProgress />
      <SectionRail />
      <CustomCursor />
      <PointerEffects />

      <main className="main-column">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Career />
        <Credentials />
        <Contact />
      </main>
    </div>
  )
}
