import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Smartphone, PenTool, Settings, Users, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const ServicesPage = () => {
  const services = [
    {
      icon: Palette,
      title: 'Branding',
      description: 'Création d\'une identité visuelle forte et cohérente pour votre marque.',
      features: ['Création de Logo', 'Charte graphique complète', 'Identité visuelle', 'Supports de communication'],
    },
    {
      icon: Users,
      title: 'Community Management',
      description: 'Gestion et animation de vos communautés sur les réseaux sociaux.',
      features: ['Animation réseaux sociaux', 'Création de contenu engageant', 'Modération', 'Reporting des performances'],
    },
    {
      icon: PenTool,
      title: 'Design UI/UX',
      description: 'Conception d\'interfaces utilisateur esthétiques et d\'expériences fluides.',
      features: ['Maquettes Figma', 'Prototypage interactif', 'Tests utilisateurs', 'Création de Design System'],
    },
    {
      icon: Code,
      title: 'Développement Web',
      description: 'Création de sites web performants et évolutifs utilisant les dernières technologies.',
      features: ['React / Next.js', 'Laravel / Angular', 'Django / Vue.js', 'WordPress / SEO optimisé'],
    },
    {
      icon: Settings,
      title: "Création d'API",
      description: "Développement d'API REST personnalisées pour intégrations métier.",
      features: ['API REST', 'Intégrations', 'Base de données', 'Maintenance'],
    },
    {
      icon: Smartphone,
      title: 'Applications Mobile',
      description: 'Développement d\'applications mobiles natives et cross-platform intuitives.',
      features: ['React Native', 'UI/UX Design', 'Déploiement App Store & Play Store', 'Maintenance'],
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nos Services - Majeli Connect</title>
        <meta
          name="description"
          content="Découvrez l'ensemble de nos services : Branding, Community Management, Design UI/UX, Développement Web, Création d'API, Applications Mobiles."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <section className="relative min-h-[60dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1607615896122-6c919f897e55"
                alt="Équipe travaillant sur des projets digitaux"
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
                <h1 className="mb-6 text-primary-foreground">Notre Expertise</h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed">
                  Des solutions digitales complètes et sur mesure pour accompagner votre croissance à chaque étape.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="section-spacing bg-background">
            <div className="max-w-7xl mx-auto container-padding">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-border group">
                      <CardHeader>
                        <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                          <service.icon className="h-7 w-7 text-accent group-hover:text-accent-foreground" />
                        </div>
                        <CardTitle className="text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <ul className="space-y-3 mt-4">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-3 text-sm text-muted-foreground">
                              <span className="text-accent mt-0.5 font-bold">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
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
                <h2 className="mb-6">Un projet en tête ?</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Contactez-nous pour discuter de vos besoins spécifiques. Notre équipe d'experts est prête à relever vos défis.
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

export default ServicesPage;