interface SectionPersone {
  name: string;
  role: string;
  avatar: string;
}

// Создаем функцию, которая принимает функцию перевода и возвращает массив
export const createSectionsPersone = (t: (key: string) => string): SectionPersone[] => [
      {
        name: t("main.blocks.block-persone.names.employee-0"),
        role: t("main.blocks.block-persone.role.employee-0"),
        avatar: "av-0",
      },
      {
        name: t("main.blocks.block-persone.names.employee-1"),
        role: t("main.blocks.block-persone.role.employee-1"),
        avatar: "av-1",
      },
      {
        name: t("main.blocks.block-persone.names.employee-2"),
        role: t("main.blocks.block-persone.role.employee-2"),
        avatar: "av-2",
      },
      {
        name: t("main.blocks.block-persone.names.employee-3"),
        role: t("main.blocks.block-persone.role.employee-3"),
        avatar: "av-3",
      },
    ];

export type { SectionPersone };
