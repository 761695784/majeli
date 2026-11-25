import PocketBase from 'pocketbase';

/**
 * Client PocketBase réservé au serveur (routes API Next.js).
 *
 * Une nouvelle instance est créée à chaque requête : l'authentification
 * superuser ne doit jamais être partagée entre deux visiteurs, ce qui
 * arriverait avec une instance unique (singleton) gardée en mémoire.
 */
function getPocketBaseUrl(): string {
  return (
    process.env.POCKETBASE_URL ||
    process.env.NEXT_PUBLIC_POCKETBASE_URL ||
    'http://127.0.0.1:8090'
  );
}

export class AdminConfigError extends Error {
  constructor() {
    super(
      'PB_SUPERUSER_EMAIL et PB_SUPERUSER_PASSWORD doivent être définis dans les variables d’environnement du serveur.'
    );
    this.name = 'AdminConfigError';
  }
}

/** Instance PocketBase authentifiée en superuser (identifiants lus dans l'environnement, jamais dans le code). */
export async function createAdminPb(): Promise<PocketBase> {
  const email = process.env.PB_SUPERUSER_EMAIL;
  const password = process.env.PB_SUPERUSER_PASSWORD;
  if (!email || !password) {
    throw new AdminConfigError();
  }

  const pb = new PocketBase(getPocketBaseUrl());
  pb.autoCancellation(false);
  await pb.collection('_superusers').authWithPassword(email, password);
  return pb;
}
