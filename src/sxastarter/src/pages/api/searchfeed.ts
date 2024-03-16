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
        id: string;
        name: string;
        searchTitle: {
          jsonValue: {
            value: string;
          };
        };
        searchDescription: {
          jsonValue: {
            value: string;
          };
        };
        searchImage: {
          jsonValue: {
            value: string;
          };
        };
        searchPageType: {
          jsonValue: {
            value: string;
          };
        };
        category: {
          jsonValue: {
            value: string;
          };
        };
        subCategory: {
          jsonValue: {
            value: string;
          };
        };
        hidefromSearch: {
          jsonValue: {
            value: boolean;
          };
        };
      }
    ];
  };
};

type ProductData = {
  url: string;
  id: string;
  name?: string;
  searchTitle: string;
  searchDescription?: string;
  searchImage?: string;
  searchPageType?: string;
  category?: string;
  subCategory?: string;
  hidefromSearch?: boolean;
};

const mikMakProductFeed = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.setHeader('Content-Type', 'text/json');
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const hostName = _req.headers['host']?.split(':')[0] || 'localhost';
  const site = siteResolver.getByHost(hostName);
  const lang = (_req.query['lang'] as string) || site?.language;
  const startItemLookup = await graphQLClient.request<RawStartItemGqlData>(startItemQuery, {
    language: lang,
    site: site?.name,
  });
  const startItem = startItemLookup.layout?.item?.id;

  //const searchService = new SearchQueryService<RawGqlData>(graphQLClient as GraphQLClient);
  const results = await graphQLClient.request<RawGqlData>(query, {
    language: lang,
    rootItemId: startItem, // 'EEC189D3139348448DE01BBB66875517',
    templates: '908FAFF629034AE482125587A634714F',
  });

  const productList: ProductData[] = [];

  results?.pageOne?.results?.forEach((data) => {
    if (data?.id != undefined) {
      const product: ProductData = {
        id: data?.id,
        searchTitle: data?.searchTitle?.jsonValue?.value,
        searchDescription: data?.searchDescription?.jsonValue?.value,
        searchImage: data?.searchImage?.jsonValue?.value,
        searchPageType: data?.searchPageType?.jsonValue?.value,
        category: data?.category?.jsonValue?.value,
        subCategory: data?.subCategory?.jsonValue?.value,
        hidefromSearch: data?.hidefromSearch?.jsonValue?.value,
        name: data?.name,
        url: data?.url?.url,
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
      results {
        url {
          url
          path
        }
        id
        name
        hidefromSearch: field(name: "hidefromSearch") {
          jsonValue
        }
        searchTitle: field(name: "searchTitle") {
          jsonValue
        }
        searchDescription: field(name: "searchDescription") {
          jsonValue
        }
        searchImage: field(name: "searchImage") {
          jsonValue
        }
        searchPageType: field(name: "searchPageType") {
          jsonValue
        }
        category: field(name: "category") {
          jsonValue
        }
        subCategory: field(name: "subCategory") {
          jsonValue
        }
      }
    }
  }
`;

export default mikMakProductFeed;
