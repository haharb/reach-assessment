import { ActionBar, Button, HStack, Portal } from "@chakra-ui/react";
import { LuShare, LuTrash2 } from "react-icons/lu";
import Dog from "../../types/Dog";
import { CiViewColumn } from "react-icons/ci";
import { Field } from "../ui/field";

interface MatchActionBarProps {
  setIsDrawerHidden: (val: boolean) => void;
  favorites: Map<string, Dog>;
  clearFavorites: () => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  finalPage: number;
}

export const MatchActionBar: React.FC<MatchActionBarProps> = ({
  setIsDrawerHidden,
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
              onClick={() => setIsDrawerHidden(true)}
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
                Prev
              </Button>
              <Field>
                {currentPage} {finalPage}
              </Field>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(currentPage++)}
              >
                Next
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
