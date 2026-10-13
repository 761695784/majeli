import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MessageCircle } from 'lucide-react';

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await pb.collection('contacts').create(formData, { $autoCancel: false });
      toast.success('Message envoyé avec succès');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-foreground">
            Nom complet
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 text-foreground placeholder:text-muted-foreground"
            placeholder="Votre nom"
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 text-foreground placeholder:text-muted-foreground"
            placeholder="votre@email.com"
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="message" className="text-foreground">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="mt-2 text-foreground placeholder:text-muted-foreground"
            placeholder="Décrivez votre projet..."
          />
          {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 active:scale-[0.98]"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer le message'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou</span>
        </div>
      </div>

      <Button
        asChild
        variant="outline"
        className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200"
      >
        <a href="https://wa.me/221782634338" target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-5 w-5" />
          Discuter sur WhatsApp
        </a>
      </Button>
    </div>
  );
};

export default ContactForm;