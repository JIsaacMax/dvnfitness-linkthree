import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import ModalReserva from '../components/ModalReserva';
import FeedbackModal from '../components/FeedbackModal';

interface Reserva { id: number; quadraId: string; data: string; horario: string; nome: string; email?: string; whatsapp?: string; obs?: string; }
interface ReservaForm { quadra: string; data: string; horario: string; horarioInicio: string; horarioFim: string; }
interface FeedbackState { title: string; message: string; icon: React.ReactNode | null; }

const ReservaQuadraPage: React.FC = () => {
    const navigate = useNavigate();
    const quadras = [{ id: 'futebol', nome: 'Futebol Society' }, { id: 'volei', nome: 'Vôlei de Areia' }, { id: 'tenis', nome: 'Tênis' }];
    const horarios = useMemo(() => Array.from({ length: 15 }, (_, i) => `${i + 8}:00`), []);
    const [reservas, setReservas] = useState<Reserva[]>([
        { id: 1, quadraId: 'futebol', data: '2025-06-08', horario: '18:00', nome: 'Time A' },
        { id: 2, quadraId: 'volei', data: '2025-06-08', horario: '19:00', nome: 'Dupla B' },
        { id: 3, quadraId: 'futebol', data: '2025-06-08', horario: '20:00', nome: 'Time C' },
    ]);
    const [form, setForm] = useState<ReservaForm>({ quadra: 'futebol', data: '2025-06-08', horario: '', horarioInicio: '', horarioFim: '' });
    const [showReservaModal, setShowReservaModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackState>({ title: '', message: '', icon: null });

    const horariosOcupados = useMemo(() => {
        return reservas.filter(r => r.quadraId === form.quadra && r.data === form.data).map(r => r.horario);
    }, [reservas, form.quadra, form.data]);

    const handleCheckAvailability = () => {
        if (!form.horario) { setFeedback({ title: 'Ops!', message: 'Por favor, selecione um horário para continuar.', icon: null }); setShowFeedbackModal(true); return; }
        if (horariosOcupados.includes(form.horario)) {
            const horariosDisponiveis = horarios.filter(h => !horariosOcupados.includes(h));
            if (horariosDisponiveis.length === 0) { setFeedback({ title: 'Dia Cheio!', message: 'Todos os horários para esta quadra e data estão ocupados.', icon: <Clock size={48} className="text-yellow-400 vibrating-icon" /> }); }
            else { const sugestao = horariosDisponiveis.find(h => horarios.indexOf(h) > horarios.indexOf(form.horario)) || horariosDisponiveis[0]; setFeedback({ title: 'Horário Ocupado', message: `Que tal reservar às ${sugestao}? É o horário livre mais próximo.`, icon: <Clock size={48} className="text-blue-400" /> }); }
            setShowFeedbackModal(true);
        } else { setShowReservaModal(true); }
    };

    const handleFinalizeReservation = (details: Omit<Reserva, 'id' | 'quadraId' | 'data' | 'horario'>) => {
        const novaReserva: Reserva = { id: Date.now(), quadraId: form.quadra, data: form.data, horario: form.horario, ...details };
        setReservas(prev => [...prev, novaReserva]);
        setShowReservaModal(false);
        setFeedback({ title: 'Sucesso!', message: `Sua reserva para ${form.horario} está pendente. Entraremos em contato!`, icon: <ShieldCheck size={48} className="text-green-500" /> });
        setShowFeedbackModal(true);
        setForm(prev => ({ ...prev, horario: '' }));
    };

    return (
        <div className="w-full h-full max-w-4xl mx-auto px-4">
            {showReservaModal && <ModalReserva onSubmit={handleFinalizeReservation} onClose={() => setShowReservaModal(false)} />}
            {showFeedbackModal && <FeedbackModal {...feedback} onClose={() => setShowFeedbackModal(false)} />}
            <div className="relative sm:h-80 w-full h-full mb-20 rounded-b-3xl overflow-visible">
                <img className="absolute inset-0 w-full h-full object-cover rounded-b-3xl"
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" alt="Quadra de esportes" />
                <div className="absolute inset-0 bg-black/50 rounded-b-3xl"></div>
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-green-500 flex items-center justify-center p-1">
                        <img src={siteConfig.logo} alt={siteConfig.altLogo} className="rounded-full w-full h-full object-cover" />
                    </div>
                </div>
                <button onClick={() => navigate('/')} className="absolute top-4 left-4 bg-black/30 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/50"> <ArrowLeft size={24} /> </button>
            </div>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-white">Reserva de Quadra</h1>
                <p className="text-gray-400">Agende seu horário de forma rápida e fácil.</p>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                    <p><strong className="text-green-400">{reservas.length}</strong> Reservas Ativas</p>
                    <p><strong className="text-green-400">2</strong> Torneios Agendados</p>
                </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label htmlFor="quadra" className="block text-sm font-medium text-gray-300 mb-1">Esporte</label>
                        <select
                            id="quadra"
                            value={form.quadra}
                            onChange={e => setForm({ ...form, quadra: e.target.value })}
                            className="w-full p-3 bg-gray-900 border-gray-700 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                            {quadras.map(q => <option key={q.id} value={q.id}>{q.nome}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="data" className="block text-sm font-medium text-gray-300 mb-1">Data</label>
                        <input
                            type="date"
                            id="data"
                            value={form.data}
                            onChange={e => setForm({ ...form, data: e.target.value })}
                            className="w-full h-3/5 p-3 bg-gray-900 border-gray-700 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="horarioInicio" className="block text-sm font-medium text-gray-300 mb-1">Horário Início</label>
                        <select
                            id="horarioInicio"
                            value={form.horarioInicio}
                            onChange={e => setForm({ ...form, horarioInicio: e.target.value })}
                            className="w-full p-3 bg-gray-900 border-gray-700 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                            <option value="">Selecione</option>
                            {horarios.map(h => (
                                <option key={h} value={h} disabled={horariosOcupados.includes(h)}>
                                    {h}{horariosOcupados.includes(h) ? ' (Ocupado)' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="horarioFim" className="block text-sm font-medium text-gray-300 mb-1">Horário Final</label>
                        <select
                            id="horarioFim"
                            value={form.horarioFim}
                            onChange={e => {
                                const novoHorarioFim = e.target.value;
                                if (novoHorarioFim && form.horarioInicio && novoHorarioFim < form.horarioInicio) {
                                    alert('O horário final não pode ser menor que o horário de início.');
                                } else {
                                    setForm({ ...form, horarioFim: novoHorarioFim });
                                }
                            }}
                            className="w-full p-3 bg-gray-900 border-gray-700 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                            <option value="">Selecione</option>
                            {horarios.map(h => (
                                <option key={h} value={h} disabled={horariosOcupados.includes(h)}>
                                    {h}{horariosOcupados.includes(h) ? ' (Ocupado)' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button onClick={handleCheckAvailability} className="w-full bg-green-500 text-white font-bold p-4 rounded-lg hover:bg-green-600 transition-colors">Verificar Disponibilidade</button>
            </div>
        </div>
    );
};

export default ReservaQuadraPage;