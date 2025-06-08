import React from 'react';
import { siteConfig } from '../config/siteConfig';

const SpotifyEmbed: React.FC = () => (
    <section className="mt-10 w-full" aria-labelledby="spotify-playlist-title">
        <h2 id="spotify-playlist-title" className="sr-only">Playlist do Spotify</h2>
        <iframe style={{ borderRadius: '12px' }} src={siteConfig.spotifyPlaylist} width="100%" height="352" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Playlist do Spotify para Treino" />
    </section>
);

export default SpotifyEmbed;