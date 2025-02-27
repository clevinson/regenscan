import React from "react";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

interface TableRowProps {
  children: React.ReactNode;
}

interface TableCellProps {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  className,
  headers,
  children,
}) => {
  return (
    <div
      className={
        "text-xs bg-gray-50 rounded-lg border border-gray-300 overflow-scroll min-h-max " +
        className
      }
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
};

export const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return <tr className="bg-white">{children}</tr>;
};

export const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return <td className="px-6 py-4 text-sm text-gray-900">{children}</td>;
};
