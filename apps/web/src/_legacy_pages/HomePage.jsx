import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Code, TrendingUp, Target, Zap, Shield, Rocket, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const HomePage = () => {
  const services = [
    {
      icon: Sparkles,
      title: 'Branding et Identité Visuelle',
      description: 'Création de logos, chartes graphiques et identités visuelles fortes qui marquent les esprits.',
    },
    {
      icon: Code,
      title: 'Développement de site et Plateforme Web',
      description: 'Sites vitrines, e-commerce et applications web sur mesure, performants et sécurisés.',
    },
    {
      icon: TrendingUp,
      title: 'Transformation et stratégie digitale',
      description: 'Accompagnement stratégique pour digitaliser vos processus et accélérer votre croissance.',
    },
    {
      icon: Settings,
      title: "Création d'API",
      description: "Développement d'API REST personnalisées pour intégrations métier.",
    },
  ];

  const values = [
    {
      title: 'Stratégie',
      description: 'Une approche réfléchie pour des résultats durables.',
      color: 'bg-primary text-primary-foreground',
      icon: Target,
    },
    {
      title: 'Créativité',
      description: 'Des idées innovantes pour vous démarquer.',
      color: 'bg-accent text-accent-foreground',
      icon: Zap,
    },
    {
      title: 'Technologie',
      description: 'Les meilleurs outils au service de votre projet.',
      color: 'bg-secondary text-secondary-foreground',
      icon: Shield,
    },
    {
      title: 'Croissance',
      description: 'Un accompagnement vers le succès.',
      color: 'bg-background text-foreground border border-border',
      icon: Rocket,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Majeli Connect - L'agence qui donne vie à votre marque</title>
        <meta
          name="description"
          content="Majeli Connect vous accompagne dans votre transformation digitale, création de sites web, branding et stratégie sur mesure."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <section className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://horizons-cdn.hostinger.com/643fe87e-c220-49ef-848d-95ea0c5a57c5/72a25d2054122f3dd4cf5f50e489cd16.png"
                alt="Équipe Majeli Connect en réunion"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto container-padding text-center text-primary-foreground">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="mb-6 text-primary-foreground">
                  Propulsez votre marque dans l'ère digitale
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                  Des solutions innovantes et sur mesure pour transformer votre vision en réalité.
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

          <section className="section-spacing bg-background">
            <div className="max-w-7xl mx-auto container-padding">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="mb-4">Nos Services Clés</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Une expertise complète pour répondre à tous vos défis digitaux.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-border">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                          <service.icon className="h-6 w-6 text-accent" />
                        </div>
                        <CardTitle className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed mt-2">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-spacing bg-muted">
            <div className="max-w-7xl mx-auto container-padding">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="mb-6 text-primary">L'agence qui donne vie à votre marque</h2>
                  <h3 className="text-xl font-medium text-accent mb-6">
                    Notre conviction : chaque projet est unique.
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Chez Majeli Connect, nous allions créativité et stratégie pour concevoir des expériences digitales mémorables. Notre approche sur mesure garantit que chaque solution reflète parfaitement l'ADN de votre entreprise.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Nous ne sommes pas de simples prestataires, mais de véritables partenaires engagés dans votre réussite à long terme.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Link to="/about">En savoir plus sur nous</Link>
                  </Button>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`h-full ${value.color} border-none shadow-md`}>
                        <CardContent className="p-6">
                          <value.icon className="h-8 w-8 mb-4 opacity-80" />
                          <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {value.title}
                          </h4>
                          <p className="opacity-90 leading-relaxed">
                            {value.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
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

export default HomePage;