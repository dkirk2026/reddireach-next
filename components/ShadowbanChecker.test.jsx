import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
import ShadowbanChecker from './ShadowbanChecker';
import { SHADOWBAN_FAQS } from '../data/shadowban';

it('offers manual checks without collecting a username or promising an automatic result', () => {
  const html = renderToStaticMarkup(<ShadowbanChecker />);
  expect(html).toContain('Check your profile manually');
  expect(html).toContain('private browser window');
  expect(html).toContain('recent post');
  expect(html).toContain('inbox');
  expect(html).toContain('https://www.reddit.com/appeals');
  expect(html).not.toContain('<form');
  expect(html).not.toContain('<input');
});

it('describes the manual process accurately in the shared FAQ', () => {
  const answer = SHADOWBAN_FAQS.find(f => f.q === 'How does this checker work?').a;
  expect(answer).toContain('manual');
  expect(answer).not.toContain('It asks Reddit');
});
