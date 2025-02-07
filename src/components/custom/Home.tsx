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
import { SearchBar } from "./SearchBar";

interface HomeProps {
  email: string;
  name: string;
  handleFavorite: (dog: Dog) => void;
}
export const Home: React.FC<HomeProps> = ({ name, handleFavorite }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const switchSort = () => {
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
  return (
    <Stack>
      <SearchBar name={name} switchSort={switchSort}></SearchBar>
      <SimpleGrid columns={[2, null, 3]} gap="40px" mt={5}>
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            handleFavorite={handleFavorite}
          ></DogCard>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
