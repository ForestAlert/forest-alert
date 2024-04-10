<template>
    <div>
        <v-snackbar
            v-model="error"
            top
            color="error"
            timeout="3000"
        >
            {{ errorMessage }}
        </v-snackbar>

        
    </div>
</template>
<script>
import { useSettingsStore } from "@/stores/settings";
export default {
    setup() {
        return {
            settings$: useSettingsStore(),
        };
    },
    data() {
        return {
        
        };
    },
    computed: {
        errorMessage() {
            return this.settings$.errorMessage || "Si è verificato un errore";
        },
        error: {
            get() {
                return this.settings$.error;
            },
            set(value) {
                this.settings$.error = value;
            },
        },
        
    },
    

}
</script>
<style >
    
</style>