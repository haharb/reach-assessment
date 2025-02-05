import { Button } from "@chakra-ui/react";
import Dog from "../../types/Dog";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "../ui/drawer";
import { MiniDogCard } from "./MiniDogCard";

interface FavoritesBarProps {
  favorites: Map<string, Dog>;
  handleFavorite: (dog: Dog) => void;
  setisDrawerShown: (value: boolean) => void;
  isDrawerShown: boolean;
}

export const FavoritesBar: React.FC<FavoritesBarProps> = ({
  favorites,
  handleFavorite,
  setisDrawerShown,
  isDrawerShown,
}) => {
  return (
    <DrawerRoot placement="start" open={isDrawerShown}>
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Favorited Dogs</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {Array.from(favorites.values()).map((dog) => (
            <MiniDogCard
              dog={dog}
              handleFavorite={handleFavorite}
            ></MiniDogCard>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setisDrawerShown(false)}>
            Cancel
          </Button>
          {favorites.size !== 0 && <Button>Match</Button>}
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
