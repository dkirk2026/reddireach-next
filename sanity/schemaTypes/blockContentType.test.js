import { expect, it } from 'vitest';
import { blockContentType } from './blockContentType';

// Article tables are stored as {_type: 'table', caption?, columns: string[], rows: [{_type: 'row', cells: string[]}]}
// and rendered by components/BlogTable.jsx. The Studio must declare the same shape, or it rejects every post
// that contains one ("Block ... is of type table, which is not allowed by the schema").
it('lets the Studio body hold the table blocks the site renders', () => {
  const table = blockContentType.of.find((member) => member.type === 'table' || member.name === 'table');
  expect(table).toBeTruthy();
  const fields = Object.fromEntries(table.fields.map((field) => [field.name, field]));
  expect(fields.caption.type).toBe('string');
  expect(fields.columns.type).toBe('array');
  expect(fields.columns.of[0].type).toBe('string');
  expect(fields.rows.type).toBe('array');
  const row = fields.rows.of[0];
  expect(row.name).toBe('row');
  expect(row.fields.find((field) => field.name === 'cells').of[0].type).toBe('string');
});

it('keeps text blocks and images', () => {
  expect(blockContentType.of.map((member) => member.type)).toEqual(expect.arrayContaining(['block', 'image']));
});
