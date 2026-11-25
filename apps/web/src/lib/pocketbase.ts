import PocketBase from 'pocketbase';

const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(pbUrl);

// Désactiver l'auto-cancellation pour éviter les annulations intempestives sur requêtes multiples
pb.autoCancellation(false);

export default pb;
