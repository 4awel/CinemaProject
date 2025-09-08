interface SectionSerials {
  video: string;
  title: string;
  description: string;
}

import video1 from "../assets/video-block-1.mp4";
import video0 from "../assets/video-block-2.mov";

// Создаем функцию, которая принимает функцию перевода и возвращает массив
export const createSectionsSerials = (t: (key: string) => string): SectionSerials[] => [
  {
    video: video1,
    title: t("main.headers.header-serials.items.item-0.title"),
    description: t("main.headers.header-serials.items.item-0.title"),
  },
  {
    video: video0,
    title: t("main.headers.header-serials.items.item-1.title"),
    description: t("main.headers.header-serials.items.item-1.title"),
  },
  {
    video: video1,
    title: t("main.headers.header-serials.items.item-2.title"),
    description: t("main.headers.header-serials.items.item-2.title"),
  },
  {
    video: video0,
    title: t("main.headers.header-serials.items.item-2.title"),
    description: t("main.headers.header-serials.items.item-2.title"),
  },
];

export type { SectionSerials };
