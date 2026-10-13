import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/221782643438"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  );
};

export default FloatingWhatsAppButton;