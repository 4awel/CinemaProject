<template>
  <footer class="footer" :class="{ 'footer--compact': isCompact }">
    <div class="footer__waves">
      <div class="footer__wave footer__wave--1"></div>
      <div class="footer__wave footer__wave--2"></div>
      <div class="footer__wave footer__wave--3"></div>
    </div>

    <div class="footer__content">
      <div class="footer__main">
        <div class="footer__logo-section">
          <router-link to="/" class="footer__logo-link">
            <img
              src="../assets/Снимок экрана 2025-04-29 в 12.20.45.png"
              alt="Логотип киностудии"
              class="footer__logo"
            />
          </router-link>
          <p class="footer__slogan">{{ slogan }}</p>

          <div class="footer__socials">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
            >
              <img :src="social.icon" class="footer__social-icon" />
            </a>
          </div>
        </div>

        <div class="footer__columns">
          <div
            class="footer__column"
            v-for="(column, index) in columns"
            :key="index"
          >
            <h3 class="footer__column-title">{{ column.title }}</h3>
            <ul class="footer__links">
              <li
                v-for="(link, linkIndex) in column.links"
                :key="linkIndex"
                class="footer__link-item"
              >
                <router-link
                  v-if="link.route"
                  :to="link.route"
                  class="footer__link"
                  @click="handleFooterLinkClick"
                >
                  {{ link.text }}
                </router-link>
                <a
                  v-else
                  :href="link.url"
                  class="footer__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__copyright">
          &copy; {{ currentYear }} {{ studioName }}. {{ $t('footer.copyright') }}.
        </div>

        <div class="footer__legal">
          <router-link to="/privacy" class="footer__legal-link"
            >{{ $t('footer.polytic') }}</router-link
          >
          <router-link to="/terms" class="footer__legal-link"
            >{{ $t('footer.conditions') }}</router-link
            >
            <span style="font-size: 12px; color: #333;">Create by Chawel</span>
        </div>
      </div>
    </div>

    <button
      v-if="showScrollButton"
      class="footer__scroll-top"
      @click="scrollToTop"
      aria-label="Наверх"
    >
      <ArrowUpIcon class="footer__scroll-icon" />
    </button>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import YoutubeIcon from "../assets/icons/YT.svg";
import TelegramIcon from '../assets/icons/telegram.svg';
import VkIcon from "../assets/icons/vk.svg";
import WeechatIcon from "../assets/icons/weechat.svg"
import type { Router } from "vue-router";

interface Social {
  name: string;
  url: string;
  icon: string;
}

interface Colums {
  title: string;
  links: Array<Link>;
}

interface Link {
  text: string;
  url: string;
  route: string;
}

export default defineComponent({
  name: "AppFooter",
  components: {},
  props: {
    compact: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { t, locale } = useI18n();
    const isCompact = ref(props.compact);
    const showScrollButton = ref(false);
    const currentYear = new Date().getFullYear();

    const studioName = "Киностудия имени М.";
    const slogan = t('footer.slogan');
    // const logo = require("@/assets/logo-white.svg");

    const socialLinks = [
      { name: "weechat", url: "https://weechat.com", icon: WeechatIcon },
      {
        name: "vkontakte",
        url: "https://vk.com",
        icon: VkIcon,
      },
      { name: "youtube", url: "https://youtube.com", icon: YoutubeIcon },
      { name: "telegram", url: "https://telegram.com", icon: TelegramIcon },
    ] as Social[];

    const checkRegister = () => {
      const token = localStorage.getItem("token");
      if (token) {
        return "/work"
      } else return "/login"
    }

    const columns = [
      {
        title: t('footer.films.title'),
        links: [
          { text: t('footer.films.item_0'), route: "/films/now-playing" },
          { text: t('footer.films.item_1'), route: "/films/coming-soon" },
          { text: t('footer.films.item_2'), route: "/films/collection" },
          { text: t('footer.films.item_3'), route: "/films/archive" },
        ],
      },
      {
        title: t('footer.studio.title'),
        links: [
          { text: t('footer.studio.item_0'), route: "/about" },
          { text: t('footer.studio.item_1'), route: "/history" },
          { text: t('footer.studio.item_2'), route: "/team" },
          { text: t('footer.studio.item_3'), route: "/careers" },
        ],
      },
      {
        title: t('footer.contacts.title'),
        links: [
          { text: t('footer.contacts.item_0'), route: "/contacts" },
          { text: t('footer.contacts.item_1'), route: checkRegister() },
          { text: t('footer.contacts.item_2'), url: "mailto:ads@kinostudio.ru" },
          { text: t('footer.contacts.item_3'), route: "/partners" },
        ],
      },
    ];

    const handleScroll = (): void => {
      showScrollButton.value = window.scrollY > 300;
    };

    const scrollToTop = (): void => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const handleFooterLinkClick = (): void => {
      if (window.innerWidth < 1024) {
        scrollToTop();
      }
    };

    onMounted((): void => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted((): void => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isCompact,
      showScrollButton,
      currentYear,
      studioName,
      slogan,
      socialLinks,
      columns,
      scrollToTop,
      handleFooterLinkClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.footer {
  position: relative;
  background: linear-gradient(
    135deg,
    $secondary-color 0%,
    darken($secondary-color, 5%) 100%
  );
  color: $text-color;
  padding-top: 5rem;
  margin-top: 5rem;
  overflow: hidden;

  &--compact {
    padding-top: 3rem;
    margin-top: 3rem;

    .footer__waves {
      display: none;
    }
  }

  &__waves {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 100px;
    overflow: hidden;
  }

  &__wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    background-size: 50% 100px;
    animation: wave 15s linear infinite;

    &--1 {
      background-image: url("~@/assets/wave1.png");
      opacity: 0.5;
    }

    &--2 {
      background-image: url("~@/assets/wave2.png");
      animation-delay: -5s;
      animation-duration: 20s;
      opacity: 0.75;
    }

    &--3 {
      background-image: url("~@/assets/wave3.png");
      animation-delay: -2s;
      animation-duration: 25s;
      opacity: 0.25;
    }
  }

  &__content {
    position: relative;
    z-index: 2;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  &__logo-section {
    display: flex;
    flex-direction: column;
  }

  &__logo-link {
    display: inline-block;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__logo {
    height: 65px;
    width: auto;

    @media (max-width: 768px) {
      height: 40px;
    }
  }

  &__slogan {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1.5rem;
    max-width: 300px;
  }

  &__socials {
    display: flex;
    gap: 1rem;
    margin-top: auto;
  }

  &__social-link {
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);

    &:hover {
      color: $primary-color;
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px);
    }
  }

  &__social-icon {
    width: 20px;
    height: 20px;
  }

  &__columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  &__column-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: $primary-color;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background: $primary-color;
    }
  }

  &__links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__link-item {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.5s ease forwards;

    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        animation-delay: $i * 0.05s;
      }
    }
  }

  &__link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    position: relative;
    padding-bottom: 2px;

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
      height: 1px;
      background: $primary-color;
      transition: width 0.3s ease;
    }

    &.router-link-exact-active {
      color: $primary-color;
      font-weight: 500;

      &::after {
        width: 100%;
      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  &__copyright {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.5);
  }

  &__legal {
    display: flex;
    gap: 1.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  &__legal-link {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: $primary-color;
    }
  }

  &__scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: $primary-color;
    color: $secondary-color;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: $shadow-md;

    &:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: $shadow-lg;
    }

    &--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  &__scroll-icon {
    width: 20px;
    height: 20px;
  }

  @keyframes wave {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
