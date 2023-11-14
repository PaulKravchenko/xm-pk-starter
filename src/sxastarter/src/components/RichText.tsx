import React from 'react';
import {
  Field,
  useSitecoreContext,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: RichTextProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  if (sitecoreContext.pageState !== 'normal') {
    return (
      <div className={`component rich-text ${props.params.styles.trimEnd()}`}>
        <div className="component-content">{text}</div>
      </div>
    );
  }
  return (
    <div className={`component rich-text ${props.params.styles.trimEnd()}`}>
      <div className="component-content">
        <JssRichText field={props.fields.Text} />
      </div>
    </div>
  );
};