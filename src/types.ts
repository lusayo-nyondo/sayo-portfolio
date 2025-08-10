export type Project = {
  id: string;
  title: string;
  description: string;
  url?: string;
  repoUrl?: string;
  categories: string[];
  technologies: string[];
  libraries?: string[];
  highlights?: string[];
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  description?: string;
  categories: string[];
  technologies: string[];
  highlights?: string[];
  url?: string;
};

export type Publication = {
  id: string;
  type: "youtube" | "article";
  title: string;
  url: string;
  date?: string;
  platform?: string;
  brief?: string;
};
