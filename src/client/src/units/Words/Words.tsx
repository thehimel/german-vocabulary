import { useState, useEffect } from 'react';
import axios from 'axios';
import Word from './Word.tsx';

export default function Words() {
  const [wordsData, setWordsData] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/words');
        setWordsData(response.data);
      } catch (error) {
        setError(error as Error);
      }
    }

    fetchData().then(() => null);
  }, []);

  if (error) {
      return <div>Error: {(error as unknown as Error).message}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-2">
        {wordsData.map((item, index) => (
          <Word key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
