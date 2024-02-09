import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

export type BreadcrumbLink = {
  name: string;
  title: {
    value: string;
  };
  navigationTitle: {
    value: string;
  };
  url: {
    value: string;
  };
};

export interface BreadcrumbFields {
  data: {
    item: BreadcrumbLink & {
      ancestors: BreadcrumbLink[];
    };
  };
}

export type BreadcrumbProps = {
  rendering?: ComponentRendering;
  params?: ComponentParams;
  fields: BreadcrumbFields;
};

export const BreadcrumbComponent = ({
  fields: {
    data: { item },
  },
}: BreadcrumbProps): JSX.Element | null => {
  if (!item) return null;

  const ancestorLinks = item.ancestors
    ?.slice()
    .sort((a, b) => (a.url.value.length < b.url.value.length ? -1 : 1));

  return (
    <div className="breadcrumb container py-5">
      <div className="hidden items-center space-x-6 md:flex">
        {ancestorLinks && ancestorLinks.length > 0 && (
          <>
            {ancestorLinks.map((link, index) => (
              <BreadcrumbAnchor link={link} showSeparator={index > 0} key={`breadcrumb-${index}`} />
            ))}
            <BreadcrumbAnchor link={item} renderAsLink={false} />
          </>
        )}
      </div>
    </div>
  );
};

const BreadcrumbAnchor = ({
  link,
  showSeparator = true,
  renderAsLink = true,
}: {
  link: BreadcrumbLink;
  showSeparator?: boolean;
  renderAsLink?: boolean;
}): JSX.Element => {
  return (
    <div className="flex">
      {showSeparator && <span className="separator">{`->`}</span>}

      {renderAsLink ? (
        <a href={link.url.value} className="no-underline">
          {link.navigationTitle?.value || link.title?.value || link.name}
        </a>
      ) : (
        <span className="text-black">
          {link.navigationTitle?.value || link.title?.value || link.name}
        </span>
      )}
    </div>
  );
};

export const Default = BreadcrumbComponent;
