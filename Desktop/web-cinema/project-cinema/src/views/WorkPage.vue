<template>
  <div class="container-workapp">
    <div class="btn-group">
      <button @click="$router.push({ path: '/' })" id="btn">
        {{ $t('workapp.header-panel.btn-0') }} 〈
      </button>
      <button
        v-if="userData.role !== 'worker'"
        @click="$router.push({ path: '/adduser' })"
        id="btn"
      >
        {{ $t('workapp.header-panel.btn-1') }}
      </button>
      <button
        v-if="userData.role !== 'worker'"
        @click="$router.push({ path: '/addnews' })"
        id="btn"
      >
        {{ $t('workapp.header-panel.btn-2') }}
      </button>
      <input
        v-if="userData.role !== 'worker'"
        v-model="email"
        :placeholder="$t('workapp.header-panel.placeholder')"
        id="input"
        type="text"
      />
      <button
        v-if="userData.role !== 'worker'"
        @click="deleteEmployee"
        id="btn"
      >
        {{ $t('workapp.header-panel.btn-3') }} 〈
      </button>
      <button id="btn">
        {{ userData.username }} | {{ userData.email }} | {{ userData.role }}
      </button>
      <button @click="logout" id="btn">{{ $t('workapp.header-panel.btn-4') }}</button>
    </div>
    <span
      v-if="isAlertDel"
      style="color: yellowgreen; padding: 20px; width: 100%; text-align: center"
      >Employee has benn succes deleted!
      <span
        style="
          color: #fff;
          border-radius: 50%;
          border: 2px solid #fff;
          padding: 4px 8px;
          margin-left: 12px;
          cursor: pointer;
        "
        @click="isAlertDel = false"
        >X</span
      ></span
    >
    <span
      v-if="isCopy"
      style="color: yellowgreen; padding: 20px; width: 100%; text-align: center"
      >{{ copyStatus }}
      <span
        style="
          color: #fff;
          border-radius: 50%;
          border: 2px solid #fff;
          padding: 4px 8px;
          margin-left: 12px;
          cursor: pointer;
        "
        @click="isCopy = false"
        >X</span
      ></span
    >
    <h1>{{ $t('workapp.main.title') }}</h1>
    <div class="block-side-workapp">
      <div class="main-container-workapp">
        <h2>{{ $t('workapp.main.banners.title') }}</h2>
        <div class="update-news">
          <span v-if="isLoading">{{ loadingText }}</span>
          <div v-for="(item, index) in banners" :key="index" class="item-news">
            <img :src="item.image.url" alt="..." />
            <div class="info">
              <div class="block-info">
                <b>{{ item.title }}</b>
                <p>{{ item.description }}</p>
              </div>
              <button v-if="userData.role !== 'worker'" @click="deleteBanner(item.id)" id="btn">{{ $t('workapp.main.banners.btns') }}</button>
            </div>
          </div>
          <h2 style="color: #fed905;" v-if="banners.length == 0">There is no news yet</h2>
        </div>
        <h2>{{ $t('workapp.main.tickets.title') }}</h2>
        <div class="tickets">
          <span v-if="isLoading">{{ loadingText }}</span>
          <div
            v-for="(ticket, index) in tickets"
            :key="index"
            class="item-ticket"
          >
            <b style="font-size: 16px">Tick: №{{ ticket._id }}</b>
            <div class="data-ticket">
              <b @click="copyToClipboard(ticket.email)" href=""
                >Em: {{ ticket.email }}</b
              >
              <b @click="copyToClipboard(ticket.phone.toString())" href=""
                >Ph: {{ ticket.phone }}</b
              >
              <i>{{ ticket.name }}</i>
            </div>
            <div class="btn-group-item">
              <button @click="deleteTicket(ticket._id)" class="btn-re">
                {{ $t('workapp.main.tickets.btns') }}
              </button>
            </div>
          </div>
          <h2 style="color: #fed905;" v-if="tickets.length == 0">The tickets are over. You can rest</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import AuthService from "@/services/AuthService";
import type { ObjectId } from "mongoose";

interface TiketType {
  name: string;
  phone: number;
  email: string;
  _id: ObjectId;
}

interface UserType {
  username: string;
  email: string;
  role: string;
}

interface BannerType {
  id: ObjectId,
  image: {
    originName: string,
    url: string
  },
  title: string,
  description: string,
  createAt: Date
}

