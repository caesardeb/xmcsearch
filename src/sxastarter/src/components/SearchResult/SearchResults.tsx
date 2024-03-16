import React from 'react';
import SearchResultsWidget from 'src/widgets/SearchResults';
import { WidgetsProvider } from '@sitecore-search/react';
import { useSearchParams } from 'next/navigation';

const SearchResults = (): JSX.Element => {
  const useKeyphrase = (): string => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    return searchQuery;
  };
  return (
    <section className="search-result max-w-screen-xl mx-auto py-24 px-6">
        <WidgetsProvider
        apiKey="01-13ffbe51-d21f5f73795b1972dd1ebb5df7b2a92c54af842d"
        customerKey="94826063-106207387"
        env="prodEu"
        publicSuffix={true}
        >
            <SearchResultsWidget
              rfkId="rfkid_24"
              defaultKeyphrase={useKeyphrase()}
              key={`${useKeyphrase()}-search`}
            />
        </WidgetsProvider>
    </section>
  );
};

export default SearchResults;
