import { motion } from 'motion/react'

// Tirai gelap yang terangkat setiap kali pindah halaman (key = pathname di App.jsx)
const Curtain = () => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
    className="pointer-events-none fixed inset-0 z-[100] bg-ink"
  />
)

export default Curtain
