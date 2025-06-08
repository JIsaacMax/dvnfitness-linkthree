import React from 'react';
import { X } from 'lucide-react';
import { SocialIcons } from './SocialIcons';
interface ShareModalProps { url: string; title: string; onClose: () => void; }

const ShareModal: React.FC<ShareModalProps> = ({ url, title, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-gray-800 rounded-2xl p-6 w-11/12 max-w-sm border border-gray-600 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6"> <h3 className="text-xl font-bold text-white">Compartilhar</h3> <button onClick={onClose} aria-label="Fechar modal" className="text-gray-400 hover:text-white"><X size={28} /></button> </div>
            <div className="flex justify-center space-x-6 mb-6"> <SocialIcons.Whatsapp url={url} title={title} /><SocialIcons.Telegram url={url} title={title} /> </div>
            <div className="relative"> <input type="text" value={url} readOnly aria-label="Link da página" className="w-full bg-gray-900 border-2 border-gray-600 rounded-lg p-3 pr-20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"/> <button onClick={() => navigator.clipboard.writeText(url)} className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-600">Copiar</button> </div>
        </div>
    </div>
);

export default ShareModal;