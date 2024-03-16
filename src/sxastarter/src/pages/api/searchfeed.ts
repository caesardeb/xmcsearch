import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import config from 'temp/config';
import { siteResolver } from 'lib/site-resolver';

export type RawStartItemGqlData = {
  layout: {
    item: {
      id: string;
      path: string;
    };
  };
};

export type RawGqlData = {
  pageOne: {
    results: [
      {
        url: { url: string };
        title: {
          jsonValue: {
            value: string;
          };
        };
        id: string;
        name: string;
      }
    ];
  };
};

type ProductData = {
  id: string;
  name?: string;
  gtin?: string;
  title: string;
  brand?: string;
  variant?: string;
  image_link?: string;
  product_url?: string;
  product_line?: string;
  description?: string;
  category?: string;
  subCategory?: string;
};

const mikMakProductFeed = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.setHeader('Content-Type', 'text/json');
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const hostName = _req.headers['host']?.split(':')[0] || 'localhost';
  const site = siteResolver.getByHost(hostName);
  const lang = (_req.query['lang'] as string) || site?.language;
  console.log('site:', site);
  console.log('lang:', lang);
  const startItemLookup = await graphQLClient.request<RawStartItemGqlData>(startItemQuery, {
    language: lang,
    site: site?.name,
  });
  const startItem = startItemLookup.layout?.item?.id;
  console.log('startItem:', startItem);

  //const searchService = new SearchQueryService<RawGqlData>(graphQLClient as GraphQLClient);
  const results = await graphQLClient.request<RawGqlData>(query, {
    language: lang,
    rootItemId: startItem, // 'EEC189D3139348448DE01BBB66875517',
    templates: '908FAFF629034AE482125587A634714F',
  });

  console.log('Search feed: ', results?.pageOne?.results);

  const productList: ProductData[] = [];

  results?.pageOne?.results?.forEach((data) => {
    if (data?.id != undefined) {
      const product: ProductData = {
        id: data?.id,
        title: data?.title?.jsonValue?.value,
        product_url: data?.url?.url,
        name: data?.name,
      };
      productList.push(product);
    }
  });

  return res.status(200).send(productList);
};

const startItemQuery = /* GraphQL */ `
  query StartItemQuery($language: String!, $site: String!) {
    layout(language: $language, site: $site, routePath: "/") {
      item {
        id
        path
      }
    }
  }
`;

const query = /* GraphQL */ `
  query indexQuery($language: String!, $rootItemId: String!, $templates: String!) {
    pageOne: search(
      where: {
        AND: [
          { name: "_language", value: $language, operator: EQ }
          { name: "_path", value: $rootItemId, operator: CONTAINS }
          { name: "_templates", value: $templates, operator: CONTAINS }
        ]
      }
      first: 300
    ) {
      total
      results {
        url {
          url
        }
        id
        name

        title: field(name: "Title") {
          jsonValue
        }
      }
    }
  }
`;

export default mikMakProductFeed;
