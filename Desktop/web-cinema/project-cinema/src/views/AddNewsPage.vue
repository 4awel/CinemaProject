<template>
  <div class="container-news">
    <form @submit.prevent="submitBanner">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <button
          @click="$router.push({ path: '/work' })"
          id="btn"
          style="width: 100px; height: 50px"
        >
          {{ $t('add-banner.button-0') }} 〈
        </button>
        <h3>{{ $t('add-banner.title') }}</h3>
      </div>
      <label for="file-upload" class="custom-file-upload">
        <i class="fa fa-cloud-upload"></i> {{ $t('add-banner.form.input-0.span') }}
      </label>
      <input
        @change="handleFileSelect"
        accept="image/*"
        required
        id="file-upload"
        type="file"
      />
      <label for="title">{{ $t('add-banner.form.input-1.span') }}</label>
      <input
        v-model="bannerData.title"
        maxlength="60"
        id="input"
        type="text"
        required
        :placeholder="$t('add-banner.form.input-1.lable')"
      />
      <label for="description">{{ $t('add-banner.form.input-2.span') }}</label>
      <textarea
        v-model="bannerData.description"
        required
        minlength="50"
        maxlength="450"
        name="description"
        :placeholder="$t('add-banner.form.input-2.lable')"
        id="input"
      ></textarea>
      <button type="submit" :disabled="loading" id="btn">
        {{ loading ? "Uploading..." : $t('add-banner.button-1') }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

interface BannerDataType {
    title: string,
    description: string
}
export default defineComponent({
  data() {
    return {
      bannerData: {
        title: "",
        description: "",
      } as BannerDataType,
      selectedFile: "",
      loading: false,
    };
  },
  methods: {
    handleFileSelect(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    },
    async submitBanner() {
      if (!this.selectedFile) {
        alert("Please, select file!");
        return;
      }
      this.loading = true;

      const formData = new FormData();
      formData.append("title", this.bannerData.title);
      formData.append("description", this.bannerData.description);
      formData.append("image", this.selectedFile);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3005/create/banner",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Banner created successfully!");
        console.log("Banner created:", response.data);
        // Сброс формы
        this.bannerData = { title: "", description: "" };
        this.selectedFile = "";
      } catch (error: any) {
        console.error("Error creating banner:", error);
        alert("Error: " + (error.response?.data?.error || error.message));
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.container-news {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.custom-file-upload {
  border: 1px solid #fed905;
  display: inline-block;
  padding: 8px 16px;
  cursor: pointer;
  background-color: #111;
  border-radius: 8px;
  transition: all 0.3s;
  font-family: Arial, sans-serif;
}

.custom-file-upload:hover {
  background-color: #fed905;
  border-color: #fed905;
  color: #111;
}

#file-upload {
  display: none;
}

.container-news form {
  background-color: #222;
  color: #fff;
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 20px;
  width: 25%;
  border-radius: 20px;
}

#btn {
  padding: 8px 16px;
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

#input {
  padding: 8px 16px;
  border: 1px solid #fed905;
  color: #fff;
  width: 100%;
  background-color: #111;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: all 200ms ease;
}

#input:focus {
  transition: all 200ms ease;
  box-shadow: 0 0 6px 1px #fed905;
  outline: none;
}
</style>
