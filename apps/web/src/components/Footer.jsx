import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <span className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Majeli Connect
              </span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Votre partenaire de confiance pour la transformation digitale et la croissance de votre entreprise.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Liens rapides
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@majeliconnect.com" className="hover:text-primary-foreground transition-colors">
                  contact@majeliconnect.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <a href="tel:+221782643438" className="hover:text-primary-foreground transition-colors">
                  +221 78 264 34 38
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>Dakar, Liberté 5</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/80">
            © 2026 Majeli Connect. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;