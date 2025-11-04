import React, { useState } from 'react';
import { User } from '../types';
import AuthForm from './common/AuthForm';

interface RegisterPageProps {
  onRegister: (user: User) => void;
  onNavigateToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onNavigateToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setError('');
    // Mock registration
    onRegister({ username });
  };

  return (
    <AuthForm
      title="Crie sua conta"
      subtitle="Comece sua jornada de estudos hoje mesmo."
      buttonText="Cadastrar"
      onSubmit={handleSubmit}
      error={error}
      footerContent={
        <p className="text-sm text-slate-500">
          Já tem uma conta?{' '}
          <button onClick={onNavigateToLogin} className="font-semibold text-pink-500 hover:text-pink-600">
            Faça login
          </button>
        </p>
      }
    >
      <div>
        <label htmlFor="username" className="text-sm font-medium text-slate-700">Nome de usuário</label>
         <input
          id="username"
          type="text"
          placeholder="Júlia Silveira"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />
      </div>
      <div>
        <label htmlFor="password"className="text-sm font-medium text-slate-700">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />
      </div>
      <div>
        <label htmlFor="confirm-password"className="text-sm font-medium text-slate-700">Confirme a senha</label>
        <input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />
      </div>
    </AuthForm>
  );
};

export default RegisterPage;