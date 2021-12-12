<template>
  <v-container>
    <v-row class="mt-10 mx-auto">
      <v-col>
        <v-slider
          v-model="min.val"
          :label="min.label"
          :thumb-color="min.color"
          thumb-label="always"
          width="100%"
          max="500"
          min="0"
        ></v-slider>
      </v-col>
      <v-col class="pb-5">
        <v-slider
          v-model="max.val"
          :label="max.label"
          :thumb-color="max.color"
          thumb-label="always"
          width="100%"
          max="500"
          min="0"
        ></v-slider>
      </v-col>
      <v-col>
        <v-select
          v-model="bezirke"
          :items="allBezirke"
          menu-props="auto"
          label="Bezirke"
          hide-details
          prepend-icon="mdi-map"
          chips
          multiple
          solo
        ></v-select>
      </v-col>
      <v-col cols="12"><v-divider class="grey lighten-1"></v-divider></v-col>

      <v-col cols="12" style="text-align: center">
        <v-btn
          x-large
          outlined
          @click="
            bezirke = [];
            min.val = 0;
            max.val = 500;
          "
          class="grey lighten-3"
          >Reset All</v-btn
        >
      </v-col>
    </v-row>

    <div class="d-flex flex-wrap justify-center flex-wrap mt-15">
      <v-card v-for="hotel of getHotels" :key="hotel.hotel_id" class="mt-10 ma-5" width="500" elevation="5">
        <v-img height="300" :src="hotel.image"></v-img>
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
  </v-container>
</template>

<script>
export default {
  props: {
    hotels: {
      type: Array,
    },
  },
  data() {
    return {
      min: { label: 'min. Preis', val: 0, color: 'green' },
      max: { label: 'max. Preis', val: 500, color: 'red' },
      allBezirke: [
        '1010',
        '1020',
        '1030',
        '1040',
        '1050',
        '1060',
        '1070',
        '1080',
        '1090',
        '1100',
        '1110',
        '1120',
        '1130',
        '1140',
        '1150',
        '1160',
        '1170',
        '1180',
        '1190',
        '1200',
        '1210',
        '1220',
        '1230',
      ],
      bezirke: [],
    };
  },

  computed: {
    getHotels() {
      if (this.bezirke.length > 0) {
        return this.hotels.filter(
          (el) =>
            el.preis_pro_nacht >= this.min.val &&
            el.preis_pro_nacht <= this.max.val &&
            this.bezirke.includes(el.postleitzahl),
        );
      }
      return this.hotels.filter(
        (el) => el.preis_pro_nacht >= this.min.val && el.preis_pro_nacht <= this.max.val,
      );
    },
  },

};
</script>

<style lang="scss" scoped></style>
