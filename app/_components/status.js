'use client';

import {
  Text,
  Box,
  Grid,
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

export function Movie({ movie, onClick }) {
  const { title, release_date, vote_average } = movie;
  if (!title || !release_date || !vote_average) return null;
  const year = release_date.split('-')[0];
  const rate = Math.round(vote_average * 10) / 10;
  return (
    <Grid
      templateColumns="40px 1fr 45px"
      p={3}
      alignItems="center"
      gap={2}
      cursor="pointer"
      transition="background 0.2s"
      _hover={{ color: 'blue.100', bg: 'blue.600' }}
      onMouseDown={() => onClick(title)}
    >
      <Badge color="green">{year}</Badge>
      <Text
        truncate
        fontSize="sm"
        fontWeight={500}
      >
        {title}
      </Text>
      <Badge color="blue">
        <HiStar />
        {rate}
      </Badge>
    </Grid>
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
