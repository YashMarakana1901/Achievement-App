import axios from "axios";

export const getProduct = (search: string) => {
  return axios.get(`https://dummyjson.com/products/search?q=${search}`);
};

export const createProduct = (data: any) => {
  return axios.post("https://dummyjson.com/products/add", data);
};