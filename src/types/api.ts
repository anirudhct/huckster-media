export type TContactForm = {
  email: string;
  name: string;
  phone: string;
  companyName?: string;
  role?: string;
  message: string;
};

export type TCareers = {
  email: string;
  name: string;
  phone: string;
  desiredPosition: string;
  linkedin: string;
  resume: string;
  coverLetter?: string;
};

export type TBlog = {
  _id: string;
  slug: string;
  image: string;
  title: string;
  category: string;
  wordsBy: string;
  description: string;
  date: string;
  featured: boolean;
  publish: boolean;
};

export type TWork = {
  _id: string;
  slug: string;
  image: string;
  title: string;
  description: string;
  shortVideo: string;
  video: string;
  tension: string;
  shift: string;
  proof: string;
  order: number;
  featured: boolean;
  publish: boolean;
};
