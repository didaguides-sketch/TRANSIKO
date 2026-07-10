/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // NOTE: experimental.typedRoutes est désactivé pour l'instant : il exige que
  // chaque route utilisée dans un <Link> existe déjà dans app/. Beaucoup de
  // routes (vente, location, projets, blog, estimation...) seront créées dans
  // les phases suivantes. Réactiver ce flag une fois toutes les pages en place.
};

export default nextConfig;
