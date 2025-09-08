<template>
    <div class="container-login">
        <form @submit.prevent="sendDataLogin">
            <button @click="$router.push({ path: '/'})" id="back">Назад 〈</button>
            <h1>Login</h1>
            <label for="login">Input email or login</label>
            <input v-model="email" type="text" placeholder="Input email or login">
            <label for="password">Input password</label>
            <input v-model="password" type="password" placeholder="Input password">
            <button type="submit" id="next">Войти</button>
        </form>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import AuthService from '@/services/AuthService';
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async sendDataLogin() {
            try {
                await AuthService.login(this.email, this.password);
                this.$router.push({ path: '/work' });
            } catch (err) {
                console.error(err);
                alert('Invalid credentials')
            }
        },
    }
});
</script>

<style scoped>

.container-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

form {
    padding: 64px;
    background-color: #222;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: #fff;
}

form input {
    width: 40vh;
    padding: 8px;
    border-radius: 10px;
    border: 1px solid #fed905;
}

form #back {
    width: 25%;
    padding: 8px;

    border-radius: 8px;
    color: #fed905;
    border: 1px solid #fed905;
    background-color: #00000000;

    transition: all 200ms ease;
}

form #back:hover {
    color: #000;
    background-color: #fed905;
    border: 1px solid #fed905;
}


form #next {
    padding: 8px;

    border-radius: 8px;
    color: #fed905;
    border: 1px solid #fed905;
    background-color: #00000000;

    transition: all 200ms ease;
}

form #next:hover {
    color: #000;
    background-color: #fed905;
    border: 1px solid #fed905;
}



</style>