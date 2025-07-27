'use client';

import {
  Stack,
  Text,
  Box,
  HStack,
  Grid,
  Flex,
  Badge as ChakraBadge,
} from '@chakra-ui/react';
import { HiStar } from 'react-icons/hi';

export function Loading() {
  return (
    <Box
      p={4}
      textAlign="center"
    >
      <Text color="gray.500">搜尋中...</Text>
    </Box>
  );
}

export function NoResult() {
  return (
    <Box
      p={4}
      textAlign="center"
    >
      <Text color="gray.500">沒有找到相關結果</Text>
    </Box>
  );
}

export function SearchResult({ movies }) {
  return (
    <Stack gap={0}>
      {movies.map((movie) => (
        <Grid
          key={movie.id}
          templateColumns="1fr 45px"
          p={3}
          alignItems="center"
          transition="background 0.2s"
          _hover={{ bg: 'gray.50' }}
        >
          <Stack spacing={1}>
            <Flex gap={2}>
              <Badge color="green">{movie.year}</Badge>
              <Text fontWeight="bold">{movie.title}</Text>
            </Flex>
            <HStack>
              <Badge color="purple">{movie.genre}</Badge>
            </HStack>
          </Stack>
          <Badge color="blue">
            <HiStar />
            {movie.rating}
          </Badge>
        </Grid>
      ))}
    </Stack>
  );
}

const Badge = ({ color, children }) => {
  return (
    <ChakraBadge
      colorPalette={color}
      fontSize="xs"
    >
      {children}
    </ChakraBadge>
  );
};
