<template>
  <div class="d-flex flex-wrap justify-center flex-wrap mt-10">
    <v-card class="ma-5" width="1000" elevation="5">
      <v-img height="300" :src="`http://localhost:8080/${hotel.image}`" />
      <v-card-title>{{ hotel.name }}</v-card-title>
      <v-card-text class="black--text"
        ><b>{{ hotel.preis_pro_nacht }} €</b> pro Nacht</v-card-text
      >
      <v-list-item-content>
        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="`${hotel.bewertung}`"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <div class="ms-4">{{ hotel.bewertung }}</div></v-row
          >
          <div class="grey--text my-4 text-subtitle-1">Unterkunftsart: {{ hotel.unterkunftsart }}</div>
          <div class="grey--text my-4 text-subtitle-1">Bezirk: {{ hotel.bzrk_name }}</div>
          <div class="grey--text my-4 text-subtitle-1">Beschreibung: {{ hotel.beschreibung }}</div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
      </v-list-item-content>

      <v-card-actions>
        <v-btn class="grey light-3 mb-2 mr-2 white--text my-0" to="/"> Zurück </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    hotelid: {
      type: String,
    },
  },
  data() {
    return {
      hotel: {},
    };
  },
  created() {
    this.getHotelwithID();
  },
  methods: {
    async getHotelwithID() {
      try {
        const { data } = await axios({
          url: `http://127.0.0.1:3000/hotels?id=${this.hotelid}`,
          method: 'GET',
        });
        this.hotel = data[0];
        console.log(this.hotel);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
