<template lang="">
  <v-dialog
    max-width="500"
    persistent
    v-model="dialog"
    transition="dialog-top-transition"
  >
    <v-card class="add-report-form">
      <v-card-title class="pt-4 pb-0"
        >{{ id ? "Modifica segnalazione" : "Aggiungi segnalazione" }}
      </v-card-title>
      <v-card-subtitle v-if="creator" class="pl-4 pt-0 mt-0">
        Aggiunta da {{ creator?.firstName }} {{ creator?.lastName }} il {{formatDate(form?.createdAt_date  ) }}
      </v-card-subtitle>
      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Posizione dell'incendio"
              v-model="v$.form.position.$model"
              :error="v$.form.position.$error"
              variant="outlined"
              hide-details
              :readonly="!isReportOwner"
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
              :readonly="!isReportOwner"

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
              :readonly="!isReportOwner"

            ></v-rating>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Dettagli aggiuntivi"
              v-model="v$.form.description.$model"
              :error="v$.form.description.$error"
              variant="outlined"
              hide-details
              :readonly="!isReportOwner"

            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-4 pt-2 justify-end">
        <v-btn
          variant="elevated"
          elevation="0"
          :disabled="loading"
          @click="deleteReport()"
          v-if="id"
          color="error"
        >
          Elimina
        </v-btn>
        <v-spacer />
        <v-btn :disabled="loading" @click="close()"> 
        {{ isReportOwner ? "Annulla" : "Chiudi" }}
        </v-btn>
        <v-btn
          @click="save()"
          :loading="loading"
          variant="elevated"
          elevation="0"
          color="primary"

          v-if="isReportOwner"
        >
          Salva
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { useReportsStore } from "@/stores/reports";
import { useAuthStore } from "@/stores/auth";
import { useProfilesStore } from "@/stores/profiles";
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
      auth$: useAuthStore(),
      profiles$: useProfilesStore(),
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      dialog: false,
      loading: false,
      id: null,
      creator: null,
      form: defaultForm(),
    };
  },
  validations() {
    const date = new Date();

    return {
      form: {
        position: { required },
        description: { required },
        gravity: { required },
        peoplePresent: { required },
      },
    };
  },
  computed: {
    isReportOwner() {
      if (!this.id) return true;
      return this.auth$.uid === this.form.createdBy;
    },
  },
  methods: {
    async close() {
      this.dialog = false;
    },
    async open(report) {
      if (report) {
        this.id = report.id;
        this.form = report;
        this.creator = await this.profiles$.GET(report.createdBy);
      } else {
        this.id = null;
        this.form = defaultForm();
        this.creator = null;
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
    async deleteReport() {
      try {
        await this.reports$.DELETE(this.id);
        this.close();
      } catch (e) {
        console.log(e);
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
