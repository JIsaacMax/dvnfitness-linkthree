import React, { useState } from 'react';
import { User, Smartphone, Mail, Send } from 'lucide-react';
import InputGroup from './InputGroup';
interface ModalReservaProps { onSubmit: (details: { nome: string; email: string; whatsapp: string; obs: string; }) => void; onClose: () => void; }
interface DetailsState { nome: string; email: string; whatsapp: string; obs: string; }

const ModalReserva: React.FC<ModalReservaProps> = ({ onSubmit, onClose }) => {
    const [details, setDetails] = useState<DetailsState>({ nome: '', email: '', whatsapp: '', obs: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setDetails(prev => ({ ...prev, [e.target.name]: e.target.value })); };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); if (details.nome && details.whatsapp) onSubmit(details); };
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-600 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-white mb-4">Finalizar Reserva</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputGroup icon={<User />} name="nome" value={details.nome} onChange={handleChange} placeholder="Seu nome completo" required />
                    <InputGroup icon={<Smartphone />} name="whatsapp" value={details.whatsapp} onChange={handleChange} placeholder="WhatsApp para contato" required />
                    <InputGroup icon={<Mail />} name="email" value={details.email} onChange={handleChange} type="email" placeholder="E-mail (opcional)" />
                    <textarea name="obs" value={details.obs} onChange={handleChange} placeholder="Observações (opcional)" className="w-full p-3 bg-gray-900 border-gray-700 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none h-24"></textarea>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold p-4 rounded-lg hover:bg-green-600 transition-colors">Confirmar Reserva <Send size={18}/></button>
                </form>
            </div>
        </div>
    );
};
export default ModalReserva;