import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
import BlogTable from './BlogTable';

it('renders every header, row and caption, with escaped cell content', () => {
  const html = renderToStaticMarkup(<BlogTable value={{columns: ['Agency', 'Monthly fee'], rows: [{_key: 'r', cells: ['<script>unsafe</script>', '$2,000']}], caption: 'Published prices'}} />);
  expect(html).toContain('<th scope="col">Monthly fee</th>');
  expect(html).toContain('<td>$2,000</td>');
  expect(html).toContain('&lt;script&gt;unsafe&lt;/script&gt;');
  expect(html).toContain('<caption>Published prices</caption>');
  expect(html).toContain('tabindex="0"');
});

it('handles an empty table without breaking the article', () => {
  expect(renderToStaticMarkup(<BlogTable value={{}} />)).toBe('');
});
