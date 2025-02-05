import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { LuUser } from "react-icons/lu";
import { Field } from "../ui/field";
interface LoginProps {}

export const Pagination: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log(email);
    console.log(name);
  };

  return (
    <Stack>
      <Text> Please login to continue</Text>
      <Field invalid label="Email" errorText="This field is required">
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input placeholder="Email" value={email} />
        </InputGroup>
      </Field>
      <Field invalid label="Name" errorText="This field is required">
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input placeholder="Name" value={name} />
        </InputGroup>
      </Field>
      <Button onClick={handleSubmit}></Button>
    </Stack>
  );
};
