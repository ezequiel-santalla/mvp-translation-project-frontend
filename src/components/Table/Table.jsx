export const Table = ({ headers, data, RowComponent, onDelete }) => {
  return (
    <table className="mt-8 w-full table-auto border-collapse border border-gray-300 text-left">
      <thead className="bg-gray-200">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="border border-gray-300 px-4 py-2"
              scope="col"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return <RowComponent key={item.id} item={item} onDelete={onDelete} />;
        })}
      </tbody>
    </table>
  );
};
