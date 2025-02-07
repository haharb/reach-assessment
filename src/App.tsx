import { useState } from "react";
import "./App.css";
import { Home } from "./components/custom/Home";
import { Login } from "./components/custom/Login";
import { Stack } from "@chakra-ui/react";
import { MatchActionBar } from "./components/custom/MatchActionBar";
import { FavoritesBar } from "./components/custom/FavoritesBar";
import Dog from "./types/Dog";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // if (!isLoggedIn)
  //   return (
  //     <Login
  //       setIsLoggedIn={setIsLoggedIn}
  //       setName={setName}
  //       setEmail={setEmail}
  //     ></Login>
  //   );
  const [favorites, setFavorites] = useState(new Map<string, Dog>());
  const [isDrawerShown, setisDrawerShown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(1);

  const handleFavorite = (dog: Dog) => {
    if (favorites.has(dog.id)) {
      favorites.delete(dog.id);
    } else {
      favorites.set(dog.id, dog);
    }
  };
  const clearFavorites = () => {
    setFavorites(new Map<string, Dog>());
  };

  return (
    <Stack>
      <Home email={email} name={name} handleFavorite={handleFavorite}></Home>
      <MatchActionBar
        setisDrawerShown={setisDrawerShown}
        clearFavorites={clearFavorites}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        finalPage={finalPage}
        favoritesCount={favorites.size}
      ></MatchActionBar>

      <FavoritesBar
        favorites={favorites}
        handleFavorite={handleFavorite}
        setisDrawerShown={setisDrawerShown}
        isDrawerShown={isDrawerShown}
      ></FavoritesBar>
    </Stack>
  );
}

export default App;
