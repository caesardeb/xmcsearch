import React from 'react';
import { ImageField, LinkField, RichTextField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { Link as JssLink, Text, Image as JssImage, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface BannerFields {
  fields: {
    ctaLink: LinkField,
    image: ImageField;
    description: RichTextField;
    title: Field<string>;
  };
}

const Banner = ({ fields }: BannerFields) => {
    if(!fields) return <h1>Data not found</h1>
  return (
    <section className="bg-[#F4F6F5]">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            {fields?.image ? <div className="lg:mt-0 lg:col-span-5">
                <JssImage field={fields?.image} />
            </div> : null}
            <div className="mr-auto place-self-center lg:col-span-7 p-5 lg:pr-0">
                {fields?.title ? <Text tag="h1" className="mb-4" field={fields?.title} /> : null}
                {fields?.description ? <JssRichText field={fields?.description} /> : null}
                {fields?.ctaLink?.value?.href ? <div className="mt-4">
                    <JssLink
                        field={fields?.ctaLink}
                        className="bg-white py-2 px-4 border rounded text-slate-800 cursor-pointer hover:bg-slate-100"
                    />
                </div> : null}
            </div>
        </div>
    </section>
  );
};

export default Banner;
