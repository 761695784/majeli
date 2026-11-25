export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  projectSlug?: string;
  location: string;
}

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: "2",
    name: "Fourmose Corréa",
    role: "Gérant",
    company: "Résidence Good House",
    content: "Depuis la mise en ligne de notre site officiel residencegoodhouse.com, nous recevons des demandes de séjours directes sans passer systématiquement par les commissions exorbitantes des intermédiaires. Le design reflète parfaitement le confort de nos meublés aux Almadies.",
    rating: 5,
    projectSlug: "residence-good-house",
    location: "Ngor Almadies, Dakar",
  },
  {
    id: "3",
    name: "Toumany Badiane",
    role: "Président Fondateur",
    company: "Casa Impact",
    content: "L'équipe de Majeli Connect a fait preuve d'une écoute remarquable face à nos contraintes associatives territoriales. Notre portail casaimpact.org est moderne, accessible même sur les téléphones modestes et fédère aujourd'hui nos bénévoles à travers toute la région.",
    rating: 5,
    projectSlug: "casa-impact",
    location: "Ziguinchor & Dakar",
  },
  {
    id: "4",
    name: "Aïssatou Leye",
    role: "CEO",
    company: "Teranga Box Dakar",
    content: "L'assistant IA de suggestion de coffrets cadeaux et le configurateur sur-mesure ont métamorphosé notre tunnel de vente. Nos clients choisissent rapidement et règlent avec Wave ou Orange Money en quelques clics sans friction.",
    rating: 5,
    projectSlug: "teranga-box",
    location: "Dakar",
  },
];
