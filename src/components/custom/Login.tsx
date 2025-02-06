import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { LuUser } from "react-icons/lu";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { login } from "../../services/auth";

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
    try {
      console.log(`The data is ${data.email} and ${data.name}`);
      login(data.name, data.email);
      setName(data.name);
      setEmail(data.email);
      setIsLoggedIn(true);
    } catch (e: any) {
      console.error(`ERROR logging in ${e}`);
    }
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
            <Input
              {...register("name", {
                required: "Name is required",
                pattern: /^[A-Za-z]+$/i,
              })}
            />
          </InputGroup>
        </Field>

        <Field
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          <InputGroup flex="1" startElement={<LuUser />}>
            <Input
              {...register("email", {
                required: "Email is required",
                // Simple pattern, something@something.something, not meant to be all exclusive
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
          </InputGroup>
        </Field>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
