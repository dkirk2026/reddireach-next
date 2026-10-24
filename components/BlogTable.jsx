import React from 'react';

export default function BlogTable({ value }) {
  const columns = value?.columns || [];
  if (!columns.length) return null;
  return (
    <div className="post-table" role="region" aria-label={value.caption || 'Article table'} tabIndex={0}>
      <table>
        {value.caption && <caption>{value.caption}</caption>}
        <thead><tr>{columns.map((column, i) => <th scope="col" key={i}>{column}</th>)}</tr></thead>
        <tbody>{(value.rows || []).map((row, i) => (
          <tr key={row._key || i}>{(row.cells || []).map((cell, j) => <td key={j}>{cell}</td>)}</tr>
        ))}</tbody>
      </table>
    </div>
  );
}
