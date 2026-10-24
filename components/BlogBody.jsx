import React from 'react';
import { PortableText } from '@portabletext/react';
import BlogTable from './BlogTable';

export const portableTextComponents = {
  types: {
    table: BlogTable,
    image: ({ value }) =>
      value?.url ? (
        <figure className="post-fig">
          <img
            src={`${value.url}?w=1400&auto=format`}
            alt={value.alt || ''}
            loading="lazy"
          />
        </figure>
      ) : null,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const ext = /^https?:\/\//.test(href) && !href.includes('reddireach.com');
      return (
        <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      );
    },
  },
};

export default function BlogBody({ body }) {
  return <PortableText value={body || []} components={portableTextComponents} />;
}
