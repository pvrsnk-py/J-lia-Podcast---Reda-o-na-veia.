import React from 'react';
import { User, ExamType } from '../types';
import { BookOpenIcon, PencilSquareIcon, ArrowRightOnRectangleIcon } from './icons/HeroIcons';

interface DashboardPageProps {
  user: User;
  onSelectExam: (exam: ExamType) => void;
  onLogout: () => void;
}

const ExamCard: React.FC<{ title: string; description: string; onClick: () => void; icon: React.ReactNode; className: string }> = ({ title, description, onClick, icon, className }) => (
  <button
    onClick={onClick}
    className={`relative group overflow-hidden w-full md:w-80 h-96 p-8 rounded-2xl flex flex-col justify-end text-left transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    <div className="relative z-10">
      <div className="mb-4 text-white">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-200 group-hover:opacity-100 opacity-90 transition-opacity">{description}</p>
    </div>
  </button>
);

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onSelectExam, onLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
       <header className="w-full max-w-4xl flex justify-between items-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
          Olá, <span className="text-pink-300">{user.username}</span>!
        </h1>
        <button onClick={onLogout} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200">
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
          <span className="hidden md:inline">Sair</span>
        </button>
      </header>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-white">Qual prova você quer gabaritar?</h2>
        <p className="text-lg text-slate-200 max-w-2xl mx-auto">Selecione uma opção para começar a sua preparação com materiais selecionados por IA.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <ExamCard
          title="UFPR"
          description="Domine a prova com foco em estilos literários e análises aprofundadas."
          onClick={() => onSelectExam(ExamType.UFPR)}
          icon={<BookOpenIcon className="w-12 h-12" />}
          className="bg-gradient-to-br from-purple-500 to-fuchsia-500 focus:ring-fuchsia-300"
        />
        <ExamCard
          title="ENEM"
          description="Prepare-se com técnicas de argumentação e propostas de intervenção."
          onClick={() => onSelectExam(ExamType.ENEM)}
          icon={<PencilSquareIcon className="w-12 h-12" />}
          className="bg-gradient-to-br from-pink-500 to-rose-500 focus:ring-rose-300"
        />
      </div>
    </div>
  );
};

export default DashboardPage;