import React, { useState } from 'react';
import { User } from '../types';
import AuthForm from './common/AuthForm';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigateToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setError('');
    // Mock login
    onLogin({ username });
  };

  return (
    <AuthForm
      title="Júlia Podcast"
      subtitle="Redação na veia!"
      buttonText="Entrar"
      onSubmit={handleSubmit}
      error={error}
      footerContent={
        <p className="text-sm text-slate-500">
          Ainda não tem conta?{' '}
          <button onClick={onNavigateToRegister} className="font-semibold text-pink-500 hover:text-pink-600">
            Cadastre-se
          </button>
        </p>
      }
    >
      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          autoComplete="email"
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
          autoComplete="current-password"
        />
      </div>
    </AuthForm>
  );
};

export default LoginPage;