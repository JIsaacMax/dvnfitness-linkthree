interface FeedbackModalProps { title: string; message: string; icon?: React.ReactNode; onClose: () => void; }

const FeedbackModal: React.FC<FeedbackModalProps> = ({ title, message, icon, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4" onClick={onClose}>
        <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-sm border border-gray-600 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
            {icon && <div className="mx-auto mb-4">{icon}</div>}
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300 mb-6">{message}</p>
            <button onClick={onClose} className="w-full bg-green-500 text-white font-bold p-3 rounded-lg hover:bg-green-600 transition-colors">Entendido</button>
        </div>
    </div>
);
export default FeedbackModal;