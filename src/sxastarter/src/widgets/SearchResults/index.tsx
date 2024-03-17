import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons';
import type {
  FacetPayloadType,
  SearchResultsInitialState,
  SearchResultsStoreState,
} from '@sitecore-search/react';
import {
  WidgetDataType,
  useSearchResults,
  useSearchResultsSelectedFilters,
  widget,
} from '@sitecore-search/react';
import { Pagination, Presence, Select, SortSelect } from '@sitecore-search/ui';
import { SearchResultsStoreSelectedFacet } from '@sitecore-search/widgets';
import {
  AccordionFacetsStyled,
  FiltersStyled,
  GridStyled,
  LoaderAnimation,
  LoaderContainer,
  PageControlsStyled,
  PaginationStyled,
  QuerySummaryStyled,
  SearchResultsLayout,
  SelectStyled,
  SortSelectStyled,
} from './styled';

type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  description?: string;
  url?: string;
  image_url?: string;
  source_id?: string;
  category?: string;
  subCategory?: string;
};

type ArticleSearchResultsProps = {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
};

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page' | 'sortType'>;

const buildRangeLabel = (min: number | undefined, max: number | undefined): string => {
  return typeof min === 'undefined'
    ? `< $${max}`
    : typeof max === 'undefined'
    ? ` > $${min}`
    : `$${min} - $${max}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildFacetLabel = (
  selectedFacet: SearchResultsStoreSelectedFacet & { type: FacetPayloadType }
) => {
  if ('min' in selectedFacet || 'max' in selectedFacet) {
    return `${selectedFacet.facetLabel}: ${buildRangeLabel(selectedFacet.min, selectedFacet.max)}`;
  }
  return `${selectedFacet.facetLabel}: ${selectedFacet.valueLabel}`;
};

export const SearchResultsComponent = ({
  defaultSortType = 'featured_desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 24,
}: ArticleSearchResultsProps) => {
  const {
    widgetRef,
    actions: {
      onResultsPerPageChange,
      onPageNumberChange,
      onItemClick,
      onRemoveFilter,
      onSortChange,
      onFacetClick,
      onClearFilters,
    },
    state: { sortType, page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: {
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
        content: articles = [],
      } = {},
    },
  } = useSearchResults<ArticleModel, InitialState>({
    query: (query) => {
      query
        .getRequest()
        .setSources(['969172'])
        .setSearchFacetAll(false)
        .setSearchFacetTypes([
          {
            name: 'type',
          },
        ])
        .getSearchFacet();
    },
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: defaultKeyphrase,
    },
  });
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const selectedSortIndex = sortChoices.findIndex((s) => s.name === sortType);
  const selectedFacetsFromApi = useSearchResultsSelectedFilters();
  if (isLoading) {
    return (
      <LoaderContainer>
        <Presence present={true}>
          <LoaderAnimation
            aria-busy={true}
            aria-hidden={false}
            focusable="false"
            role="progressbar"
            viewBox="0 0 20 20"
          >
            <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
          </LoaderAnimation>
        </Presence>
      </LoaderContainer>
    );
  }
  return (
    <SearchResultsLayout.Wrapper ref={widgetRef}>
      <SearchResultsLayout.MainArea>
        {isFetching && (
          <LoaderContainer>
            <Presence key={defaultKeyphrase} present={true}>
              <LoaderAnimation
                aria-busy={true}
                aria-hidden={false}
                focusable="false"
                role="progressbar"
                viewBox="0 0 20 20"
              >
                <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
              </LoaderAnimation>
            </Presence>
          </LoaderContainer>
        )}
        {totalItems > 0 && (
          <>
            <SearchResultsLayout.LeftArea>
              {selectedFacetsFromApi.length > 0 && (
                <FiltersStyled.ClearFilters onClick={onClearFilters}>
                  Clear Filters
                </FiltersStyled.ClearFilters>
              )}
              <FiltersStyled.SelectedFiltersList>
                {selectedFacetsFromApi.map((selectedFacet) => (
                  <FiltersStyled.SelectedFiltersListItem
                    key={`${selectedFacet.facetId}${selectedFacet.facetLabel}${selectedFacet.valueLabel}`}
                  >
                    <FiltersStyled.SelectedFiltersListItemText>
                      {buildFacetLabel(selectedFacet)}
                    </FiltersStyled.SelectedFiltersListItemText>
                    <FiltersStyled.SelectedFiltersListItemButton
                      onClick={() => onRemoveFilter(selectedFacet)}
                    >
                      X
                    </FiltersStyled.SelectedFiltersListItemButton>
                  </FiltersStyled.SelectedFiltersListItem>
                ))}
              </FiltersStyled.SelectedFiltersList>
              <AccordionFacetsStyled.Root
                defaultFacetTypesExpandedList={[]}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onFacetTypesExpandedListChange={() => {}}
                onFacetValueClick={onFacetClick}
              >
                {facets.map((f) => (
                  <AccordionFacetsStyled.Facet facetId={f.name} key={f.name}>
                    <AccordionFacetsStyled.Header>
                      <AccordionFacetsStyled.Trigger>{f.label}</AccordionFacetsStyled.Trigger>
                    </AccordionFacetsStyled.Header>
                    <AccordionFacetsStyled.Content>
                      <AccordionFacetsStyled.ValueList>
                        {f.value.map((v, index) => (
                          <AccordionFacetsStyled.Item {...{ index, facetValueId: v.id }} key={v.id}>
                            <AccordionFacetsStyled.ItemCheckbox>
                              <AccordionFacetsStyled.ItemCheckboxIndicator>
                                <CheckIcon />
                              </AccordionFacetsStyled.ItemCheckboxIndicator>
                            </AccordionFacetsStyled.ItemCheckbox>
                            <AccordionFacetsStyled.ItemCheckboxLabel>
                              {v.text} {v.count && `(${v.count})`}
                            </AccordionFacetsStyled.ItemCheckboxLabel>
                          </AccordionFacetsStyled.Item>
                        ))}
                      </AccordionFacetsStyled.ValueList>
                    </AccordionFacetsStyled.Content>
                  </AccordionFacetsStyled.Facet>
                ))}
              </AccordionFacetsStyled.Root>
            </SearchResultsLayout.LeftArea>
            <SearchResultsLayout.RightArea>
              {/* Sort Select */}
              <SearchResultsLayout.RightTopArea>
                {totalItems > 0 && (
                  <QuerySummaryStyled>
                    Showing {itemsPerPage * (page - 1) + 1} -{' '}
                    {itemsPerPage * (page - 1) + articles.length} of {totalItems} results
                  </QuerySummaryStyled>
                )}
                <SortSelect.Root
                  defaultValue={sortChoices[selectedSortIndex]?.name}
                  onValueChange={onSortChange}
                >
                  <SortSelectStyled.Trigger>
                    <SortSelectStyled.SelectValue>
                      {selectedSortIndex > -1 ? sortChoices[selectedSortIndex].label : ''}
                    </SortSelectStyled.SelectValue>
                    <SortSelectStyled.Icon />
                  </SortSelectStyled.Trigger>
                  <SortSelectStyled.Content>
                    <SortSelectStyled.Viewport>
                      {sortChoices.map((option) => (
                        <SortSelectStyled.Option value={option} key={option.name}>
                          <SortSelectStyled.OptionText>{option.label}</SortSelectStyled.OptionText>
                        </SortSelectStyled.Option>
                      ))}
                    </SortSelectStyled.Viewport>
                  </SortSelectStyled.Content>
                </SortSelect.Root>
              </SearchResultsLayout.RightTopArea>

              {/* Results */}
              <GridStyled>
                <div className="flex flex-wrap -mx-4">
                  {articles.map((a, index) => (
                    <div className="w-full sm:w-1/2 md:w-1/3 self-stretch p-4" key={a.id}>
                      <div className="rounded shadow-md h-full">
                        <a href={a.url}>
                          <img
                            className="w-full m-0 rounded-t lazy"
                            src={a.image_url}
                            width="960"
                            height="500"
                            alt={a.title}
                          />
                        </a>
                        <div className="px-6 py-5">
                          {a.title || a.name ? (
                            <div className="font-semibold text-4xl mb-5">
                              <a
                                className="text-slate-900 hover:text-slate-700"
                                href={a.url}
                                onClick={(e) => {
                                  e.preventDefault();
                                  onItemClick({ id: a.id, index, sourceId: a.source_id });
                                }}
                              >
                                {a.title || a.name}
                              </a>
                            </div>
                          ) : null}
                          {a.description ? (
                            <div
                              className="text-slate-800 text-xl"
                              dangerouslySetInnerHTML={{ __html: a.description }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GridStyled>

              <PageControlsStyled>
                <div>
                  <label>Results Per Page</label>
                  <Select.Root
                    defaultValue={String(defaultItemsPerPage)}
                    onValueChange={(v) => onResultsPerPageChange({ numItems: Number(v) })}
                  >
                    <SelectStyled.Trigger>
                      <SelectStyled.SelectValue />
                      <SelectStyled.Icon />
                    </SelectStyled.Trigger>
                    <SelectStyled.Content>
                      <SelectStyled.Viewport>
                        <SelectStyled.Option value="24">
                          <SelectStyled.OptionText>24</SelectStyled.OptionText>
                        </SelectStyled.Option>

                        <SelectStyled.Option value="48">
                          <SelectStyled.OptionText>48</SelectStyled.OptionText>
                        </SelectStyled.Option>

                        <SelectStyled.Option value="64">
                          <SelectStyled.OptionText>64</SelectStyled.OptionText>
                        </SelectStyled.Option>
                      </SelectStyled.Viewport>
                    </SelectStyled.Content>
                  </Select.Root>
                </div>
                <div>
                  <PaginationStyled.Root
                    currentPage={page}
                    defaultCurrentPage={1}
                    totalPages={totalPages}
                    onPageChange={(v) => onPageNumberChange({ page: v })}
                  >
                    <PaginationStyled.PrevPage onClick={(e) => e.preventDefault()}>
                      <ArrowLeftIcon />
                    </PaginationStyled.PrevPage>
                    <PaginationStyled.Pages>
                      {(pagination) =>
                        Pagination.paginationLayout(pagination, {
                          boundaryCount: 1,
                          siblingCount: 1,
                        }).map(({ page, type }) =>
                          type === 'page' ? (
                            <PaginationStyled.Page
                              key={page}
                              aria-label={`Page ${page}`}
                              page={page as number}
                              onClick={(e) => e.preventDefault()}
                            >
                              {page}
                            </PaginationStyled.Page>
                          ) : (
                            <span key={type}>...</span>
                          )
                        )
                      }
                    </PaginationStyled.Pages>
                    <PaginationStyled.NextPage onClick={(e) => e.preventDefault()}>
                      <ArrowRightIcon />
                    </PaginationStyled.NextPage>
                  </PaginationStyled.Root>
                </div>
              </PageControlsStyled>
            </SearchResultsLayout.RightArea>
          </>
        )}
        {totalItems <= 0 && !isFetching && (
          <SearchResultsLayout.NoResults>
            <h3>0 Results</h3>
          </SearchResultsLayout.NoResults>
        )}
      </SearchResultsLayout.MainArea>
    </SearchResultsLayout.Wrapper>
  );
};

const SearchResultsWidget = widget(
  SearchResultsComponent,
  WidgetDataType.SEARCH_RESULTS,
  'content'
);

export default SearchResultsWidget;
