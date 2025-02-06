import { LuArrowDownUp } from "react-icons/lu";
import { Stack, Text, HStack, Button, Input } from "@chakra-ui/react";

interface SearchBarProps {
  name: string;
  switchSort: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ name, switchSort }) => {
  return (
    <Stack>
      <Text>Welcome {name}</Text>
      <HStack>
        <Button onClick={switchSort}>
          <LuArrowDownUp></LuArrowDownUp>
        </Button>
        <Input placeholder="Search Dogs" />
        <Button>Filter</Button>
        <Button>Search</Button>
      </HStack>
    </Stack>
  );
};
