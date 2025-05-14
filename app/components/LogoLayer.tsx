'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LogoLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Top Left */}
      <motion.div 
        className="absolute top-8 left-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Image
          src="/images/logo-big.svg"
          alt="Logo"
          width={100}
          height={100}
          className="opacity-20"
        />
      </motion.div>

      {/* Top Right */}
      <motion.div 
        className="absolute top-8 right-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Image
          src="/images/wordmark-horizontal.svg"
          alt="Wordmark"
          width={200}
          height={50}
          className="opacity-20"
        />
      </motion.div>

      {/* Bottom Left */}
      <motion.div 
        className="absolute bottom-8 left-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Image
          src="/images/flower-big.svg"
          alt="Flower"
          width={150}
          height={150}
          className="opacity-20"
        />
      </motion.div>

      {/* Bottom Right */}
      <motion.div 
        className="absolute bottom-8 right-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <Image
          src="/images/tiny-lockup.svg"
          alt="Lockup"
          width={120}
          height={120}
          className="opacity-20"
        />
      </motion.div>

      {/* Center */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={200}
          height={200}
          className="opacity-20"
        />
      </motion.div>
    </div>
  );
} 