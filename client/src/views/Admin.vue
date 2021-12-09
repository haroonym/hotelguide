<template>
  <div class="mt-15">
    <v-container>
      <v-simple-table fixed-header class="elevation-0 mt-10">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="font-italic">Name</th>
              <th class="font-italic">Preis Pro Nacht</th>
              <th class="font-italic">Bewertung</th>
              <th class="font-italic">Unterkunftsart</th>
              <th class="font-italic">Bezirk</th>
              <th class="font-italic">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in hotels" :key="h.hotel_id">
              <td>{{ h.name }}</td>
              <td>{{ h.preis_pro_nacht }} €</td>
              <td><v-rating
              :value="`${h.bewertung}`"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating></td>
              <td>{{ h.unterkunftsart }}</td>
              <td>{{ h.bzrk_name }}</td>
              <td>
                <v-btn icon> <v-icon> mdi-cached </v-icon> </v-btn>
                
                <v-dialog transition="dialog-top-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on"><v-icon> mdi-delete </v-icon></v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar class="elevation-0 font-weight-bold" light>Bestätigung</v-toolbar>
                      <v-card-text>
                        <div class="pa-12 font-weight-bold black--text text-h5">Möchten Sie das Hotel wirklich aus der Datenbank löschen?</div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn color="red darken-1" text @click="deleteHotel(h.hotel_id)">Delete</v-btn>
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    hotels: {
      type: Array,
    },
  },
  methods: {
    deleteHotel(value) {
      return this.$emit('deleteHotel', value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
