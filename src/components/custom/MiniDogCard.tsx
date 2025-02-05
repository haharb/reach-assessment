import { Button, Card, HStack, Text, Stack, Strong } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import Dog from "../../types/Dog";
import { Avatar } from "../ui/avatar";

interface MiniDogCardProps {
  dog: Dog;
  handleFavorite: (dog: Dog) => void;
}

export const MiniDogCard: React.FC<MiniDogCardProps> = ({
  dog,
  handleFavorite,
}) => {
  return (
    <>
      <Card.Root width="245px">
        <Card.Body>
          <HStack mb="6" gap="3">
            <Avatar src={dog.img} name={dog.name} size="xl" />
            <Stack gap="0">
              <Strong>
                <Text
                  fontWeight="medium"
                  letterSpacing="tight"
                  mt="2"
                  textStyle="xl"
                >
                  {dog.name}
                </Text>
                <Text color="fg.muted" textStyle="sm">
                  {dog.age}
                </Text>
                <Text color="fg.muted" textStyle="sm">
                  {dog.zip_code}
                </Text>
              </Strong>
            </Stack>
          </HStack>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="subtle"
            colorPalette="red"
            flex="1"
            onClick={() => handleFavorite(dog)}
          >
            <LuX />
            Remove
          </Button>
        </Card.Footer>
      </Card.Root>
    </>
  );
};
