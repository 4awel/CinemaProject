<template>
  <div class="container-about">
    <h1>{{ $t('main.headers.header-about.title') }}</h1>
    <div class="block-worker">
      <h3 class="header-worker">{{ $t("main.blocks.block-persone.title") }}</h3>
      <div v-for="(p, index) in persone" :key="index" class="persone">
        <img src="`../../assets/s01.jpg`" alt="..." id="avatar" />
        <h3>{{ p.name }}</h3>
        <span>{{ p.role }}</span>
      </div>
    </div>
    <div class="block-studio">
      <h3 class="header-studio">{{ $t("main.blocks.block-studio.title") }}</h3>
      <div
        v-for="(s, index) in studio"
        :key="index"
        :class="{ 'rev-row': index % 2 != 0 }"
        class="info-studio"
      >
        <img
          :class="{ rev: index % 2 != 0, def: index % 2 == 0 }"
          class="img-studio"
          src="../../assets/s01.jpg"
          alt="..."
        />
        <div class="info">
          <h3>{{ s.title }}</h3>
          <p class="slogan-info-studio">
            {{ s.descriprion }}
          </p>
        </div>
      </div>
    </div>
    <div class="block-equipment">
      <h3 class="header-equipment">{{ $t("main.blocks.block-equipment.title") }}</h3>
      <div v-for="(e, index) in equipment" :key="index" class="equipment">
        <img src="../../assets/s01.jpg" alt="..." />
        <div class="group-info">
          <h3 style="color: #fed905">{{ e.title }}</h3>
          <span>{{ e.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { createSectionsEquipment } from "@/sections/sectionEquipment";
import { createSectionsPersone } from "@/sections/sectionPersone";
import { createSectionsStudio } from "@/sections/sctionStudio";

import type { SectionEquipment } from "@/sections/sectionEquipment";
import type { SectionPersone } from "@/sections/sectionPersone";
import type { SectionStuidio } from "@/sections/sctionStudio";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const equipment: SectionEquipment[] = createSectionsEquipment(t);
    const studio: SectionStuidio[] = createSectionsStudio(t); 
    const persone: SectionPersone[] = createSectionsPersone(t); 
    return {
      equipment,
      studio,
      persone,
    };
  },
});
</script>

<style scoped>
.block-equipment {
  margin-top: 190px;
  margin-bottom: 60px;
  padding: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3vh;
}

.block-equipment .equipment:hover {
  transform: translateX(10px);
}

.block-equipment .header-equipment {
  font-size: 5vh;
  width: 100%;
}

.block-equipment .equipment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 20px;
  width: 400px;
  background-color: #1d1d1d;
  transition: all 400ms ease;
}

.block-equipment .equipment img {
  width: 400px;
  height: 15vh;
  transition: all 200ms ease;
  overflow: hidden;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.block-equipment .equipment .group-info {
  padding: 10px 20px 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.block-equipment .equipment .group-info button {
  width: 100%;
  background-color: #00000000;
  border: 2px solid #fed905;
  color: #fed905;
  border-radius: 12px;
  padding: 5px;
  font-size: 21px;
  transition: all 250ms ease;
  margin-top: 12px;
}

.block-equipment .equipment .group-info button:hover {
  color: #333;
  background-color: #fed905;
}

.container-about {
  margin: 0;
  color: #fff;
  width: 100%;
  /* background-color: #ffffff22; */
  background-color: #2222226e;
  box-shadow: 0px 0px 16px 6px #2222226e;
}

.block-studio {
  margin-top: 200px;
  background: linear-gradient(
    -45deg,
    #000,
    #111,
    #222,
    #4f4f4f,
    #222,
    #111,
    #000
  );
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 100px;
}

.block-studio .info-studio {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.block-studio .header-studio {
  margin-bottom: 100px;
  margin-right: 400px;
  text-align: end;
  font-size: 8vh;
}

.block-studio .info-studio img {
  transition: all 500ms ease;
}

.def {
  clip-path: polygon(10% 10%, 100% 0%, 100% 100%, 0% 80%);
}

.rev-row {
  flex-direction: row-reverse;
  h3 {
    text-align: end;
  }
}

.rev {
  clip-path: polygon(20% 0%, 100% 10%, 90% 85%, 0% 95%);
}

.block-studio .info-studio img:hover {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  border-radius: 20px;
}

.slogan-info-studio {
  background-color: #1d1d1d;
  border-radius: 20px;
  padding: 20px;
}

.block-studio .info-studio .info h3 {
  color: #f1cc47;
  font-size: 4vh;
  text-shadow: 0px 0px 10px #f5c518;
}

.container-about h1 {
  font-size: 8vh;
  text-align: center;
  padding: 100px 0 100px 0;
}

.block-worker {
  display: flex;
  justify-content: center;
  gap: 50px;
  background-color: #222;
  height: 600px;
  padding: 30px;
  clip-path: polygon(0% 20%, 100% 0%, 100% 100%, 0% 85%);
}

.block-worker .persone {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.block-worker .persone img {
  height: 12vh;
  width: 12vh;
  border-radius: 50%;
  transition: all 500ms ease;
}

.block-worker .persone img:hover {
  height: 16vh;
  width: 16vh;
}

.header-worker {
  font-size: 5vh;
  display: flex;
  align-items: center;
}

.block-worker .persone span {
  color: #f5c518;
}

@media (max-width: 1400px) {
  .block-worker {
    padding: 30px;
  }

  .block-worker .persone img {
    height: 8vh;
    width: 8vh;
  }

  .block-worker .persone img:hover {
    height: 10vh;
    width: 10vh;
  }
}

@media (max-width: 900px) {
  .block-worker {
    padding: 30px;
    display: flex;
    flex-direction: column;
    height: 100%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  .block-worker .persone img {
    height: 12vh;
    width: 12vh;
  }

  .block-studio {
    gap: 50px;
    padding: 14px;
  }
  .block-studio .info-studio img {
    transform: translateX(-15%);
  }
}

@media (max-width: 1100px) {
  .block-studio .info-studio img {
    transform: translateX(-12%);
  }
}

@media (max-width: 1600px) {
  .block-studio .info-studio {
    display: block;
    gap: 40px;
  }
}
</style>
