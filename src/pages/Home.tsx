import React, { useState } from 'react';
import { Instagram, MessageCircle, MapPin, Share2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import LogoHeader from '../components/LogoHeader';
import LinkButton from '../components/LinkButton';
import SpotifyEmbed from '../components/SpotifyEmbed';
import ShareModal from '../components/ShareModal';

const HomePage: React.FC = () => {
    const [showShareModal, setShowShareModal] = useState(false);
    const handleShare = async () => {
        if (navigator.share) { try { await navigator.share({ title: siteConfig.title, text: 'Confira nossos links!', url: siteConfig.url }); } catch (error) { console.error('Erro:', error); } } 
        else { setShowShareModal(true); }
    };
    return (
        <div className="w-full max-w-md mx-auto px-4">
            <button onClick={handleShare} aria-label="Compartilhar página" className="fixed top-4 right-4 z-20 bg-gray-700/60 p-3 rounded-full text-white border-2 border-gray-500 backdrop-blur-sm hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400/50"> <Share2 size={24} /> </button>
            {showShareModal && <ShareModal url={siteConfig.url} title={siteConfig.title} onClose={() => setShowShareModal(false)} />}
            <LogoHeader />
            <section className="w-full">
                <nav aria-label="Links principais">
                    <ul className="space-y-4">
                        <li><LinkButton href={siteConfig.links.matricula} text="MATRICULE-SE" isPrimary /></li>
                        <li><LinkButton href={siteConfig.links.whatsapp} icon={<MessageCircle />} text="WhatsApp" /></li>
                        <li><LinkButton href={siteConfig.links.instagram} icon={<Instagram />} text="Instagram" /></li>
                        <li><LinkButton href={siteConfig.links.whatsappGroup} icon={<MessageCircle />} text="Grupo do WhatsApp" /></li>
                        <li><LinkButton href={siteConfig.links.googleMaps} icon={<MapPin />} text="Como chegar!" /></li>
                        <li><LinkButton to="/reserva" text="Reservar Quadra" /></li>
                    </ul>
                </nav>
            </section>
            <SpotifyEmbed />
        </div>
    );
};

export default HomePage;