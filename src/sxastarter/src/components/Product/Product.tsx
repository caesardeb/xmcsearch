import React from 'react';
import {
  ImageField,
  RichTextField,
  Field,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Text,
  Image as JssImage,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
//import { ComponentProps } from 'lib/component-props';

// const Default = (props: ComponentProps): JSX.Element => {
const Default = (): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const Content = sitecoreContext?.route?.fields?.Content as RichTextField;
  const Title = sitecoreContext?.route?.fields?.Title as Field<string>;
  const Image = sitecoreContext?.route?.fields?.productImage as ImageField;

  return (
    <article className="max-w-7xl mx-auto my-24">
      <header className="mb-14">
        {Title ? (
          <Text
            tag="h1"
            className="text-center font-bold leading-normal text-slate-900 mt-0 mb-3"
            field={Title}
          />
        ) : null}
        {Image ? (
          <div className="mt-10 -mx-7 md:mx-0">
            <JssImage className="w-full max-w-2xl mx-auto" field={Image} />
          </div>
        ) : null}
      </header>
      {Content ? (
        <div id="content" className="text-slate-800 max-w-none">
          <JssRichText field={Content} />
        </div>
      ) : null}
    </article>
  );
};

export default Default;
