<template>
  <div class="container-form">
    <div class="info">
      <h3 style="text-align: center;">{{ $t("main.blocks.block-form.title") }}</h3>
      <p>
        {{ $t("main.blocks.block-form.description") }}
      </p>
    </div>
    <form @submit.prevent="createTicket">
      <div class="inputs">
        <h3 style="font-size: 3vh;">{{ $t("main.blocks.block-form.form.title") }}</h3>
        <label for="">{{ $t("main.blocks.block-form.form.input.inp-0.lable") }}</label>
        <input v-model="nameGuest" type="text" :placeholder="$t('main.blocks.block-form.form.input.inp-0.placeholder')" />
        <label for="">{{ $t("main.blocks.block-form.form.input.inp-1.lable") }}</label>
        <input v-model="phoneGuest" type="text" :placeholder="$t('main.blocks.block-form.form.input.inp-0.placeholder')" />
        <label for="">{{ $t("main.blocks.block-form.form.input.inp-2.lable") }}</label>
        <input v-model="emailGuest" type="text" :placeholder="$t('main.blocks.block-form.form.input.inp-0.placeholder')" />
      </div>
      <button type="submit">{{ $t("main.blocks.block-form.form.button") }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      nameGuest: '',
      phoneGuest: '',
      emailGuest: ''
    }
  },
  methods: {
    async createTicket() {
      await axios.post('/create/ticket', {
        name: this.nameGuest,
        phone: this.phoneGuest,
        email: this.emailGuest
      });
      this.nameGuest = '',
      this.phoneGuest = '',
      this.emailGuest = ''
    }
  }
});
</script>

<style scoped>
.container-form {
  color: #fff;
  margin: 60px;
  display: flex;
  gap: 50px;
  justify-content: space-between;
}

.container-form .info {
  width: 60%;
}

.container-form .info h3 {
  font-size: 3.5vw;
  margin-bottom: 70px;
  background-color: #444;
  padding: 70px;
  align-items: center;
  clip-path: polygon(0% 10%, 90% 38%, 92% 70%, 18% 100%, 0% 48%);
  transition: all 250ms ease;
}

.container-form form {
  padding: 20px 30px;
  background-color: #222;
  border-radius: 20px;
  height: 45vh;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container-form form .inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.container-form form .inputs input {
  padding: 12px;
  border-radius: 10px;
  background-color: #333;
  border: none;
  color: #fed905;
  transition: all 250ms ease;
}

.container-form form .inputs input:focus {
  transition: all 250ms ease;
  outline: none;
  box-shadow: 0px 0px 10px #fed905;
  border: 1px solid #fed905;
}

.container-form form .inputs input:hover {
  transition: all 250ms ease;
  outline: none;
  box-shadow: 0px 0px 5px #fed905;
}

.container-form form button {
  width: 100%;
  background-color: #00000000;
  border: 2px solid #fed905;
  color: #fed905;
  border-radius: 12px;
  padding: 12px;
  font-size: 20px;
  transition: all 250ms;
}

.container-form form button:hover {
  transition: all 250ms;
  color: #333;
  background-color: #fed905;
}

@media (max-width: 1300px) {
  .container-form {
    flex-direction: column;
    margin-bottom: 200px;
  }
  .container-form .info {
    width: 100%;
    text-align: center;
  }
  .container-form form {
    width: 100%;
    height: 100%;
  }

  .container-form form button {
    padding: 10px;
    font-size: 16px;
    margin-top: 16px;
  }

  .container-form .info h3 {
    font-size: 5vw;
    transition: all 250ms ease;
  }
}

@media (max-width: 600px) {
  .container-form .info h3 {
    transition: all 250ms ease;
    padding: 26px;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    border-radius: 20px;
  }
}
</style>
