import {
  ActionBar,
  Button,
  HStack,
  Input,
  Portal,
  Text,
} from "@chakra-ui/react";
import { LuShare, LuTrash2 } from "react-icons/lu";
import Dog from "../../types/Dog";
import { CiViewColumn } from "react-icons/ci";

interface MatchActionBarProps {
  setisDrawerShown: (val: boolean) => void;
  favorites: Map<string, Dog>;
  clearFavorites: () => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  finalPage: number;
}

export const MatchActionBar: React.FC<MatchActionBarProps> = ({
  setisDrawerShown,
  favorites,
  clearFavorites,
  currentPage,
  setCurrentPage,
  finalPage,
}) => {
  const updatePage = (val: number): void => {
    if (val < 0 || val > finalPage) return;
    setCurrentPage(val);
  };

  return (
    <ActionBar.Root open={true}>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger>
              {favorites.size} selected
            </ActionBar.SelectionTrigger>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setisDrawerShown(true)}
            >
              <CiViewColumn />
              View Favorites
            </Button>
            <ActionBar.Separator />

            <HStack>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(currentPage--)}
              >
                -
              </Button>

              <Input width="0.5" value={currentPage}></Input>
              <Text>{finalPage}</Text>

              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(currentPage++)}
              >
                +
              </Button>
            </HStack>

            <ActionBar.Separator />
            <Button variant="outline" size="sm" onClick={clearFavorites}>
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
  );
};
