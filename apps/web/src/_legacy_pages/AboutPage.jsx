import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Award, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const AboutPage = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Nous restons à la pointe des technologies pour offrir des solutions modernes et performantes.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque projet, avec un souci constant de la qualité.',
    },
    {
      icon: Users,
      title: 'Partenariat',
      description: 'Nous construisons des relations durables basées sur la confiance et la transparence.',
    },
    {
      icon: TrendingUp,
      title: 'Résultats',
      description: 'Nous nous engageons à délivrer des résultats concrets et mesurables pour votre entreprise.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>À propos - Majeli Connect</title>
        <meta
          name="description"
          content="Découvrez Majeli Connect, votre partenaire de confiance pour la transformation digitale. Notre mission et nos valeurs."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <section className="relative min-h-[60dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://horizons-cdn.hostinger.com/643fe87e-c220-49ef-848d-95ea0c5a57c5/31b30863d141f7bd88c1526628becdcd.png"
                alt="Équipe Majeli Connect"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-secondary/90" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto container-padding text-center text-primary-foreground">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="mb-6 text-primary-foreground">À propos de nous</h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed">
                  Votre partenaire de confiance pour la transformation digitale et la croissance de votre entreprise.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="section-spacing bg-background">
            <div className="max-w-7xl mx-auto container-padding">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="mb-8">Notre Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Chez Majeli Connect, nous croyons que chaque entreprise mérite d'avoir accès aux meilleures solutions digitales pour prospérer dans l'économie moderne.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Notre mission est d'accompagner les entreprises dans leur transformation digitale en proposant des solutions innovantes, personnalisées et orientées résultats.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Nous combinons expertise technique, vision stratégique et approche humaine pour créer de la valeur durable pour nos clients.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="section-spacing bg-muted">
            <div className="max-w-7xl mx-auto container-padding">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="mb-4">Nos Valeurs</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Les principes qui guident notre travail et nos relations avec nos clients.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                      <CardContent className="pt-8 pb-6">
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                          <value.icon className="h-8 w-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-spacing bg-muted">
            <div className="max-w-4xl mx-auto container-padding text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-6">Travaillons ensemble</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Prêt à transformer votre entreprise ? Contactez-nous pour discuter de votre projet.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 transition-all duration-200 active:scale-[0.98]"
                >
                  <Link to="/contact">Démarrer un projet</Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;