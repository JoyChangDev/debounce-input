'use client';

import {
  Center,
  Stack,
  Input,
  Box,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  Loading,
  NoResult,
  Movie,
} from '@/components/status';
import useDebounce from '@/hooks/useDebounce';
import getMovies from '@/apis/movies';

export default function Page() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedInput = useDebounce(input, 500);

  const handleGetMovies = async (keyword) => {
    const { results } = await getMovies(keyword);
    setResults(results);
    setIsLoading(false);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    setIsOpen(!!e.target.value);
  };
  const handleClick = (value) => setInput(value);

  // 當 debounced 輸入改變時搜尋電影
  useEffect(() => {
    setIsLoading(true);
    // empty keyword
    if (!debouncedInput.trim()) return setResults([]);
    // search movies with keyword
    const keyword = debouncedInput
      .toLowerCase()
      .trim()
      .split(' ')
      .join(',');
    handleGetMovies(keyword);
  }, [debouncedInput]);

  return (
    <Center pt="10%">
      <Stack w="500px">
        <Input
          value={input}
          placeholder="輸入關鍵字"
          _focus={{ borderColor: 'blue.500' }}
          _focusVisible={{ outline: 'none' }}
          onChange={handleInput}
          onBlur={() => setIsOpen(false)}
        />
        {isOpen && (
          <Box
            maxH="400px"
            borderRadius="md"
            boxShadow="md"
            overflowY="auto"
          >
            {isLoading ? (
              <Loading />
            ) : results.length > 0 ? (
              <Stack gap={0}>
                {results.map((movie) => (
                  <Movie
                    key={movie.id}
                    movie={movie}
                    onClick={handleClick}
                  />
                ))}
              </Stack>
            ) : (
              <NoResult />
            )}
          </Box>
        )}
      </Stack>
    </Center>
  );
}
