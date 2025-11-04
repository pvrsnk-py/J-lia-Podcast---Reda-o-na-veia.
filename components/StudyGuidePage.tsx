import React, { useState, useEffect, useCallback } from 'react';
import { ExamType, StudyGuide, ContentItem } from '../types';
import { getStudyGuide } from '../services/geminiService';
import Spinner from './common/Spinner';
import { VideoIcon, PodcastIcon, ArticleIcon } from './icons/ContentIcons';
import { ArrowLeftIcon } from './icons/HeroIcons';

interface StudyGuidePageProps {
  examType: ExamType;
  onBack: () => void;
}

const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => (
    <a 
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-pink-300 hover:bg-white/20 transition-all duration-300 group"
    >
      <h4 className="font-bold text-lg text-slate-100 group-hover:text-pink-300 transition-colors">{item.title}</h4>
      <p className="text-slate-300 mt-2 text-sm">{item.description}</p>
    </a>
);


const StudyGuidePage: React.FC<StudyGuidePageProps> = ({ examType, onBack }) => {
  const [studyGuide, setStudyGuide] = useState<StudyGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuide = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const guide = await getStudyGuide(examType);
      setStudyGuide(guide);
    } catch (err) {
      setError('Falha ao carregar o guia de estudos. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examType]);

  useEffect(() => {
    fetchGuide();
  }, [fetchGuide]);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack} 
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold">Guia de Estudos: <span className="text-pink-300">{examType}</span></h1>
          <p className="text-slate-200 mt-1">Recursos selecionados para turbinar sua preparação.</p>
        </div>
      </header>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Spinner />
        </div>
      )}

      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && studyGuide && (
        <div className="space-y-12">
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-slate-100">
              <VideoIcon className="w-8 h-8 text-pink-300" />
              Vídeos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyGuide.videos.map((item, index) => <ContentCard key={`video-${index}`} item={item} />)}
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-slate-100">
              <PodcastIcon className="w-8 h-8 text-pink-300" />
              Podcasts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyGuide.podcasts.map((item, index) => <ContentCard key={`podcast-${index}`} item={item} />)}
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-slate-100">
              <ArticleIcon className="w-8 h-8 text-pink-300" />
              Artigos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyGuide.articles.map((item, index) => <ContentCard key={`article-${index}`} item={item} />)}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default StudyGuidePage;