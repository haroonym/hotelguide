<template>
  <div class="center" style="height: 100%">
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
              <td>
                <v-rating
                  :value="`${h.bewertung}`"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
              </td>
              <td>{{ h.unterkunftsart }}</td>
              <td>{{ h.bzrk_name }}</td>
              <td>
                <v-dialog transition="dialog-top-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on"><v-icon> mdi-pencil </v-icon></v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar class="elevation-0 text-h6 font-weight-bold" light>Preis ändern</v-toolbar>
                      <v-card-text>
                        <div class="pa-5 grey--text text-h10 text-left">
                          <p>Name: {{ h.name }}</p>
                          <p>Postleitzahl & Bezirk: {{ h.postleitzahl }} Wien, {{ h.bzrk_name }}</p>
                          <p>Unterkunftsart: {{ h.unterkunftsart }}</p>
                          <p>
                            <v-rating
                              :value="`${h.bewertung}`"
                              color="grey lighten-1"
                              dense
                              half-increments
                              readonly
                              size="15"
                            ></v-rating>
                          </p>
                          <v-row>
                            <v-col cols="4">
                              <v-subheader>Preis Pro Nacht</v-subheader>
                            </v-col>
                            <v-col cols="8">
                              <v-text-field v-model="preis_pro_nacht" prefix="$"></v-text-field>
                            </v-col>
                          </v-row>
                          <span :class="messageStyle">{{ message }}</span>
                        </div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn color="red darken-1" @click="updateHotel(h)" text>Update</v-btn>
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>

                <v-dialog transition="dialog-top-transition" max-width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on"><v-icon> mdi-delete </v-icon></v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar class="elevation-0 font-weight-bold" light>Bestätigung</v-toolbar>
                      <v-card-text>
                        <div class="pa-12 font-weight-bold black--text text-h5 text-center">
                          Möchten Sie das Hotel wirklich aus der Datenbank löschen?
                        </div>
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
import axios from 'axios';
export default {
  data() {
    return {
      preis_pro_nacht: '',
      message: '',
      messageStyle: '',
    };
  },
  props: {
    hotels: {
      type: Array,
    },
  },
  methods: {
    deleteHotel(value) {
      return this.$emit('deleteHotel', value);
    },
    async updateHotel(h) {
      const { data } = await axios({
        url: 'http://127.0.0.1:3000/hotel/' + h.hotel_id,
        method: 'PATCH',
        contentType: 'application/json',
        data: {
          preis_pro_nacht: Number(this.preis_pro_nacht),
        },
      });
      if (data == 'Fehlgeschlagen') {
        this.messageStyle = 'red--text';
      } else {
        this.preis_pro_nacht = '';
        this.messageStyle = 'green--text';
      }
      this.message = data;

      this.$emit('refreshHotel');
    },
  },
};
</script>

<style lang="scss" scoped></style>
