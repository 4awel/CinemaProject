<template>
  <div
    id="carouselExampleCaptions"
    class="carousel slide"
  >
    <div class="carousel-indicators">
      <button
        v-for="(slide, index) in slides"
        :key="'indicator-' + index"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        :data-bs-slide-to="index"
        :class="{'active': index === 0}"
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(slide, index) in slides"
        class="carousel-item"
        :key="index"
        :class="{'active': index === 0}"
      >
        <img
          class="d-block w-100"
          :src="slide.image"
          :alt="'Slide ' + (index + 1)"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import { Carousel } from 'bootstrap';

export default {
  data() {
    return {
      slides: [
        {
          image: "https://graeweb.github.io/Github/img/parallax/image1.jpg",
        },
        {
          image: "https://graeweb.github.io/Github/img/parallax/image2.jpg",
        },
        {
          image: "https://graeweb.github.io/Github/img/parallax/image3.jpg",
        },
        {
          image: "https://graeweb.github.io/Github/img/parallax/image4.jpg",
        },
        {
          image: "https://graeweb.github.io/Github/img/parallax/image5.jpg",
        },
        {
          image: "https://graeweb.github.io/Github/img/parallax/image6.jpg",
        }
      ],
      carousel: null,
      interval: null
    };
  },
  mounted() {
    const carouselElement = document.getElementById('carouselExampleCaptions');
    this.carousel = new Carousel(carouselElement, {
      interval: false // Отключаем встроенный интервал Bootstrap
    });

    // Запускаем интервал
    this.startInterval();

    // Останавливаем и перезапускаем интервал при ручном переключении
    carouselElement.addEventListener('slide.bs.carousel', () => {
      this.restartInterval();
    });
  },
  methods: {
    startInterval() {
      this.interval = setInterval(() => {
        this.carousel.next();
      }, 4000);
    },
    restartInterval() {
      clearInterval(this.interval);
      this.startInterval();
    }
  },
  beforeUnmount() {
    // Очищаем интервал при уничтожении компонента
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.carousel {
  height: 100vh;
}

.carousel-inner img {
  object-fit: cover;
  overflow: hidden;
  height: 100vh;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 5px;
}
</style>