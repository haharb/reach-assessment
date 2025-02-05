import Dog from "../../types/Dog";
import { useEffect, useState } from "react";
import { getBreeds, getDogs } from "../../services/api";
import {
  Button,
  SimpleGrid,
  HStack,
  Stack,
  Input,
  Text,
} from "@chakra-ui/react";
import { DogCard } from "./DogCard";
import { MatchActionBar } from "./MatchActionBar";
import { FavoritesBar } from "./FavoritesBar";

interface HomeProps {
  email: string;
  name: string;
}
export const Home: React.FC<HomeProps> = ({ email, name }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState(new Map<string, Dog>());
  const [isDescending, setIsDescending] = useState(false);
  const [isDrawerShown, setisDrawerShown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(1);

  const switchSort = () => {
    setIsDescending(!isDescending);
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
      <Text>Welcome {name}</Text>
      <HStack>
        <Button onClick={switchSort}>
          {isDescending ? <p>Sort Ascending</p> : <p>Sort Descending</p>}
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
        setisDrawerShown={setisDrawerShown}
        favorites={favorites}
        clearFavorites={clearFavorites}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        finalPage={finalPage}
      ></MatchActionBar>

      <FavoritesBar
        favorites={favorites}
        handleFavorite={handleFavorite}
        setisDrawerShown={setisDrawerShown}
        isDrawerShown={isDrawerShown}
      ></FavoritesBar>
    </Stack>
  );
};
