import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js"
import rootReducer from "./rootreducer.js";
import { authApi } from "@/features/api/authApi.js";
export const appStore=configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware)
})

const initializeApp=async()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}));
}
initializeApp()