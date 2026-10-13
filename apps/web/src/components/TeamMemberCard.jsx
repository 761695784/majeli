import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const TeamMemberCard = ({ image, name, role, bio, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {name}
          </h3>
          <p className="text-accent font-medium mb-3">{role}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamMemberCard;