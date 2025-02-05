import { ActionBar, Button, Portal } from "@chakra-ui/react";
import { LuShare, LuTrash2 } from "react-icons/lu";
import Dog from "../../types/Dog";
import { CiViewColumn } from "react-icons/ci";

interface MatchActionBarProps {
  isHidden: boolean;
  setIsDrawerHidden: (val: boolean) => void;
  favorites: Map<string, Dog>;
  clearFavorites: () => void;
}

export const MatchActionBar: React.FC<MatchActionBarProps> = ({
  isHidden,
  setIsDrawerHidden,
  favorites,
  clearFavorites,
}) => {
  return (
    <ActionBar.Root open={isHidden}>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger>
              {favorites.size} selected
            </ActionBar.SelectionTrigger>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDrawerHidden(true)}
            >
              <CiViewColumn />
              View Favorites
            </Button>

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