export default defineComponent({
  data() {
    return {
      tickets: [] as TiketType[],
      banners: [] as BannerType[],
      userData: {} as UserType,
      isAlertDel: false,
      email: "",
      copyStatus: "",
      isCopy: false,
      isLoading: false,
      loadingText: 'Loading.',
      loadingIndex: 0,
      loadingInterval: '',
      cards: [
        "Loading.",
        "Loading..",
        "Loading..."
      ]
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchTickets();
    this.fetchBanner();
    this.isLoading ? this.startLoadingAnimation() : this.stopLoadingAnimation();
  },
  methods: {
    startLoadingAnimation() {
      (this.loadingInterval as any) = setInterval(() => {
        this.loadingIndex = (this.loadingIndex + 1) % this.cards.length;
        this.loadingText = this.cards[this.loadingIndex];
      }, 200);
    },
    stopLoadingAnimation() {
      if (this.loadingInterval) {
        clearInterval(this.loadingInterval);
        this.loadingInterval = '';
      }
    },

    async fetchUserData() {
      const API_URL = "http://localhost:3005";
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/user/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.userData = response.data;
      } catch (error: any) {
        console.error("Failed to fetch user data:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Токен невалидный - редирект на логин
          AuthService.logout();
          this.$router.push("/login");
        }
      }
    },
    logout() {
      AuthService.logout();
      this.$router.push({ path: "/login" });
    },
    async deleteEmployee() {
      await axios.post("/delete/user", {
        email: this.email,
      });
      this.email = "";
      this.isAlertDel = true;
    },
    async fetchTickets() {
      this.isLoading = true;
      try {
        const response = await axios("/fetch/tickets");
        this.tickets = response.data;
      } catch (err) {
        alert('Error: Response faild tickets');
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchBanner() {
      this.isLoading = true;
      try {
        const response = await axios('/get/banner');
        this.banners = response.data;
        console.log(response.data)
      } catch (err) {
        alert('Error: Response faild Banner');
        console.log(err);
      } finally {
        this.isLoading = false
      }
    },
    async copyToClipboard(text: string) {
      try {
        await navigator.clipboard.writeText(text);
        this.copyStatus = "The text is saved in the clipboard";
        this.isCopy = true;
      } catch (err) {
        console.log("Error copy", err);
        this.copyStatus = 'Error the txt was not saved'
        this.isCopy = true;
      }
    },
    async deleteTicket(_id: any | ObjectId) {
      await axios.post('/delete/ticket', {
        id: _id
      });
      window.location.reload();
    },
    async deleteBanner(_id: any | ObjectId) {
      await axios.post('/delete/banner', {
        id: _id
      })
      window.location.reload();
    }
  },
});
</script>

<style scoped>
.update-news {
  padding: 40px;

  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  border-radius: 20px;
  background-color: #333;
  margin: 10px;
  overflow-x: scroll;
  gap: 20px;
  margin-bottom: 40px;
}

.item-news img {
  transition: all 200ms ease;
  overflow: hidden;
  object-fit: cover;
  height: 15vh;
  width: 400px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.item-news:hover {
  .block-info b,
  p {
    transition: all 200ms ease;
    font-size: 20px;
  }

  img {
    transition: all 200ms ease;
    height: 10vh;
    filter: blur(2.5px);
  }
}

.block-info b,
p {
  transition: all 200ms ease;
}

.item-news .info {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.info button {
  left: 20px;
  width: 40%;
}

.item-news {
  display: flex;
  flex-direction: column;

  gap: 10px;
  border-radius: 20px;
  /* border: 1px solid #111; */
  box-shadow: 0px 0px 10px 1px #111;
  background-color: #1111115f;
}

.tickets {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 1% 5%;
  gap: 20px;
  width: 100%;
}

.item-ticket {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px;
  gap: 10px;
  border-radius: 20px;
  /* border: 1px solid #111; */
  box-shadow: 0px 0px 10px 1px #111;
  background-color: #1111115f;
}

.btn-group-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-re {
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #e30f0f;
  color: #ee0f0f;
  background-color: #00000000;
  border-radius: 8px;
  transition: all 250ms ease;
  width: 50%;
}

.type-ticket {
  padding: 2px 4px;
  background-color: #21523c;
  color: #fff;
  border-radius: 20px;
  width: 30%;
  font-size: 12px;
  text-align: center;
}

.btn-ac {
  padding: 8px;
  width: 50%;
  margin-bottom: 20px;
  border: 1px solid #fed905;
  color: #fed905;
  background-color: #00000000;
  border-radius: 8px;
  transition: all 250ms ease;
}

.btn-re:hover {
  background-color: #e30f0f;
  color: #111;
  transition: all 250ms ease;
}

.btn-ac:hover {
  background-color: #fed905;
  color: #111;
  transition: all 250ms ease;
}

.data-ticket {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 10px;
  background-color: #111;
}

.data-ticket b {
  color: #fed905;
  text-decoration: none;
  cursor: pointer;
}

.container-workapp {
  padding: 20px;
}

.btn-group {
  display: flex;
  gap: 20px;
  align-items: center;
}

.main-container-workapp {
  color: #fff;
  background-color: #222;
  /* background-color: #fff; */
  border-radius: 20px;
  padding: 38px;
}

#input {
  padding: 8px 16px;
  border: 1px solid #fed905;
  color: #fed905;
  width: 15%;
  background-color: #111;
  border-radius: 8px;
  margin-bottom: 20px;
}

#input:focus {
  transition: all 200ms ease;
  box-shadow: 0 0 6px 1px #fed905;
  outline: none;
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

h1 {
  color: #fff;
}
</style>
