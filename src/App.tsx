import "./App.css";
import Dog from "./types/Dog";
import { useEffect, useState } from "react";
import { getBreeds, getDogs } from "./services/api";
import { Button, SimpleGrid, HStack, Stack, Input } from "@chakra-ui/react";
import { DogCard } from "./components/custom/DogCard";
import { MatchActionBar } from "./components/custom/MatchActionBar";
import { FavoritesBar } from "./components/custom/FavoritesBar";

function App() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState(new Map<string, Dog>());
  const [isAscending, setIsAscending] = useState(false);
  const [isDrawerHidden, setIsDrawerHidden] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(1);

  const switchSort = () => {
    setIsAscending(!isAscending);
    setDogs([...dogs.reverse()]);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      setDogs(getDogs());
    } catch (e: any) {
      setError(e.message || "Unknown Error.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <div>Is Loading</div>;
  if (error) return <div>Error {error}</div>;

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
        {dogs.map((dog) => (
          <DogCard
            dog={dog}
            favorites={favorites}
            handleFavorite={handleFavorite}
          ></DogCard>
        ))}
      </SimpleGrid>

      <MatchActionBar
        setIsDrawerHidden={setIsDrawerHidden}
        favorites={favorites}
        clearFavorites={clearFavorites}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        finalPage={finalPage}
      ></MatchActionBar>

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
