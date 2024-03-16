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
import { ComponentProps } from 'lib/component-props';

// interface Fields {
//   Title: Field<string>;
//   Content: RichTextField;
//   Image: ImageField;
// }

// type PageContentProps = ComponentProps & {
//   params: { [key: string]: string };
//   fields: Fields;
// };
const Default = (props: ComponentProps): JSX.Element => {
  console.log('props', props?.rendering?.componentName);
  const { sitecoreContext } = useSitecoreContext();
  const Content = sitecoreContext?.route?.fields?.Content as RichTextField;
  const Title = sitecoreContext?.route?.fields?.Title as Field<string>;
  const Image = sitecoreContext?.route?.fields?.productImage as ImageField;

  return (
    <section className="bg-[#F4F6F5]">
      <Text field={Title} />
      <JssRichText field={Content} />
      <JssImage field={Image} />
    </section>
  );
};

export default Default;
