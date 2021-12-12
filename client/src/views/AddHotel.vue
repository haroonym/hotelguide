<template>
  <div class="center" style="height: 100%">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-form ref="form">
            <v-card>
              <v-card-text>
                <v-text-field
                  ref="name"
                  v-model="name"
                  :rules="[() => !!name || 'This field is required']"
                  label="Hotel Name"
                  placeholder="Hotel Wien West"
                  required
                ></v-text-field>
                <v-text-field
                  ref="postleitzahl"
                  v-model="postleitzahl"
                  :rules="[() => !!postleitzahl || 'This field is required']"
                  label="Postleitzahl"
                  required
                  placeholder="1210"
                ></v-text-field>
                <v-text-field
                  ref="preis_pro_nacht"
                  v-model="preis_pro_nacht"
                  :rules="[() => !!preis_pro_nacht || 'This field is required']"
                  label="Preis Pro Nacht"
                  required
                  placeholder="49.99 $"
                ></v-text-field>
                <v-autocomplete
                  ref="unterkunftsart"
                  v-model="unterkunftsart"
                  :rules="[() => !!unterkunftsart || 'This field is required']"
                  :items="unterkunftsarten"
                  label="Unterkunftsart"
                  placeholder="Select..."
                  required
                ></v-autocomplete>
                <v-textarea
                  ref="beschreibung"
                  v-model="beschreibung"
                  :rules="[() => !!beschreibung || 'This field is required']"
                  label="Beschreibung"
                  required
                  placeholder="Kurze Beschreibung"
                  auto-grow
                ></v-textarea>
              </v-card-text>
              <h3 :class="styleMessage">{{ message }}</h3>

              <v-divider class="mt-12"></v-divider>
              <v-card-actions>
                <v-btn color="primary" text @click="postHotel()"> Hinzufügen </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    unterkunftsarten: ['Hotel', 'Ferienwohnung', 'Hostel'],
    name: '',
    postleitzahl: '',
    unterkunftsart: '',
    preis_pro_nacht: '',
    beschreibung: '',
    message: '',
    styleMessage: '',
  }),
  methods: {
    async postHotel() {
      try {
        const { data } = await axios({
          url: 'http://127.0.0.1:3000/hotels',
          method: 'POST',
          contentType: 'application/json',
          data: {
            name: this.name,
            postleitzahl: this.postleitzahl,
            unterkunftsart: this.unterkunftsart,
            preisProNacht: Number(this.preis_pro_nacht),
            beschreibung: this.beschreibung,
            bewertung: 0,
          },
        });
        if (data != 'Erfolgreich') {
          this.message = 'Fehlgeschlagen';
          this.styleMessage = 'red--text';
        } else {
          this.message = 'Erfolgreich hinzugefügt';
          this.styleMessage = 'green--text';
          this.$refs.form.reset();
        }
      } catch (error) {
        console.log(error);
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
