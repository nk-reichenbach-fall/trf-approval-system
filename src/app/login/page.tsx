"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  FormControl,
  FormLabel,
  VStack,
  Text,
} from "@chakra-ui/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      window.location.href = "/"; // redirect after login
    }
  }

  return (
    <Box w="100%" maxW="400px" mx="auto" mt="100px">
      <Heading mb="6" textAlign="center">
        Login
      </Heading>

      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          {error && <Text color="red.500">{error}</Text>}

          <Button type="submit" colorScheme="blue" w="100%">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
