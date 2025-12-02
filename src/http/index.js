import axios from "axios";

const language = window.localStorage.getItem("language") || "ru";

export const BACKEND_URL = "https://api.homescare.uz/";
export const API_URL = `${BACKEND_URL}${language}`;

export const $host = axios.create({
  baseURL: API_URL,
  headers: {
    "Accept-Language": language,
  },
});

export const fetchCategories = async () => {
  try {
    const { data } = await $host.get("/products/api/v1/categories/");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchCategoriesFull = async () => {
  try {
    const { data } = await $host.get("/products/test-categories/");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchProducts = async () => {
  try {
    const { data } = await $host.get("/products/api/v1/products/");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchPartners = async () => {
  try {
    const { data } = await axios.get(
      `${BACKEND_URL}en/others/api/v1/partners/`,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
