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
  SearchResult,
} from '@/components/status';
import useDebounce from '@/hooks/useDebounce';
import searchMovies from '@/apis/search';

export default function Page() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedInput = useDebounce(input, 500);

  // 當 debounced 輸入改變時搜尋電影
  useEffect(() => {
    const keyword = debouncedInput.trim();
    // empty keyword
    if (!keyword) return setResults([]);
    // search movies with keyword
    setIsLoading(true);

    setTimeout(async () => {
      // 模擬 API 延遲
      const lowerKeyword = keyword.toLowerCase();
      const response = await searchMovies(lowerKeyword);
      setResults(response);
      setIsLoading(false);
    }, 200);
  }, [debouncedInput]);

  return (
    <Center mt="10%">
      <Stack w="500px">
        <Input
          value={input}
          placeholder="輸入關鍵字"
          _focus={{ borderColor: 'blue.500' }}
          _focusVisible={{ outline: 'none' }}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <Box
            maxH="400px"
            borderRadius="md"
            boxShadow="md"
            overflowY="auto"
          >
            {isLoading ? (
              <Loading />
            ) : results.length > 0 ? (
              <SearchResult movies={results} />
            ) : (
              <NoResult />
            )}
          </Box>
        )}
      </Stack>
    </Center>
  );
}
