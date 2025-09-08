interface SectionStuidio {
    title: string,
    descriprion: string,
    image: string
}

export const createSectionsStudio = (t: (key: string) => string): SectionStuidio[] => {
    return [
      {
        title: t("main.blocks.block-studio.under-block-info.item-0.title"),
        descriprion: t("main.blocks.block-studio.under-block-info.item-0.description"),
        image: "img-studio-0",
      },
      {
        title: t("main.blocks.block-studio.under-block-info.item-1.title"),
        descriprion: t("main.blocks.block-studio.under-block-info.item-1.description"),
        image: "img-studio-1",
      },
      {
        title: t("main.blocks.block-studio.under-block-info.item-2.title"),
        descriprion: t("main.blocks.block-studio.under-block-info.item-2.description"),
        image: "img-studio-2",
      },
    ];
};

export type { SectionStuidio };