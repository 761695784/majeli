import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceCard = ({ icon: Icon, title, description, features, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border">
        <CardHeader>
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <CardTitle className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {title}
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        {features && (
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
        <CardFooter className="mt-auto">
          <Button variant="ghost" className="group text-accent hover:text-accent/90 p-0">
            En savoir plus
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;