import { defineStore } from "pinia";
import { firebaseAuth, firebaseStore } from "../plugins/firebase";




const defaultState = ()=>({
    user: null
})
export const useAuthStore = defineStore({
    state: defaultState,


    actions: {
        
    }
})