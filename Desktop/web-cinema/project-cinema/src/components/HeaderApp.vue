<template>
  <header
    class="header"
    :class="{ 'header--scrolled': isScrolled, 'header--menu-open': isMenuOpen }"
    :style="{
      height: isMenuOpen ? (valueModal = '100vh') : (valueModal = 'auto'),
    }"
  >
    <div class="header__container">
      <!-- Логотип -->
      <router-link to="/" class="header__logo">
        <img
          src="../assets/Снимок экрана 2025-04-29 в 12.20.45.png"
          alt="Киностудия"
          class="header__logo-img"
        />
      </router-link>

      <!-- Основное меню -->
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li
            v-for="(item, index) in navItems"
            :key="index"
            class="header__nav-item"
          >
            <a style="cursor: pointer;" :style="{ color: isScrolled ? '#fff' : ''}" :href="item.path" class="header__nav-link">{{
              item.title
            }}</a>
          </li>
          <country-icon
            @click="toggleCountryModal"
            class="fillcolor"
            id="iconCy"
          ></country-icon>
        </ul>
      </nav>

      <!-- Бургер-меню -->
      <button
        class="header__burger"
        @click="toggleMenu"
        aria-label="Открыть меню"
        :aria-expanded="isMenuOpen"
      >
        <span
          class="header__burger-line line"
          :style="{
            backgroundColor: isMenuOpen ? (colorBurgerOpen = '#fff') : '',
          }"
        ></span>
        <span
          class="header__burger-line line"
          :style="{
            backgroundColor: isMenuOpen ? (colorBurgerOpen = '#fff') : '',
          }"
        ></span>
        <span
          class="header__burger-line line"
          :style="{
            backgroundColor: isMenuOpen ? (colorBurgerOpen = '#fff') : '',
          }"
        ></span>
      </button>

      <!-- Мобильное меню -->
      <div
        @keypress.esc="closeMenu"
        class="header__mobile-menu"
        :class="{ 'header__mobile-menu--open': isMenuOpen }"
      >
        <div class="header__mobile-menu-container">
          <ul class="header__mobile-nav-list">
            <li
              v-for="item in navItems"
              :key="item.path"
              class="header__mobile-nav-item"
            >
              <a
                :href="item.path"
                class="header__mobile-nav-link"
                @click="closeMenu"
              >
                {{ item.title }}
              </a>
            </li>
            <CountryIcon
              id="iconCy"
              @click="toggleCountryModal"
              style="fill: #fff"
            />
          </ul>
          <div class="header__social-links">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="header__social-link"
            >
              <component :is="social.icon" class="header__social-icon" />
            </a>
          </div>
        </div>
      </div>

      <!-- Модельное окно для смены языков -->
      <div
        class="modal-overlay"
        :style="{
          transition: 'all 1s ease',
          transform: `translateY(${translateAnim}vh)`,
        }"
        v-if="isCountryModalOpen"
        @click="closeCountryModal"
      >
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <b>{{ t("header.select_language") }}</b>
            <cross-icon class="fill-icon-cross" @click="closeCountryModal"></cross-icon>
          </div>
          <div class="languages-list">
            <div
              v-for="lang in availableLanguages"
              :key="lang.code"
              class="language-item"
              :class="{ 'active-lang-item': locale === lang.code }"
              @click="switchLocale(lang.code)"
            >
              <img :src="lang.flag" :alt="lang.name" class="language-flag" />
              <span>{{ lang.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, onUnmounted } from "vue";
// import { throttle } from 'lodash-es';
import CountryIcon from "./UI/icons/CountryIcon.vue";
import CrossIcon from "./UI/icons/CrossIcon.vue";
import DropDownCounrty from "./UI/DropDownCounrty.vue";
import { useI18n } from "vue-i18n";
import axios from "axios";

// import {
// //   InstagramIcon,
// //   YoutubeIcon,
// //   TwitterIcon,
// } from './social-icons'

interface navItem {
  path: string;
  title: string;
  icon: string;
}

interface Social {
  name: string;
  url: string;
  icon: string;
}

export default defineComponent({
  
  name: "AppHeader",
  components: {
    CountryIcon,
    DropDownCounrty,
    CrossIcon,
  },

  setup() {
    const { t, locale } = useI18n();
    const isScrolled = ref(false);
    const isMenuOpen = ref(false);
    // const isMenuCountryOpen = ref(true);
    const isCountryModalOpen = ref(false);
    const isDrop = ref(false);

    const translateAnim = ref(0);

    let valueModal = "auto";
    let colorBurgerOpen = "";

    const navItems = [
      { path: "#films", title: t("header.films"), icon: "FilmIcon" },
      { path: "#series", title: t("header.serials"), icon: "TvIcon" },
      { path: "#about", title: t("header.about"), icon: "InfoIcon" },
      { path: "#contacts", title: t("header.contacts"), icon: "ContactIcon" },
    ] as navItem[];

    const socialLinks = [
      { name: "facebook", url: "#", icon: "FacebookIcon" },
      { name: "instagram", url: "#", icon: "InstagramIcon" },
      { name: "youtube", url: "#", icon: "YoutubeIcon" },
      { name: "twitter", url: "#", icon: "TwitterIcon" },
    ] as Social[];

    const availableLanguages = [
      { code: "en", name: "English", flag: "" },
      { code: "ru", name: "Русский", flag: "" },
      { code: "ae", name: "العربية", flag: "" },
      { code: "cn", name: "中文", flag: "" },
      { code: "de", name: "Deutsch", flag: "" },
      { code: "es", name: "Español", flag: "" },
      { code: "fr", name: "Français", flag: "" },
      { code: "it", name: "Italiano", flag: "" },
      { code: "ja", name: "日本語", flag: "" },
      { code: "pl", name: "Polski", flag: "" },
      { code: "ua", name: "Українська", flag: "" },
    ];

    const clickEscLogger = (): void => {
      isMenuOpen.value = false;
      isCountryModalOpen.value = false;
    };

    const toggleCountryModal = () => {
      isCountryModalOpen.value = !isCountryModalOpen.value;
      translateAnim.value = 40;
    };

    const closeCountryModal = () => {
      isCountryModalOpen.value = false;
      translateAnim.value = 0;
    };

    const switchLocale = (langCode: string): void => {
      locale.value = langCode;
      localStorage.setItem("langCountry", langCode);
      closeCountryModal();
      location.reload();
      // location.reload(); 
    };

    const handleScroll = (): void => {
      isScrolled.value = window.scrollY > 50;
    };

    const toggleMenu = (): void => {
      isMenuOpen.value = !isMenuOpen.value;
      isMenuOpen.value === false ? (isCountryModalOpen.value = false) : "";
      document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
    };

    const closeMenu = (): void => {
      isMenuOpen.value = false;
      colorBurgerOpen = "#000";
      valueModal = "auto";
      document.body.style.overflow = "";
    };

    const activeDrop = (): void => {
      isDrop.value = !isDrop.value;
    };

    onMounted((): void => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted((): void => {
      window.removeEventListener("scroll", handleScroll);
    });

    // const { locale } = useI18n<{ message: MessageSchema }>();

    // const switchLanguage = () => {
    //   locale.value = locale.value === "en-US" ? "ru-RU" : "en-US";
    //   localStorage.setItem("user-lang", locale.value);
    // };

    // // Восстановление языка при загрузке
    // const savedLang = () => {
    //   localStorage.getItem("user-lang");
    //   if (savedLang) {
    //     locale.value = savedLang as "en-US" | "ru-RU";
    //   }
    // };

    return {
      isScrolled,
      isMenuOpen,
      navItems,
      socialLinks,
      toggleMenu,
      closeMenu,
      valueModal,
      colorBurgerOpen,
      isDrop,
      activeDrop,
      t,
      locale,
      isCountryModalOpen,
      availableLanguages,
      toggleCountryModal,
      closeCountryModal,
      switchLocale,
      translateAnim,
      clickEscLogger,
    };
  },
  data() {
    return {};
  },
  methods: {
    switchLocale() {
      this.$i18n.locale = this.$i18n.locale === "en" ? "ru" : "en";
    },
  },
  mounted() {
    // this.getDataWithServer_Settings()
  },
  computed: {
    currentText() {
      return this.$t("button") as string;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../variables.scss";
.fill-icon-cross {
  fill: #fff;
  width: 32px;
  height: 32px;
  transition: all 250ms ease;
  cursor: pointer;
}

.fill-icon-cross:hover {
  transition: all 250ms ease;
  transform: rotate(60deg);
}



.header {
  position: fixed;
  overflow: visible;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.298);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 6px 0 4px 0px #000;

  .fillcolor {
    fill: #000;
  }

  &--scrolled {
    background-color: rgba(0, 0, 0, 0.664);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    .link {
      color: #fff;
    }

    .line {
      background-color: #fff;
    }

    .fillcolor {
      fill: #fff;
    }
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1440px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
  }

  &__logo {
    z-index: 1001;

    &-img {
      height: 60px;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  &__nav {
    @media (max-width: 1024px) {
      display: none;
    }

    &-list {
      display: flex;
      gap: 2rem;
    }

    &-item {
      position: relative;
    }

    &-link {
      color: #000;
      font-size: 1.1rem;
      font-weight: 500;
      text-decoration: none;
      position: relative;
      padding: 0.5rem 0;
      transition: color 0.3s ease;


      &:hover {
        color: $primary-color;

        &::after {
          width: 100%;
        }
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: $primary-color;
        transition: width 0.3s ease;
      }
    }
  }

  &__burger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
    position: relative;
    width: 40px;
    height: 30px;

    @media (max-width: 1024px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &-line {
      display: block;
      width: 100%;
      height: 3px;
      // background-color: white;
      background-color: #000;
      border-radius: 2px;
      transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }
  }

  &--menu-open &__burger-line {
    &:nth-child(1) {
      transform: rotate(45deg) translate(7px, 7px);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  }

  &__mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.95);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
    // display: none;
    transform: translateX(100%);

    &--open {
      opacity: 1;
      visibility: visible;
      // display: flex;
      transform: translateX(0);
    }

    &-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 500px;
      padding: 2rem;
    }
  }

  &__mobile-nav-list {
    list-style: none;
    padding: 0;
    margin: 0 0 3rem;
    width: 100%;
    text-align: center;
  }

  &__mobile-nav-item {
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease;

    .header--menu-open & {
      opacity: 1;
      transform: translateY(0);

      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 0.1s;
        }
      }
    }
  }

  &__mobile-nav-link {
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s ease;
    display: inline-block;
    padding: 0.5rem 1rem;

    &:hover {
      color: $primary-color;
    }

    &.router-link-exact-active {
      color: $primary-color;
    }
  }

  &__social-links {
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  &__social-link {
    color: white;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);

    .header--menu-open & {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.5s;
    }

    &:hover {
      color: $primary-color;
      transform: translateY(-3px);
    }
  }

  &__social-icon {
    width: 24px;
    height: 24px;
  }
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.animation-open {
  transform: translateY(40vh);
  transition: all 1s ease;
}

.animation-close {
  transform: translateY(0);
  transition: all 1s ease;
}

.modal-content {
  background-color: #1a1a1a;
  padding: 2rem;
  height: 50vh;
  border-radius: 8px;
  max-width: 400px;
  color: white;
  text-align: center;

  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
}

.languages-list {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-color: #333 #fff;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 1024px) {
  .languages-list {
    margin-bottom: 8rem;
  }
}

.language-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }

  &.active {
    background-color: var(--primary-color);
  }
}

#iconCy:hover {
  transition: all 300ms ease;
  transform: rotate(65deg);
}

#iconCy {
  transition: all 300ms ease;
}

.language-flag {
  width: 30px;
  height: 20px;
  object-fit: cover;
  border-radius: 2px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
  padding-bottom: 10px;
}

.active-lang-item {
  background-color: #333;
}
</style>
