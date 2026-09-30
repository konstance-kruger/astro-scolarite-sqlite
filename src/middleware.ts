import { getSession } from 'auth-astro/server';

// Possibilité de passer des arguments, notamment locals,
// pour échanger des informations entre le middleware et l'application.
export async function onRequest(context: any, next: any) {
  // Ne pas vérifier la session sur les routes d'authentification
  if (context.url.pathname.startsWith('/api/auth/') || context.url.pathname === '/login') {
    return next();
  }

  try {
    const session = await getSession(context.request);

    if (!session) {
      return context.redirect('/login');
    }

    return next();
  } catch (error) {
    console.error('Erreur de session:', error);
    return context.redirect('/login');
  }
}