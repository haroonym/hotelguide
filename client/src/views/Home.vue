<template>
  <div class="d-flex flex-wrap justify-center flex-wrap mt-15">

    <v-card v-for="hotel of hotels" :key="hotel.hotel_id" class="mt-10 ma-5" width="500" elevation="5">
      <v-img height="300" :src="hotel.image"></v-img>
      <v-card-title>{{ hotel.name }}</v-card-title>
      <v-card-text class="black--text"><b>{{ hotel.preis_pro_nacht }} €</b> pro Nacht</v-card-text>
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
          <div class="grey--text my-4 text-subtitle-1">Bezirk: {{ hotel.unterkunftsart }}</div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
      </v-list-item-content>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="grey light-3 mb-2 mr-2 white--text my-0" :to="`/details/${hotel.hotel_id}`">
          DETAILS
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    hotels: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped></style>
