import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [list, updateList] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      const data = await response.json();
      updateList(data);
    })();
  }, []);

  useEffect(() => {
    setPaginatedData(list);
  }, [list]);

  const handleSearch = (event) => {
    console.log(event.target.value);
    const filteredData = list.filter(({ title }) =>
      title.toLowerCase().includes(event.target.value)
    );
    setPaginatedData(filteredData);
  };

  return (
    <div style={{ width: 'min(400px, calc(100% - 2rem))', margin: '0 auto' }}>
      <input
        type="search"
        placeholder="Search"
        style={{ padding: '0.5rem 1rem', margin: '1rem 0', width: '100%' }}
        onChange={handleSearch}
      />
      {paginatedData[0] ? (
        <ol style={{ padding: 0, marginLeft: '1rem' }}>
          {paginatedData.map(({ id, title, completed }) => (
            <li
              key={id}
              style={{
                color: completed ? 'green' : '',
                textDecoration: completed ? 'line-through' : '',
                fontFamily: 'sans-serif',
                lineHeight: 1.5,
                fontSize: '14px',
              }}
            >
              {title}
            </li>
          ))}
        </ol>
      ) : (
        <p style={{ color: 'red', textAlign: 'center' }}>Nothing Found!</p>
      )}
    </div>
  );
}
