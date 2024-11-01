import { motion } from 'framer-motion'
import React from 'react'
import './ApBar.css'
import AudioVisual from '../AudioVisual'

function Apbar({isOpen, audioPlayer}) {
  return (
    <div className='ApBar'>
      <div className="apbarcontent">
        <motion.div
          className="panel"
          initial={{ x: "15rem" }}
          animate={{ x: isOpen ? 0 : "15rem" }}
          transition={{ duration: 0.3 }}
        >
          <AudioVisual />
        </motion.div>
      </div>
    </div>
  )
}

export default Apbar