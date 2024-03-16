import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  logo: ImageField;
  logoLink: LinkField;
  generalLinks: generalLinks[];
}

type generalLinks = {
  fields: {
    link: LinkField;
  };
};
type HeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HeaderDefaultComponent = (props: HeaderProps): JSX.Element => (
  <div className={`component Header ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Header</span>
    </div>
  </div>
);

export const Default = (props: HeaderProps): JSX.Element => {
  // const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      //   <div className={`component Header ${props.params.styles}`} id={id ? id : undefined}>
      <div className={`component Header ${props?.params?.styles}`}>
        <div className="component-content">
          <div className="w-full px-6 py-5 z-50 fixed top-0 shadow-md transition-all transform ease-in-out duration-500">
            <div className="max-w-7xl mx-auto flex items-center flex-wrap justify-between">
              <div className="sm:mr-8">
                <JssLink field={props.fields.logoLink}>
                  <JssImage
                    width="100px"
                    field={props.fields.logo}
                    className="text-xl text-teal-700 font-semibold self-center"
                  />
                </JssLink>
              </div>
              <nav
                id="menu"
                className="order-last md:order-none items-center flex-grow w-full md:w-auto md:flex hidden mt-2 md:mt-0"
              >
                {props.fields.generalLinks.map((items, index) => (
                  <JssLink
                    className="block mt-4 md:inline-block md:mt-0 font-medium text-slate-700 hover:text-teal-600 text-3xl mr-4"
                    field={items.fields.link}
                  />
                ))}
              </nav>
              <form id="search" action="{{ '/search' | url }}" className="order-last sm:order-none flex-grow items-center justify-end hidden sm:block mt-6 sm:mt-0">
                <label className="visually-hidden" htmlFor="header-searchbox">Search here ...</label>
                <input type="text" id="header-searchbox" name="q" placeholder="Search here ..." className="w-full sm:max-w-xs bg-slate-200 border border-transparent float-right focus:bg-white focus:border-slate-300 focus:outline-none h-8 p-4 placeholder-slate-500 rounded text-slate-700 text-sm"/>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <HeaderDefaultComponent {...props} />;
};
