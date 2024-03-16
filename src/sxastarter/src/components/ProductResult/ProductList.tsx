import React from 'react';
import { WidgetsProvider } from '@sitecore-search/react';
import ProductResultsWidget from 'src/widgets/ProductResults';

const ProductList = () => {
  return (
    <section className="bg-[#F4F6F5]">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div>Hello</div>
        <div className="mr-auto place-self-center lg:col-span-7 p-5 lg:pr-0">
          <WidgetsProvider
            apiKey="01-13ffbe51-d21f5f73795b1972dd1ebb5df7b2a92c54af842d"
            customerKey="94826063-106207387"
            env="prodEu"
            publicSuffix={true}
          >
            <ProductResultsWidget rfkId="rfkid_24" />
          </WidgetsProvider>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
