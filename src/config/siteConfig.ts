export interface SiteConfig {
  title: string;
  url: string;
  logo: string;
  altLogo: string;
  links: {
    whatsapp: string;
    instagram: string;
    googleMaps: string;
    matricula: string;
  };
  spotifyPlaylist: string;
}

export const siteConfig: SiteConfig = {
  title: "DVN Fitness - Conecte-se com a gente!",
  url: "https://dvnfitness.exemplo.com",
  logo: "assets/logo1.jpg",
  altLogo: "Logo da DVN Fitness",
  links: {
    whatsapp: "https://wa.me/5532999999999",
    instagram: "https://instagram.com/dvnfitness",
    googleMaps: "https://maps.app.goo.gl/EuvPwCFKf2SS3n7L9",
    matricula: "#",
  },
  spotifyPlaylist: "https://open.spotify.com/embed/playlist/6HVeRTF7RTj7DOienrFkEm?utm_source=generator",
};