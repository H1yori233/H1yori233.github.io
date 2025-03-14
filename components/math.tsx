'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export const InteractiveDice = () => {
  const [isRolling, setIsRolling] = useState(false)
  const [currentNumber, setCurrentNumber] = useState(1)

  const rollDice = () => {
    setIsRolling(true)
    setTimeout(() => {
      setCurrentNumber(Math.floor(Math.random() * 6) + 1)
      setIsRolling(false)
    }, 1000)
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="w-32 h-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
        animate={isRolling ? {
          rotate: [0, 360, 720, 1080],
          scale: [1, 1.2, 1],
        } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
        onClick={rollDice}
      >
        <span className="text-4xl font-bold text-amber-600">{currentNumber}</span>
      </motion.div>
    </div>
  )
} 