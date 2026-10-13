import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialCard = ({ name, company, text, rating, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full bg-card hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-6">
          <div className="flex mb-4">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6 italic">
            "{text}"
          </p>
          <div>
            <p className="font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {name}
            </p>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;