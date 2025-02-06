import React, { useState } from "react";
import { Badge, Card, HStack, Icon, Image } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { FaDog, FaGlobeAmericas } from "react-icons/fa";
import Dog from "@/types/Dog";
import { HiHeart } from "react-icons/hi";

interface DogCardProps {
  dog: Dog;
  favorites: Map<string, Dog>;
  handleFavorite: (dog: Dog) => void;
}

export const DogCard: React.FC<DogCardProps> = ({
  dog,
  favorites,
  handleFavorite,
}) => {
  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      flexDirection="col"
      onDoubleClick={() => handleFavorite(dog)}
    >
      <Image
        src={dog.img}
        alt={dog.name}
        fit="contain"
        width="300px"
        height="200px"
      />
      <Card.Body gap="1">
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

          {favorites.has(dog.id) && (
            <Icon fontSize="2xl" color="red">
              <HiHeart />
            </Icon>
          )}
        </HStack>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card.Root>
  );
};
