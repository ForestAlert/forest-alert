import { useSettingsStore } from "@/stores/settings";
export default {

    methods: {
        /**
         * Format a date to a string
         * @param {Date} date
         * @returns {String}
         */
        formatDate(date) {
            if (!date) return "";
            var day = date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
            var time = date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
            return `${day} ${time}`;

        },
        showErrorMessage(message) {
            const settings = useSettingsStore()
            settings.error = true
            settings.errorMessage = message 
        }
    },
}