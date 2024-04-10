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
            <v-img
              v-if="form.image"
              :src="fileUrl"
              width="100%"
              height="200"
              class="mb-2"
              @click="openImage"
            ></v-img>
            <v-file-input
              v-model="file"
              :label="form.image ? 'Cambia immagine' : 'Carica immagine '"
              variant="outlined"
              hide-details
              :readonly="!isReportOwner"
              accept="image/*"

            />
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
      file: null,
      fileUrl: null,
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
    async openImage() {
      window.open(this.fileUrl, "_blank");
    },
    async open(report) {
      if (report) {
        this.id = report.id;
        this.form = report;
        this.creator = await this.profiles$.GET(report.createdBy);
        this.file = null;
        if (report.image) {
          try {

            this.fileUrl = await this.reports$.DOWNLOAD_IMAGE(report.id, report.image);
          } catch (e) {
            this.fileUrl = null;
            this.showErrorMessage("Errore durante il download dell'immagine");
          }
        } else {
          this.fileUrl = null;

        }

      } else {
        this.id = null;
        this.form = defaultForm();
        this.creator = null;
        this.file = null;
        this.v$.form.$reset();
      }
      this.dialog = true;
    },
    async save() {
      this.v$.form.$touch();
      if (this.v$.form.$invalid) {
        return;
      }
      this.loading = true;
      try {
        if (this.id) {
          var id = await this.reports$.UPDATE(this.id, this.form);
        } else {
          var id = await this.reports$.CREATE(this.form);
        }
        if (this.file) {
          try {

            await this.reports$.UPLOAD_IMAGE(id, this.file, this.file.name);
          } catch (e) {
            this.showErrorMessage("Errore durante il caricamento dell'immagine");
          }
        }
        this.dialog = false;
      } catch (e) {
        this.showErrorMessage("Errore durante il salvataggio");
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
        this.showErrorMessage("Errore durante l'eliminazione");
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
