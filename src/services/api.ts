import { createListCollection } from "@chakra-ui/react";
import Dog from "../types/Dog";
import axios from "axios";
import { isTokenValid, logout } from "./auth";

const URL = "https://frontend-take-home-service.fetch.com";

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
});

// Make sure token is not expired with every request
api.interceptors.request.use((config) => {
  // Skip token validation for login
  if (config.url && config.url.includes("/login")) return config;

  if (!isTokenValid()) {
    logout();
    return Promise.reject("Token expired.");
  }
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDogs = (): Dog[] => {
  const dogs: Dog[] = [
    {
      id: "u1240",
      img: "https://images.dog.ceo/breeds/stbernard/n02109525_3448.jpg",
      name: "Rex",
      age: 5,
      zip_code: "1001",
      breed: "Golden Retriever",
    },
    {
      id: "u1241",
      img: "https://images.dog.ceo/breeds/airedale/n02096051_1912.jpg",
      name: "Buddy",
      age: 3,
      zip_code: "1002",
      breed: "Labrador",
    },
    {
      id: "u1242",
      img: "https://images.dog.ceo/breeds/pomeranian/n02112018_5208.jpg",
      name: "Max",
      age: 4,
      zip_code: "1003",
      breed: "German Shepherd",
    },
    {
      id: "u1243",
      img: "https://images.dog.ceo/breeds/terrier-lakeland/n02095570_315.jpg",
      name: "Bella",
      age: 2,
      zip_code: "1004",
      breed: "Beagle",
    },
    {
      id: "u1244",
      img: "https://images.dog.ceo/breeds/terrier-fox/n02095314_963.jpg",
      name: "Charlie",
      age: 6,
      zip_code: "1005",
      breed: "Bulldog",
    },
    {
      id: "u1245",
      img: "https://images.dog.ceo/breeds/appenzeller/n02107908_3926.jpg",
      name: "Lucy",
      age: 3,
      zip_code: "1006",
      breed: "Poodle",
    },
    {
      id: "u1246",
      img: "https://images.dog.ceo/breeds/australian-kelpie/Resized_20200303_233358_108952253645051.jpg",
      name: "Daisy",
      age: 4,
      zip_code: "1007",
      breed: "Boxer",
    },
    {
      id: "u1247",
      img: "https://images.dog.ceo/breeds/saluki/n02091831_3310.jpg",
      name: "Rocky",
      age: 5,
      zip_code: "1008",
      breed: "Rottweiler",
    },
    {
      id: "u1248",
      img: "https://images.dog.ceo/breeds/briard/n02105251_8911.jpg",
      name: "Molly",
      age: 2,
      zip_code: "1009",
      breed: "Dachshund",
    },
    {
      id: "u1249",
      img: "https://images.dog.ceo/breeds/greyhound-indian/rampur-greyhound.jpg",
      name: "Cooper",
      age: 3,
      zip_code: "1010",
      breed: "Siberian Husky",
    },
  ];

  return dogs.sort((a: Dog, b: Dog) => a.breed.localeCompare(b.breed));
};

export const getBreeds = () => {
  const breeds = [
    "Husky",
    "Golden Retriever",
    "Labrador",
    "German Shepsherd",
    "Beagle",
    "Bulldog",
    "Poodle",
    "Rottweiler",
    "Siberian Husky",
    "Boxer",
    "Dachsund",
  ];
  return createListCollection({
    items: breeds.map((value2) => ({ label: value2, value: value2 })),
  });
};
export default api;
