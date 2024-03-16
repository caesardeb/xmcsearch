import React, { useState } from 'react';
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
    const [isToggleClicked, setIsToggleClicked] = useState(false);
  // const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      //   <div className={`component Header ${props.params.styles}`} id={id ? id : undefined}>
      <div className={`p-0 component Header ${props?.params?.styles}`}>
        <div className="component-content">
          <div className="bg-[#545454] w-full px-6 py-5">
            <div className="max-w-screen-xl mx-auto flex items-center flex-wrap justify-between">
              <div className="sm:mr-8">
                <JssLink field={props.fields.logoLink}>
                  <JssImage
                    width="100px"
                    field={props.fields.logo}
                    className="text-xl text-cyan-700 font-semibold self-center"
                  />
                </JssLink>
              </div>
              <nav
                id="menu"
                className={`order-last md:order-none items-center flex-grow flex-row-reverse w-full md:w-auto md:flex mt-2 md:mt-0 ml-7 ${!isToggleClicked ? 'hidden' : ''}`}
              >
                {props.fields.generalLinks.map((items, index) => (
                  <div key={index}>
                    <JssLink
                      className="block mt-4 md:inline-block md:mt-0 font-medium text-3xl text-cyan-500 hover:text-cyan-600 mr-10"
                      field={items.fields.link}
                    />
                  </div>
                ))}
              </nav>
              <form
                id="search"
                action="{{ '/search' | url }}"
                className={`relative order-last sm:order-none flex-grow items-center justify-end sm:block mt-6 sm:mt-0 ${!isToggleClicked ? 'hidden' : ''}`}
              >
                {/* <label className="visually-hidden" htmlFor="header-searchbox">Search here ...</label> */}
                <input
                  type="text"
                  id="header-searchbox"
                  name="q"
                  placeholder="Search here ..."
                  className="w-full sm:max-w-2xl bg-slate-200 border border-transparent float-right focus:bg-white focus:border-slate-300 focus:outline-none h-16 p-4 placeholder-slate-500 rounded text-slate-700 text-xl"
                />
                <svg className="absolute right-2 cursor-pointer top-1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z"/></svg>
              </form>
              <div
                id="menu-toggle"
                className="flex items-center md:hidden text-slate-700 hover:text-teal-600 cursor-pointer sm:ml-6"
                onClick={() => setIsToggleClicked(!isToggleClicked)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-menu"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <HeaderDefaultComponent {...props} />;
};
