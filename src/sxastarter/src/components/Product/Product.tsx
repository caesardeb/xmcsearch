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
  const { sitecoreContext } = useSitecoreContext();
  const Content = sitecoreContext?.route?.fields?.Content as RichTextField;
  const Title = sitecoreContext?.route?.fields?.Title as Field<string>;
  const Image = sitecoreContext?.route?.fields?.productImage as ImageField;

  return (
    // <section className="bg-[#F4F6F5]">
    //   <Text field={Title} />
    //   <JssRichText field={Content} />
    //   <JssImage field={Image} />
    // </section>
    <article className="max-w-7xl mx-auto my-24">
        <header className="mb-14">
            {Title ? <Text tag="h1" className="text-center font-bold leading-normal text-slate-900 mt-0 mb-3" field={Title} /> : null}
            {/* <h1 className="text-3xl text-center font-bold leading-normal text-slate-900 mt-0 mb-3">{{ title }}</h1> */}
            {/* <div className="text-center">Published on {{ page.date | readableDate }}</div> */}
            {/* {% if tags %}
            <div className="mt-3 text-center">
                {% for tag in tags %}
                <a href="{{ '/tags/' | url }}{{ tag }}" className="inline-block bg-slate-200 rounded-full px-3 py-1 text-sm font-medium text-slate-700 m-0.5">#{{ tag }}</a>
                {% endfor %}
            </div>
            {% endif %} */}
            {Image ? <div className="mt-10 -mx-7 md:mx-0">
                <JssImage className="w-full max-w-2xl mx-auto" field={Image} />
            </div> : null}
        </header>
        {Content ? <div id="content" className="text-slate-800 max-w-none">
            <JssRichText field={Content} />
        </div> : null}
    </article>
  );
};

export default Default;
