import "./App.css";
import { HiHeart } from "react-icons/hi";
import Dog from "./types/Dog";
import { useState } from "react";
import { getBreeds, getDogs } from "./services/api";
import {
  FaArrowAltCircleLeft,
  FaArrowLeft,
  FaGlobeAmericas,
  FaDog,
} from "react-icons/fa";

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
  ListCollection,
  Stack,
  Text,
  Input,
  ActionBarRoot,
  ActionBarContent,
  ActionBarSeparator,
  ActionBarSelectionTrigger,
  ActionBarCloseTrigger,
  ActionBar,
  Portal,
} from "@chakra-ui/react";
import { Field } from "./components/ui/field";
import { LuShare, LuTrash2 } from "react-icons/lu";
import { Tooltip } from "./components/ui/tooltip";

function App() {
  const [isAscending, setIsAscending] = useState(false);
  const dogs: Dog[] = getDogs();
  const breeds: ListCollection = getBreeds();

  const doNothing = () => {
    console.log("I HAVE NOTING");
  };
  const [sortedDogs, setSortedDogs] = useState([
    ...dogs.sort((a, b) => a.breed.localeCompare(b.breed)),
  ]);

  const [favorites, setFavorites] = useState(new Set());
  const [isHidden, setIsHidden] = useState(false);

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
    <>
      <Stack>
        <HStack>
          <Button onClick={switchSort}>
            {isAscending ? <p>Sort Ascending</p> : <p>Sort Descending</p>}
          </Button>
          <Input placeholder="Search Dogs" />

          <Button>Search</Button>
          {/* <SelectRoot multiple collection={breeds}>
            <SelectLabel>Select framework</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Movie" />
            </SelectTrigger>
            <SelectContent>
              {breeds.items.map((breed, index) => (
                <SelectItem item={breed} key={index}>
                  {breed}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot> */}
        </HStack>

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
                  <Tooltip content="Breed">
                    <Badge>
                      <FaDog />
                      {dog.breed}
                    </Badge>
                  </Tooltip>

                  <Tooltip content="Zip Code">
                    <Badge>
                      <FaGlobeAmericas />
                      {dog.zip_code}
                    </Badge>
                  </Tooltip>
                </HStack>
                {/* <Card.Description>{dog.name}</Card.Description> 
                <Text
                  textStyle="2xl"
                  fontWeight="medium"
                  letterSpacing="tight"
                  mt="2"
                >
                  $450
                </Text>*/}
              </Card.Body>
              <Card.Footer>
                {favorites.has(dog.id) && (
                  <Icon fontSize="2xl" color="pink.700">
                    <HiHeart />
                  </Icon>
                )}
                <Button
                  onClick={() => {
                    handleFavorite(dog.id);
                  }}
                >
                  Favorite
                </Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Stack>
      <HStack>
        <Button onClick={() => setIsHidden(!isHidden)}>
          <FaArrowAltCircleLeft />
          Hide
        </Button>
        <ActionBar.Root open={isHidden}>
          <Portal>
            <ActionBar.Positioner>
              <ActionBar.Content>
                <ActionBar.SelectionTrigger>
                  {favorites.size} selected
                </ActionBar.SelectionTrigger>
                <ActionBar.Separator />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFavorites(new Set())}
                >
                  <LuTrash2 />
                  Clear
                </Button>
                <Button variant="outline" size="sm">
                  <LuShare />
                  Match
                </Button>
              </ActionBar.Content>
            </ActionBar.Positioner>
          </Portal>
        </ActionBar.Root>
      </HStack>
    </>
  );
}

export default App;
