import React, { useEffect, useState } from "react";

export default function AdminFormTable() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/admin-data");
        const rows = await res.json();
        if (rows.length > 0) {
          setColumns(Object.keys(rows[0]));
          setData(rows);
        }
      } catch (err) {
        console.error("Error fetching form data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Submissions</h2>

        {data.length === 0 ? (
          <p className="text-gray-500">No form data found.</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
                <tr>
                  {columns.map((col, i) => (
                    <th key={i} className="border px-3 py-2 text-left text-xs font-semibold uppercase">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {columns.map((col, j) => (
                      <td key={j} className="border px-3 py-2 whitespace-pre-line break-words">
                        {row[col] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
