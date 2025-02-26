import React from "react";

interface InfoStatsProps {
  stats: Array<{
    header: string;
    value: number | string;
  }>;
  cellWidth?: string;
}

const InfoStats: React.FC<InfoStatsProps> = ({ stats, className }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
      <div className="flex flex-col md:flex-row justify-between mx-4 space-y-2 md:space-y-0">
        {stats.map((stat, index) => (
          <div key={index} className={"" + " " + className}>
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
