import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const ParticlesBackground = ({ className = '', dense = false }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const options = useMemo(
    () => ({
      background: {
        color: 'transparent',
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.15,
            },
          },
        },
      },
      particles: {
        color: {
          value: ['#00f5ff', '#7c3aed'],
        },
        links: {
          color: '#00f5ff',
          distance: 120,
          enable: true,
          opacity: 0.12,
          width: 1,
        },
        move: {
          enable: true,
          speed: dense ? 1.2 : 0.8,
          direction: 'none',
          outModes: {
            default: 'out',
          },
        },
        number: {
          density: {
            enable: true,
          },
          value: dense ? 80 : 45,
        },
        opacity: {
          value: 0.55,
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [dense],
  )

  if (!ready) {
    return null
  }

  return <Particles className={`absolute inset-0 -z-10 ${className}`} options={options} />
}

export default ParticlesBackground
