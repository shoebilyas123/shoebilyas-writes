import { configureStore } from "@reduxjs/toolkit";
import newsletterReducer from "./slice/newsletter";

const store = configureStore({
  reducer: {
    newsletter: newsletterReducer,
  },
});

export default store;
