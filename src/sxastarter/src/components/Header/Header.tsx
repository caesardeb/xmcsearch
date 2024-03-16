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
          <JssLink field={props.fields.logoLink}>
            <div className="field-Headericon">
              <JssImage field={props.fields.logo} />
            </div>
          </JssLink>
          {/* <div className="Header-text">
            <div>
              <div className="field-Headertext">
                <JssRichText field={props.fields.HeaderText} />
              </div>
            </div>
            <div className="field-Headerlink">
              <JssLink field={props.fields.HeaderLink} />
            </div>
          </div>*/}
        </div>
      </div>
    );
  }

  return <HeaderDefaultComponent {...props} />;
};
