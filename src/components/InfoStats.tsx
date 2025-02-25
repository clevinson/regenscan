import React from "react";

interface InfoStatsProps {
  stats: Array<{
    header: string;
    value: number | string;
  }>;
  cellWidth?: string;
}

const InfoStats: React.FC<InfoStatsProps> = ({ stats, cellWidth }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
      <div className="flex justify-between mx-4">
        {stats.map((stat, index) => (
          <div key={index} className={cellWidth}>
            <div className="text-sm text-gray-500 font-medium">
              {stat.header}
            </div>
            <div className="text-2xl text-gray-700 font-bold text-left">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoStats;
