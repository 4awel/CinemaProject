<template>
  <div class="container-block">
    <div class="info-block">
      <h3 style="font-size: 4vh; color: #fed905">{{ $t("main.blocks.block-info.title") }}</h3>
      <p style="font-size: 2vh">
        {{ $t("main.blocks.block-info.description") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
</script>

<style>
.container-block {
  background-color: #1c1c1c;
  color: #ffffff;
  width: 100%;
  /* height: 30vh; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 4% 80%);
}

.info-block {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 300px 80px;
}

@media (max-width: 1100px) {
  .info-block {
    padding: 5px 30px 10px;
    font-size: 5vh;
  }
}

h3 {
  margin: 20px;
}

.info-block p {
  text-align: center;
  margin: 0 6vh 6vh 6vh;
}
</style>
