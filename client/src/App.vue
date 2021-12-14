<template>
  <v-app>
    <LogoBar />
    <v-main hide-overlay>
      <router-view :hotels="hotels" @deleteHotel="deleteHotel" @refreshHotel="getHotels"></router-view
    ></v-main>
  </v-app>
</template>

<script>
import LogoBar from '@/components/LogoBar.vue';
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      hotels: [],
    };
  },
  components: {
    LogoBar,
  },
  created() {
    this.getHotels();
  },
  methods: {
    async getHotels() {
      try {
        const { data } = await axios({
          url: 'http://127.0.0.1:3000/hotels',
          method: 'GET',
        });
        this.hotels = data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteHotel(value) {
      try {
        const { data } = await axios({
          url: `http://127.0.0.1:3000/hotel/${value}`,
          method: 'DELETE',
        });
        this.books = data;
        this.getHotels();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
