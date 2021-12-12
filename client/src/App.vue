<template>
  <v-app>
    <v-app-bar app color="success" dark>
      <div class="d-flex align-center">
        <v-img src="../public/hotel.png" width="50px" class="mr-3"></v-img>
        <h2 class="white--text">Hotelguide</h2>
      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app right>
      <v-list nav>
        <v-list-item-group  active-class="green darken-1 white--text">
          <v-list-item link :to="'/'">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="'/admin'">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="`/addhotel`">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Hotel hinzufügen</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main hide-overlay>
      <router-view :hotels="hotels" @deleteHotel="deleteHotel" @refreshHotel="getHotels"></router-view
    ></v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      hotels: [],
      drawer: false,
    };
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
