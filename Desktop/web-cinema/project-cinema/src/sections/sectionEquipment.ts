interface SectionEquipment {
  image: string;
  title: string;
  description: string;
}

// Создаем функцию, которая принимает функцию перевода и возвращает массив
export const createSectionsEquipment = (t: (key: string) => string): SectionEquipment[] => [
      {
        title: t("main.blocks.block-equipment.equipments.item-0.title"),
        description: t("main.blocks.block-equipment.equipments.item-0.description"),
        image: "eq-0",
      },
      {
        title: t("main.blocks.block-equipment.equipments.item-1.title"),
        description: t("main.blocks.block-equipment.equipments.item-1.description"),
        image: "eq-1",
      },
      {
        title: t("main.blocks.block-equipment.equipments.item-2.title"),
        description: t("main.blocks.block-equipment.equipments.item-2.description"),
        image: "eq-2",
      },
      {
        title: t("main.blocks.block-equipment.equipments.item-3.title"),
        description: t("main.blocks.block-equipment.equipments.item-3.description"),
        image: "eq-3",
      },
      {
        title: t("main.blocks.block-equipment.equipments.item-4.title"),
        description: t("main.blocks.block-equipment.equipments.item-4.description"),
        image: "eq-4",
      },
      {
        title: t("main.blocks.block-equipment.equipments.item-5.title"),
        description: t("main.blocks.block-equipment.equipments.item-5.description"),
        image: "eq-5",
      },
      {
        title: t("main.blocks.block-equipment.equipments.item-6.title"),
        description: t("main.blocks.block-equipment.equipments.item-6.description"),
        image: "eq-6",
      },
      {
        title: t("main.blocks.block-equipment.equipments.item-7.title"),
        description: t("main.blocks.block-equipment.equipments.item-7.description"),
        image: "eq-7",
      },
    ];

export type { SectionEquipment };
