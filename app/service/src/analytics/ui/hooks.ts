import { useEffect, useState } from "react";

const useQuery = < T,>(fn: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const stream = await fn();
      setData(stream);
      setIsLoading(false);
    })();
  }, []); // Ignore the {fn} dependency

  return {
    isLoading,
    data,
  }
}

export {useQuery}
