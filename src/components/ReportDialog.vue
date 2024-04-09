<template lang="">
  <v-dialog
    max-width="500"
    persistent
    v-model="dialog"
    transition="dialog-top-transition"
  >
    <v-card class="add-report-form">
      <v-card-title class="pt-4"
        >{{ id ? "Modifica segnalazione" : "Aggiungi segnalazione" }}
      </v-card-title>
      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Posizione dell'incendio"
              v-model="v$.form.position.$model"
              :error="v$.form.position.$error"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <label>Sono presenti delle persone in pericolo</label>
            <v-radio-group
              label=""
              v-model="v$.form.peoplePresent.$model"
              :error="v$.form.peoplePresent.$error"
              hide-details
              inline
            >
              <v-radio label="Si" :value="true"></v-radio>
              <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" class="d-flex flex-column">
            <label>Gravità della situazione</label>
            <v-rating
              v-model="v$.form.gravity.$model"
              :error="v$.form.gravity.$error"
              active-color="warning"
              :color="v$.form.gravity.$error ? 'error' : null"
              empty-icon="mdi-alert-octagon-outline"
              full-icon="mdi-alert-octagon"
              hide-details
            ></v-rating>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Dettagli aggiuntivi"
              v-model="v$.form.description.$model"
              :error="v$.form.description.$error"
              variant="outlined"
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-4 pt-2 justify-end">
        <v-btn :disabled="loading" @click="close()"> Annulla </v-btn>
        <v-btn
          @click="save()"
          :loading="loading"
          variant="elevated"
          elevation="0"
          color="primary"
        >
          Salva
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { useReportsStore } from "@/stores/reports";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const defaultForm = () => ({
  position: null,
  description: null,
  gravity: null,
  peoplePresent: null,
});
export default {
  setup() {
    return {
      reports$: useReportsStore(),
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      dialog: false,
      loading: false,
      id: null,
      form: defaultForm(),
    };
  },
  validations() {
    return {
      form: {
        position: { required },
        description: { required },
        gravity: { required },
        peoplePresent: { required },
      },
    };
  },
  methods: {
    async close() {
      this.dialog = false;
    },
    open(report) {
      if (report) {
        this.id = report.id;
        this.form = report;
      } else {
        this.id = null;
        this.form = defaultForm();
      }
      this.dialog = true;
    },
    async save() {
      this.v$.form.$touch();
      if (this.v$.form.$invalid) {
        return;
      }
      try {
        if (this.id) {
          await this.reports$.UPDATE(this.id, this.form);
        } else {
          await this.reports$.CREATE(this.form);
        }
        this.dialog = false;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
.add-report-form {
  .v-selection-control-group {
    gap: 20px;
  }
}
</style>
