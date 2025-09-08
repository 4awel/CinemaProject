interface Section {
  video: string;
  titleSpeed: string;
  contentSpeed: string;
  title: string;
  description: string;
}

import video1 from "../assets/video-block-1.mp4";
import video0 from "../assets/video-block-2.mov";

// Создаем функцию, которая принимает функцию перевода и возвращает массив
export const createSections = (t: (key: string) => string): Section[] => [
  {
    video: video1,
    title: t("main.headers.header-films.items.item-0.title"),
    titleSpeed: "0 -200",
    contentSpeed: "-200 0",
    description: t("main.headers.header-films.items.item-0.description"),
  },
  {
    video: video0,
    title: t("main.headers.header-films.items.item-1.title"),
    titleSpeed: "0 -200",
    contentSpeed: "-200 0",
    description: t("main.headers.header-films.items.item-1.description"),
  },
  {
    video: video1,
    title: t("main.headers.header-films.items.item-2.title"),
    titleSpeed: "0 -200",
    contentSpeed: "0 0",
    description: t("main.headers.header-films.items.item-2.description"),
  },
  {
    video: video0,
    title: t("main.headers.header-films.items.item-3.title"),
    titleSpeed: "0 200",
    contentSpeed: "-200 0",
    description: t("main.headers.header-films.items.item-3.description"),
  },
];

export type { Section };