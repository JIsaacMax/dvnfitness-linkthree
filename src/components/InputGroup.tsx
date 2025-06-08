interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> { icon: React.ReactNode; }

const InputGroup: React.FC<InputGroupProps> = ({ icon, ...props }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">{icon}</div>
        <input {...props} className="w-full p-3 pl-10 bg-gray-900 border-gray-700 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"/>
    </div>
);
export default InputGroup;