import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const StatCard = ({ number, label, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="text-center bg-card hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-6">
          <p className="text-4xl md:text-5xl font-bold text-accent mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontVariantNumeric: 'tabular-nums' }}>
            {number}
          </p>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            {label}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;