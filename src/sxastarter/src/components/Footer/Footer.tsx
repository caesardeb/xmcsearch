import React from 'react';
import { RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  LinkField,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  copyrightText: RichTextField;
  logo: ImageField;
  logoLink: LinkField;
  generalLink: generalLink[];
}

type generalLink = {
  fields: {
    link: LinkField;
  };
};
type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FooterDefaultComponent = (props: FooterProps): JSX.Element => (
  <div className={`component Footer ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Footer</span>
    </div>
  </div>
);

export const Default = (props: FooterProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`p-0 component Footer ${props?.params?.styles}`}>
        <div className="component-content">
          <div className="bg-slate-200 w-full px-6 py-5">
            <div className="max-w-screen-xl mx-auto pt-8">
              <div className="mb-8">
                <JssLink field={props.fields.logoLink}>
                  <JssImage
                    width="100px"
                    field={props.fields.logo}
                    className="text-xl text-teal-700 font-semibold self-center mx-auto"
                  />
                </JssLink>
              </div>
              <div className="order-last md:order-none items-center text-center flex-grow w-full md:flex mt-2 md:mt-0 justify-center">
                {props.fields.generalLink?.map((items) => (
                  <React.Fragment key={items.fields.link.value.text}>
                    <JssLink
                      className="list-disc block mt-4 md:inline-block md:mt-0 text-2xl font-medium text-slate-700 hover:text-cyan-500 text- mr-4"
                      field={items.fields.link}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="max-w-7xl mx-auto items-center justify-between">
              <div className="px-10 py-8">
                <div className="max-w-5xl mx-auto text-slate-700 text-center">
                  <JssRichText field={props.fields.copyrightText} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <FooterDefaultComponent {...props} />;
};
