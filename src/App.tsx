import "./App.css";
import Dog from "./types/Dog";
import { useState } from "react";
import { getBreeds, getDogs } from "./services/api";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {
  Button,
  SimpleGrid,
  HStack,
  ListCollection,
  Stack,
  Input,
} from "@chakra-ui/react";
import { DogCard } from "./components/custom/DogCard";
import { MatchActionBar } from "./components/custom/MatchActionBar";
import { FavoritesBar } from "./components/custom/FavoritesBar";

function App() {
  const [isAscending, setIsAscending] = useState(false);
  const [isDrawerHidden, setIsDrawerHidden] = useState(true);
  const dogs: Dog[] = getDogs();
  const breeds: ListCollection = getBreeds();

  const doNothing = () => {
    console.log("I HAVE NOTING");
  };
  const [sortedDogs, setSortedDogs] = useState([
    ...dogs.sort((a, b) => a.breed.localeCompare(b.breed)),
  ]);

  const [favorites, setFavorites] = useState(new Map<string, Dog>());
  const [isHidden, setIsHidden] = useState(false);

  const switchSort = () => {
    setIsAscending(!isAscending);
    setSortedDogs([...sortedDogs.reverse()]);
  };

  const handleFavorite = (dog: Dog) => {
    if (favorites.has(dog.id)) {
      favorites.delete(dog.id);
    } else {
      favorites.set(dog.id, dog);
    }
    setFavorites(new Map<string, Dog>(favorites));
  };

  const clearFavorites = () => {
    setFavorites(new Map<string, Dog>());
  };
  return (
    <Stack>
      <HStack>
        <Button onClick={switchSort}>
          {isAscending ? <p>Sort Ascending</p> : <p>Sort Descending</p>}
        </Button>
        <Input placeholder="Search Dogs" />
        <Button>Search</Button>
      </HStack>

      <SimpleGrid columns={[2, null, 3]} gap="40px" mt={5}>
        {sortedDogs.map((dog) => (
          <DogCard
            dog={dog}
            favorites={favorites}
            handleFavorite={handleFavorite}
          ></DogCard>
        ))}
      </SimpleGrid>

      <HStack>
        <Button onClick={() => setIsHidden(!isHidden)}>
          <FaArrowAltCircleLeft />
          Hide
        </Button>
        <MatchActionBar
          isHidden={isHidden}
          setIsDrawerHidden={setIsDrawerHidden}
          favorites={favorites}
          clearFavorites={clearFavorites}
        ></MatchActionBar>
      </HStack>

      <FavoritesBar
        favorites={favorites}
        handleFavorite={handleFavorite}
        setIsDrawerHidden={setIsDrawerHidden}
        isDrawerHidden={isDrawerHidden}
      ></FavoritesBar>
    </Stack>
  );
}

export default App;
