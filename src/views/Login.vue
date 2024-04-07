<template>
  <v-container
    fluid
    class="d-flex align-center justify-center"
    style="height: 90%"
  >
    <div style="max-width: 400px" class="w-100">
      <div class="d-flex flex-column align-center w-100 pb-3" style="gap: 10px">
        <v-img class="w-50" src="/logo.png" />
        <h2>Forest Alert</h2>
      </div>
      <v-card width="100%">
        <v-card-title class="pt-3" primary-title> Accedi </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Email"
                type="email"
                autocomplete="username"
                variant="outlined"
                hide-details
                v-model="v$.form.email.$model"
                :error="v$.form.email.$error"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password"
                type="password"
                autocomplete="current-password"
                variant="outlined"
                hide-details
                v-model="v$.form.password.$model"
                :error="v$.form.password.$error"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-4 pt-2 justify-space-between">
          <v-btn to="/signup" :disabled="loading" elevation="0">
            registrati
          </v-btn>
          <v-btn
            @click="login()"
            :loading="loading"
            variant="elevated"
            elevation="0"
            color="primary"
          >
            Accedi
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
export default {
  setup() {
    return {
      v$: useVuelidate(),
      auth$: useAuthStore(),
    };
  },

  data() {
    return {
      loading: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(8) },
      },
    };
  },
  methods: {
    async login() {
      this.v$.form.$touch();
      if (this.v$.form.$invalid) {
        return;
      }
      try {
        this.loading = true;
        await this.auth$.LOGIN(this.form);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss"></style>
