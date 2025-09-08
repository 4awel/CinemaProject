<template>
  <div class="container-adduser">
    <button @click="$router.push({ path: '/work' })" id="btn">{{ $t('add-user.button-0') }}〈</button>
    <div class="main-container-adduser">
      <form @submit.prevent="submitDataForCreateUser">
        <h2>{{ $t('add-user.title') }}</h2>
        <label for="role">{{ $t('add-user.form.status') }}</label>
        <select style="border-radius: 4px; padding: 6px 12px; color: #000; border: 1px solid #fed905;" v-model="role" name="role" id="role">
          <option value="admin">Admin</option>
          <option value="worker-as">WA</option>
          <option value="worker">W</option>
        </select>
        <label for="username">{{ $t('add-user.form.input-0.lable') }}</label>
        <input v-model="username" type="text" :placeholder="$t('add-user.form.input-0.placeholder')" />
        <label for="email">{{ $t('add-user.form.input-1.lable') }}</label>
        <input
          v-model="email"
          type="email"
          :placeholder="$t('add-user.form.input-1.placeholder')"
        />
        <label for="password">{{ $t('add-user.form.input-2.lable') }}</label>
        <input
          v-model="passwordFst"
          type="password"
          :placeholder="$t('add-user.form.input-2.placeholder')"
        />
        <label for="password">{{ $t('add-user.form.input-3.lable') }}</label>
        <input
          v-model="passwordSec"
          type="password"
          :placeholder="$t('add-user.form.input-3.placeholder')"
        />
        <button
          id="btn"
          type="submit"
        >
          {{ $t('add-user.button-1') }}
        </button>
        <span class="error alert" v-if="isAlertErrInput">Input void!</span>
        <span class="error alert" v-if="isAlertErrLength">Password 8 < symbol!</span>
        <span class="error alert" v-if="isAlertErrPass">Password not corected!</span>
        <span class="succes alert" v-if="isAlertSuc">Emolyee has been created!</span>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      username: "",
      email: "",
      role: "",
      passwordFst: "",
      passwordSec: "",
      isActiveBtn: true,
      isAlertErrInput: false,
      isAlertErrLength: false,
      isAlertErrPass: false,
      isAlertSuc: false,
    };
  },
  methods: {
    async submitDataForCreateUser() {
      if 
      (
        this.username != '' &&
        this.email != '' &&
        this.passwordFst != '' &&
        this.passwordSec != '' &&
        this.role != ''
      ) {
        if 
        (
          this.passwordFst.length > 8 &&
          this.passwordSec.length > 8
        ) {
          if (this.passwordFst === this.passwordSec) {
            this.isAlertErrInput = false;
            this.isAlertErrLength = false;
            this.isAlertErrPass = false;
            this.isAlertSuc = true;
            await axios.post("/create/user", {
              username: this.username,
              email: this.email,
              password: this.passwordFst,
              role: this.role,
            });
          } else this.isAlertErrPass = true;
        } else this.isAlertErrLength = true;
      } else this.isAlertErrInput = true;
    },
  },
  setup() {},
});
</script>

<style scoped>
.alert {
  background-color: #ffffff18;
  width: 100%;
  text-align: center;
  font-size: 28px;
}
.error {
  color: #f53232;
}
.succes {
  color: #54e79b;
}

.container-adduser {
  padding: 20px;
  height: 100vh;
}

#btn {
  padding: 8px 16px;
  margin-bottom: 20px;
  border: 1px solid #fed905;
  color: #fed905;
  background-color: #00000000;
  border-radius: 8px;
  transition: all 250ms ease;
}

#btn:hover {
  transition: all 250ms ease;
  border: 1px solid #fed905;
  background-color: #fed905;
  color: #222;
}

.main-conatiner-adduser {
  display: flex;

  height: 100vh;
}

form {
  padding: 64px;
  /* background-color: #222; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: #fff;
}

form input {
  width: 40vh;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #fed905;
}

form button {
  width: 20vh;
}
</style>
