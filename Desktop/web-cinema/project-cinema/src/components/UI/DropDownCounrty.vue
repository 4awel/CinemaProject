<template>
  <div class="$zindex-sticky container-dd">
    <div class="group_country">
      <div class="item_drop active_drop">RU</div>
      <div class="item_drop">US</div>
      <div class="item_drop">CH</div>
      <div class="item_drop">JA</div>
      <div class="item_drop">UK</div>
      <div class="item_drop">SK</div>
      <div class="item_drop">LA</div>
      <div class="item_drop">RU</div>
      <div class="item_drop">US</div>
      <div class="item_drop">CH</div>
      <div class="item_drop">JA</div>
      <div class="item_drop">UK</div>
      <div class="item_drop">SK</div>
      <div class="item_drop">LA</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({

});
</script>

<style scoped>
.container-dd {
  background-color: #fff;
  /* padding: 40px; */
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 1005;
  gap: 20px;
}

.fillcolor {
  fill: #000;
}

.item_drop {
  cursor: pointer;
  background-color: #b6b6b6;
  color: #000000;
  width: 100%;
  padding: 10px 40px;
  transition: all 200ms;
}

.group_country {
  display: flex;
  flex-direction: column;
}

.item_drop:hover {
  transition: all 200ms;
  background-color: #7d7d7d;
  color: #fff;
}

.active_drop {
  background-color: #7d7d7d;
  color: #fff;
}
</style>
