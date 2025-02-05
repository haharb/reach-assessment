import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { LuUser } from "react-icons/lu";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";

interface LoginProps {
  setIsLoggedIn: (val: boolean) => void;
  setName: (val: string) => void;
  setEmail: (val: string) => void;
}

export const Login: React.FC<LoginProps> = ({
  setIsLoggedIn,
  setName,
  setEmail,
}) => {
  interface FormValues {
    email: string;
    name: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    setName(data.name);
    setEmail(data.email);
    setIsLoggedIn(true);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Text> Please login to continue</Text>
        <Field
          label="Name"
          invalid={!!errors.name}
          errorText={errors.name?.message}
        >
          <InputGroup flex="1" startElement={<LuUser />}>
            <Input {...register("name", { required: "Name is required" })} />
          </InputGroup>
        </Field>

        <Field
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          <InputGroup flex="1" startElement={<LuUser />}>
            <Input {...register("email", { required: "Email is required" })} />
          </InputGroup>
        </Field>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
