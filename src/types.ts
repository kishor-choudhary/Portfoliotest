export interface Project {
  id: string;
  title: string;
  description: string;
  extendedDescription?: string;
  github?: string;
  demoUrl?: string;
  tags: string[];
  image: string;
  status?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}
