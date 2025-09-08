<template>
  <div class="main_container">
    <header-app></header-app>
    <CoruselSlider />
    <BlockInfoSlide />
    <h1 id="films" class="HeaderText">{{ $t('main.headers.header-films.title') }}</h1>
    <section v-for="(item, index) in sections" :key="index">
      <div class="box">
        <h2 id="HederTextItem" :data-jarallax-element="item.titleSpeed">
          {{ item.title }}
        </h2>
        <div
          class="container"
          :class="{ reverse: index % 2 !== 0 && width >= 600 }"
        >
          <div class="imgBx jarallax">
            <video class="jarallax-img" autoplay muted loop playsinline>
              <source :src="item.video" type="video/mp4" />
            </video>
          </div>
          <div class="content" :data-jarallax-element="item.contentSpeed">
            <p>
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <video-block></video-block>
    <div class="serials-block" >
      <h1 
        id="series"
        class="HeaderText"
        style="margin-bottom: 40px"
        data-jarallax-element="0 -100"
      >
        {{ $t('main.headers.header-serials.title') }}
      </h1>
      <section v-for="(item, index) in sectionSerials" :key="index">
        <div class="continer-serials jarallax">
          <video
            class="jarallax-video"
            :class="{ rev: index % 2 != 0, def: index % 2 == 0 }"
            autoplay
            muted
            loop
          >
            <source :src="item.video" type="video/mp4" />
          </video>
          <div
            class="container-serials_description"
            data-jarallax-element="0 -200"
          >
            <b>{{ item.description }}</b>
          </div>
        </div>
      </section>
    </div>
    <about-block id="about"></about-block>
    <form-block id="contacts"></form-block>
    <footer-app></footer-app>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, watch } from "vue";
import "jarallax/dist/jarallax.min.css";
import "jarallax/dist/jarallax-element.min.js";
import { jarallax } from "jarallax";
import video1 from "../assets/video-block-1.mp4";
import video0 from "../assets/video-block-2.mov";
import { useI18n } from "vue-i18n";

import CoruselSlider from "../components/UI/CoruselSlider.vue";
import BlockInfoSlide from "../components/UI/BlockInfoSlide.vue";
import VideoBlock from "@/components/UI/VideoBlock.vue";
import AboutBlock from "@/components/UI/AboutBlock.vue";
import FormBlock from "@/components/UI/FormBlock.vue";

import HeaderApp from "@/components/HeaderApp.vue";
import FooterApp from "@/components/FooterApp.vue";

import { createSections } from "@/sections/section";
import { createSectionsSerials } from "@/sections/sectionSerials";
import type { Section } from "@/sections/section";
import type { SectionSerials } from "@/section/sectionSerials";
// interface Section {
//   video: string;
//   titleSpeed: string;
//   contentSpeed: string;
//   title: string;
//   description: string;
// }

// interface SectionSerials {
//   video: string;
//   title: string;
//   description: string;
// }

export default defineComponent({
  components: {
    CoruselSlider,
    BlockInfoSlide,
    VideoBlock,
    HeaderApp,
    FooterApp,
    AboutBlock,
    FormBlock,
  },
  data() {
    return {
      video0,
      video1,
    };
  },
  setup() {
    const { t, locale } = useI18n();
    const sections: Section[] = createSections(t);

    const sectionSerials: SectionSerials[] = createSectionsSerials(t);

    const width = ref(window.innerWidth);

    const updatesX = () => {
      width.value = window.innerWidth;
    };

    const initJarallax = (): void => {
      try {
        jarallax(document.querySelectorAll(".jarallax"), {
          speed: 0.5,
        });

        if (jarallax.jarallaxElement !== "undefined") {
          jarallax.jarallaxElement(
            document.querySelectorAll("[data-jarallax-element]")
          );
        }
      } catch (error) {
        console.error("Jarallax initialization error:", error);
      }
    };

    const destroyJarallax = (): void => {
      try {
        jarallax.destroy(
          document.querySelectorAll(".jarallax, [data-jarallax-element]")
        );
      } catch (error) {
        console.error("Jarallax destruction error:", error);
      }
    };

    onMounted(() => {
      initJarallax();
      window.addEventListener("resize", updatesX);
    });

    onBeforeUnmount(() => {
      destroyJarallax();
      window.addEventListener("resize", updatesX);
    });

    return {
      sections,
      sectionSerials,
      width,
    };
  },
});
watch: {
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

.serials-block {
  margin: 0;
  padding: 20%;
}

.HeaderText {
  padding: 15% 20% 1%;
  font-size: 16vh;
  color: #fff;
}

.serials-block h1 {
  font-size: 20vh;
  color: #fff;
}

.serials-block {
  color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.container-serials {
  perspective: 1px;
  overflow-x: hidden;
  overflow-y: auto;
}

.continer-serials video {
  height: 60vh;
  display: flex;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  transition: all 700ms ease;
  overflow: hidden;
  transform: translateZ(100px) scale(1.5);

  z-index: -1;
}

.def {
  clip-path: polygon(0% 10%, 80% 0%, 100% 100%, 0% 80%);
}

.rev {
  clip-path: polygon(20% 0%, 100% 10%, 90% 85%, 0% 95%);
}

.continer-serials video:hover {
  height: 60vh;
  display: flex;
  border-radius: 20px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

.continer-serials .container-serials_description {
  padding: 60px 20px;
  text-align: center;
  background-color: #222;
  clip-path: polygon(0% 10%, 80% 0%, 100% 100%, 10% 85%);
}

.jarallax {
  position: relative;
  z-index: 0;
}
.jarallax > .jarallax-img {
  position: absolute;
  object-fit: cover;
  font-family: "object-fit: cover;";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.main_container {
  position: relative;
  z-index: 1;
}

section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
section h2 {
  margin-left: 200px;
  font-size: 4em;
  color: #fff;
  margin-bottom: 20px;
}
section .container {
  position: relative;
  width: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
section .container.reverse {
  flex-direction: row-reverse;
}
section .container.reverse .content {
  left: 0;
  right: auto;
}
section .container .imgBx {
  position: relative;
  width: 800px;
  height: 400px;
  overflow: hidden;
  box-shadow: 0 25px 35px rgba(0, 0, 0, 0.1);
  border-radius: 40px;
  transition: all 500ms ease;
}

section .container .imgBx:hover {
  position: relative;
  width: 1200px;
  height: 800px;
  overflow: hidden;
  box-shadow: 0 25px 35px rgba(0, 0, 0, 0.1);
  border-radius: 40px;
}

section .container .imgBx video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

section .container .content {
  position: absolute;
  max-width: 400px;
  right: 10px;
  margin-top: 200px;
  margin-bottom: 40px;
  padding: 40px;
  background: #333;
  z-index: 1;
  color: #fff;
  box-shadow: 0 25px 35px rgba(0, 0, 0, 0.1);
  border-bottom: 6px solid #fed905;
  border-radius: 20px;
}

@media (max-width: 600px) {
  .HeaderText {
    padding: 15% 20% 1%;
    font-size: 10vh;
    color: #fff;
  }

  section h2 {
    margin-left: 30%;
    font-size: 3em;
    color: #fff;
    margin-bottom: 20px;
  }

  section .container .content {
    right: 220px;
    left: 220px;
  }
}
</style>
