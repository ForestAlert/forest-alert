<template>
  <v-container fluid class="d-flex align-center justify-center h-100">
    <v-card style="max-width: 400px" width="100%">
      <v-card-title class="pt-3" primary-title> Registrati </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Nome"
              type="text"
              autocomplete="given-name"
              variant="outlined"
              hide-details
              v-model="v$.form.firstName.$model"
              :error="v$.form.firstName.$error"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Cognome"
              type="text"
              autocomplete="family-name"
              variant="outlined"
              hide-details
              v-model="v$.form.lastName.$model"
              :error="v$.form.lastName.$error"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Email"
              type="email"
              autocomplete="email"
              variant="outlined"
              hide-details
              v-model="v$.form.email.$model"
              :error="v$.form.email.$error"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Data di nascita"
              type="date"
              variant="outlined"
              autocomplete="bday"
              hide-details
              v-model="v$.form.birthdate.$model"
              :error="v$.form.birthdate.$error"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Password"
              type="password"
              autocomplete="new-password"
              variant="outlined"
              hide-details
              v-model="v$.form.password.$model"
              :error="v$.form.password.$error"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Conferma Password"
              type="password"
              autocomplete="new-password"
              variant="outlined"
              hide-details
              v-model="v$.form.confirmPassword.$model"
              :error="v$.form.confirmPassword.$error"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-4 pt-2 justify-space-between">
        <v-btn to="/login" :disabled="loading" elevation="0"> Accedi </v-btn>
        <v-btn
          @click="signup()"
          :loading="loading"
          variant="elevated"
          elevation="0"
          color="primary"
        >
          Registrati
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      loading: false,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        birthdate: null,
        password: "",
      },
      confirmPassword: "",
    };
  },
  validations() {
    return {
      form: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        birthdate: { required },
        password: { required, minLength: minLength(8) },

        confirmPassword: {
          sameAsPassword: sameAs(this.form.password),
        },
      },
    };
  },
  methods: {
    async signup() {
      this.v$.form.$touch();

      if (this.v$.form.$invalid) {
        return;
      }
      console.log(this.form);
    },
  },
};
</script>

<style lang="scss"></style>
