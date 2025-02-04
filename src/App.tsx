import "./App.css";
import { HiHeart } from "react-icons/hi";
import Dog from "./types/Dog";
import { useState } from "react";
import {
  Button,
  SimpleGrid,
  Image,
  HStack,
  Icon,
  Badge,
  Card,
  SelectRoot,
  SelectLabel,
  SelectValueText,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@chakra-ui/react";

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
const breeds = [
  { name: "Husky" },
  { name: "Golden Retriever" },
  { name: "Labrador" },
  { name: "German Shepsherd" },
  { name: "Beagle" },
  { name: "Bulldog" },
  { name: "Poodle" },
  { name: "Rottweiler" },
  { name: "Siberian Husky" },
  { name: "Boxer" },
  { name: "Dachsund" },
];

function App() {
  const [isAscending, setIsAscending] = useState(false);
  const [sortedDogs, setSortedDogs] = useState([
    ...dogs.sort((a, b) => a.breed.localeCompare(b.breed)),
  ]);

  const [favorites, setFavorites] = useState(new Set());

  const switchSort = () => {
    setIsAscending(!isAscending);
    setSortedDogs([...sortedDogs.reverse()]);
  };

  const handleFavorite = (id: string) => {
    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }
    setFavorites(new Set(favorites));
  };

  return (
    <div>
      <SelectRoot multiple collection={breeds} size="sm" width="320px">
        <SelectLabel>Select framework</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Movie" />
        </SelectTrigger>
        <SelectContent>
          {breeds.map((breed, index) => (
            <SelectItem item={breed} key={index}>
              {breed}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <SimpleGrid columns={[2, null, 3]} gap="40px" mt={5}>
        {sortedDogs.map((dog) => (
          <Card.Root maxW="sm" overflow="hidden" flexDirection="col">
            <Image
              src={dog.img}
              alt={dog.name}
              fit="contain"
              width="300px"
              height="200px"
            />
            <Card.Body gap="2">
              <Card.Title>
                {dog.name}, {dog.age}
              </Card.Title>
              <HStack>
                <Badge>{dog.breed}</Badge>
                <Badge>{dog.zip_code}</Badge>
              </HStack>
              {/* <Card.Description>
                {dog.name}
              </Card.Description> 
              <Text
                textStyle="2xl"
                fontWeight="medium"
                letterSpacing="tight"
                mt="2"
              >
                $450
              </Text>
              */}
            </Card.Body>
            <Card.Footer>
              {favorites.has(dog.id) && (
                <Icon fontSize="2xl" color="pink.700">
                  <HiHeart />
                </Icon>
              )}
              {
                <Button
                  onClick={() => {
                    handleFavorite(dog.id);
                  }}
                >
                  Favorite
                </Button>
              }
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
      <Button onClick={switchSort}>
        {isAscending ? <p>Sort Ascending</p> : <p>Sort Descending</p>}
      </Button>
    </div>
  );
}

export default App;
