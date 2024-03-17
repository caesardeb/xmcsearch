import React from 'react';
import { ImageField, LinkField, RichTextField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { Link as JssLink, Text, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface BannerFields {
  fields: {
    ctaLink: LinkField;
    image: ImageField;
    description: RichTextField;
    title: Field<string>;
  };
}

const Banner = ({ fields }: BannerFields) => {
  if (!fields) return <h1>Data not found</h1>;
  return (
    <section
      className="bg-[#F4F6F5] bg-cover bg-left-top bg-no-repeat"
      style={{ backgroundImage: `url(${fields?.image?.value?.src})` }}
    >
      <div className="max-w-screen-xl px-4 py-24 mx-auto">
        <div className="mx-auto max-w-5xl text-center place-self-center p-10 bg-white bg-opacity-50 backdrop-blur-sm">
          {fields?.title ? <Text tag="h1" className="mb-4" field={fields?.title} /> : null}
          {fields?.description ? <JssRichText field={fields?.description} /> : null}
          {fields?.ctaLink?.value?.href ? (
            <div className="mt-10">
              <JssLink
                field={fields?.ctaLink}
                className="bg-white py-2 px-4 border rounded text-slate-800 cursor-pointer hover:bg-slate-100"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Banner;
