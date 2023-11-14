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

type ComponentRichTextProps = {
  styles: string;
  children: JSX.Element;
};

const ComponentRichText = (props: ComponentRichTextProps) => {
  return (
    <div className={`component test-3 rich-text ${props.styles}`}>
      <div className="component-content">
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export const Default = (props: RichTextProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  if (sitecoreContext.pageState === 'normal') {
    return (
      <div className={`component test-1 rich-text ${props.params.styles.trimEnd()}`}>
        <div className="component-content">{text}</div>
      </div>
    );
  }
  return (
    <ComponentRichText styles={props.params.styles}>
      <>
        <JssRichText field={props.fields.Text} />
      </>
    </ComponentRichText>
  );
};
