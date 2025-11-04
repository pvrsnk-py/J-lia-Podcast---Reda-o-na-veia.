
import { GoogleGenAI, Type } from "@google/genai";
import { ExamType, StudyGuide } from '../types';

const getPrompt = (examType: ExamType): string => {
  if (examType === ExamType.UFPR) {
    return `
      Create a study guide for the UFPR "redação" (essay exam).
      Focus on its specific model which is based on literary styles and analysis of specific books.
      The guide should be attractive to teenagers.
      Provide a list of 5 YouTube videos, 3 podcasts, and 5 articles.
      For each item, provide a title, a brief, engaging description, and a valid URL.
      Ensure the content explains how to analyze literary works and apply those styles to the essay.
    `;
  } else {
    return `
      Create a study guide for the ENEM "redação" (essay exam).
      The guide should be engaging for a teenage audience.
      Provide a list of 5 YouTube videos, 3 podcasts, and 5 articles.
      For each item, give a title, a short, interesting description, and a valid URL.
      The content should focus on writing techniques, structure (introduction, development, conclusion), argumentation, and the proposal for intervention.
    `;
  }
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    videos: {
      type: Type.ARRAY,
      description: "A list of helpful videos.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Title of the video." },
          description: { type: Type.STRING, description: "A brief summary of the video." },
          url: { type: Type.STRING, description: "A valid URL to the video." },
        },
        required: ["title", "description", "url"],
      },
    },
    podcasts: {
      type: Type.ARRAY,
      description: "A list of helpful podcasts.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Title of the podcast episode." },
          description: { type: Type.STRING, description: "A brief summary of the podcast." },
          url: { type: Type.STRING, description: "A valid URL to the podcast." },
        },
        required: ["title", "description", "url"],
      },
    },
    articles: {
      type: Type.ARRAY,
      description: "A list of helpful articles or blog posts.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Title of the article." },
          description: { type: Type.STRING, description: "A brief summary of the article." },
          url: { type: Type.STRING, description: "A valid URL to the article." },
        },
        required: ["title", "description", "url"],
      },
    },
  },
  required: ["videos", "podcasts", "articles"],
};

export const getStudyGuide = async (examType: ExamType): Promise<StudyGuide> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is not set.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: getPrompt(examType),
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    return parsedData as StudyGuide;

  } catch (error) {
    console.error("Error fetching study guide from Gemini API:", error);
    // Provide fallback data in case of an API error to ensure the app is still usable.
    return {
        videos: [{ title: 'Erro ao Carregar', description: 'Não foi possível carregar o conteúdo. Tente novamente mais tarde.', url: '#' }],
        podcasts: [],
        articles: [],
    };
  }
};
