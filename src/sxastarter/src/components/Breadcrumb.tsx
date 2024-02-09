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

/**
 * Design: https://www.figma.com/file/z6f0JdiR52fvzLGjrdKYyJ/Beyond-Blue---Digital-Style-Guide-(v12.10.2023)?type=design&node-id=4-1829&mode=design&t=dzcjzwSe6SlR7Qrb-0
 */

export const BreadcrumbComponent = ({
  fields: {
    data: { item },
  },
}: BreadcrumbProps): JSX.Element | null => {
  if (!item) return null;

  const ancestorLinks = item.ancestors
    ?.slice()
    .sort((a, b) => (a.url.value.length < b.url.value.length ? -1 : 1));

  const parentLink = ancestorLinks?.slice(-1)[0];

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
      {parentLink && (
        <div className="md:hidden">
          <div className="flex items-center gap-2">
            <a
              href={parentLink.url.value}
              className="inline-flex gap-2 pr-1 text-sm font-semibold text-black no-underline hover:text-mid-blue-400"
            >
              {` -> `}
              <span>
                {parentLink.navigationTitle?.value || parentLink.title?.value || parentLink.name}
              </span>
            </a>
          </div>
        </div>
      )}
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
    <div className="flex items-center gap-6">
      {showSeparator && ` -> `}

      {renderAsLink ? (
        <a
          href={link.url.value}
          className="text-sm text-neutral-500 no-underline hover:text-mid-blue-400"
        >
          {link.navigationTitle?.value || link.title?.value || link.name}
        </a>
      ) : (
        <span className="text-sm font-semibold text-black">
          {link.navigationTitle?.value || link.title?.value || link.name}
        </span>
      )}
    </div>
  );
};

export const Default = BreadcrumbComponent;
