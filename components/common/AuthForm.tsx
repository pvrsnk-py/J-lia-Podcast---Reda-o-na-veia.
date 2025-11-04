import React from 'react';
import { BookOpenIcon } from '../icons/HeroIcons';
import { PodcastIcon } from '../icons/ContentIcons';

interface AuthFormProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  children: React.ReactNode;
  footerContent: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, subtitle, buttonText, onSubmit, error, children, footerContent }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        <div className="flex justify-center items-center gap-3 text-purple-600">
            <BookOpenIcon className="w-9 h-9"/>
            <PodcastIcon className="w-8 h-8"/>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
          <p className="mt-1 text-slate-500">{subtitle}</p>
        </div>
        <form className="mt-6 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            {children}
          </div>
          
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
            >
              {buttonText}
            </button>
          </div>
        </form>
         <div className="text-center text-sm">
          {footerContent}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;