import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactForm from '@/components/ContactForm.jsx';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@majeliconnect.com',
      link: 'mailto:contact@majeliconnect.com',
    },
    {
      icon: Phone,
      title: 'Téléphone / WhatsApp',
      value: '+221 78 264 34 38',
      link: 'tel:+221782634338',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: 'Dakar, Liberté 5',
      link: null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Majeli Connect</title>
        <meta
          name="description"
          content="Contactez Majeli Connect pour discuter de votre projet de transformation digitale. Notre équipe est à votre écoute à Dakar."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <section className="relative min-h-[50dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="https://horizons-cdn.hostinger.com/643fe87e-c220-49ef-848d-95ea0c5a57c5/efbbcd56489ae34ecb8574dec7f829c2.png"
                alt="Bureau moderne Majeli Connect"
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
                <h1 className="mb-6 text-primary-foreground">Contactez-nous</h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed">
                  Discutons de votre projet et découvrez comment nous pouvons vous aider à atteindre vos objectifs.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="section-spacing bg-background">
            <div className="max-w-7xl mx-auto container-padding">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-8">
                    <h2 className="mb-4">Envoyez-nous un message</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Remplissez le formulaire ci-dessous ou contactez-nous directement sur WhatsApp.
                    </p>
                  </div>

                  <ContactForm />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Informations de contact
                    </h3>
                    <div className="space-y-4">
                      {contactInfo.map((info, index) => (
                        <Card key={index} className="hover:shadow-md transition-all duration-300 border-border">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <info.icon className="h-6 w-6 text-accent" />
                              </div>
                              <div>
                                <p className="font-medium text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                  {info.title}
                                </p>
                                {info.link ? (
                                  <a
                                    href={info.link}
                                    className="text-muted-foreground hover:text-accent transition-colors text-lg"
                                  >
                                    {info.value}
                                  </a>
                                ) : (
                                  <p className="text-muted-foreground text-lg">{info.value}</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;