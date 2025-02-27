"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoStats from "@/components/InfoStats";
import Layout from "@/components/Layout";
import { roundToDecimalPlaces } from "@/utils/utils";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

interface Supply {
  tradable_amount: number;
  retired_amount: number;
  cancelled_amount: number;
}

interface CreditTypeInfo {
  name: string;
  unit: string;
}

interface AggregatedSupply {
  [creditType: string]: {
    tradable_amount: number;
    retired_amount: number;
    cancelled_amount: number;
  };
}

const fixedCreditTypes = ["C", "BT", "KSH"];

const StatsPage: React.FC = () => {
  const [creditTypesCount, setCreditTypesCount] = useState<number | null>(null);
  const [creditClassesCount, setCreditClassesCount] = useState<number | null>(
    null
  );
  const [projectsCount, setProjectsCount] = useState<number | null>(null);
  const [creditBatchesCount, setCreditBatchesCount] = useState<number | null>(
    null
  );
  const [creditTypes, setCreditTypes] = useState<{
    [abbreviation: string]: CreditTypeInfo;
  }>({});
  const [aggregatedSupplies, setAggregatedSupplies] =
    useState<AggregatedSupply>({});

  useEffect(() => {
    async function fetchCreditTypesCount() {
      try {
        const response = await axios.get("/api/credit-types");
        const creditTypes = response.data.credit_types;
        setCreditTypesCount(creditTypes.length);

        const creditTypeNames: { [abbreviation: string]: CreditTypeInfo } = {};
        creditTypes.forEach((creditType: any) => {
          creditTypeNames[creditType.abbreviation] = {
            name: creditType.name,
            unit: creditType.unit,
          };
        });
        setCreditTypes(creditTypeNames);
      } catch (error) {
        console.error("Error fetching credit types count:", error);
      }
    }

    async function fetchCreditClassesCount() {
      try {
        const response = await axios.get("/api/credit-classes");
        setCreditClassesCount(response.data.classes.length);
      } catch (error) {
        console.error("Error fetching credit classes count:", error);
      }
    }

    async function fetchProjectsCount() {
      try {
        const response = await axios.get("/api/projects");
        setProjectsCount(response.data.projects.length);
      } catch (error) {
        console.error("Error fetching projects count:", error);
      }
    }

    async function fetchCreditBatchesCount() {
      try {
        const response = await axios.get("/api/batches");
        setCreditBatchesCount(response.data.batches.length);
      } catch (error) {
        console.error("Error fetching credit batches count:", error);
      }
    }

    async function fetchAggregatedSupplies() {
      try {
        const batchesResponse = await axios.get("/api/batches");
        const batches = batchesResponse.data.batches;

        const supplies: AggregatedSupply = {};

        const supplyPromises = batches.map(async (batch: any) => {
          const supplyResponse = await axios.get(
            `/api/batch-supply?denom=${batch.denom}`
          );
          const supply = supplyResponse.data;

          const match = batch.denom.match(/^[A-Z]+/);
          if (match) {
            const creditTypeAbbrev = match[0];
            if (!supplies[creditTypeAbbrev]) {
              supplies[creditTypeAbbrev] = {
                tradable_amount: 0,
                retired_amount: 0,
                cancelled_amount: 0,
              };
            }
            supplies[creditTypeAbbrev].tradable_amount += parseFloat(
              supply.tradable_amount
            );
            supplies[creditTypeAbbrev].retired_amount += parseFloat(
              supply.retired_amount
            );
            supplies[creditTypeAbbrev].cancelled_amount += parseFloat(
              supply.cancelled_amount
            );
          }
        });

        await Promise.all(supplyPromises);
        setAggregatedSupplies(supplies);
      } catch (error) {
        console.error("Error fetching aggregated supplies:", error);
      }
    }

    async function fetchData() {
      await fetchCreditTypesCount();
      await fetchCreditClassesCount();
      await fetchProjectsCount();
      await fetchCreditBatchesCount();
      await fetchAggregatedSupplies();
    }

    fetchData();
  }, []);

  const stats = [
    {
      header: "Credit Types",
      value: creditTypesCount ?? "Loading...",
      link: "/credit-types",
    },
    {
      header: "Credit Classes",
      value: creditClassesCount ?? "Loading...",
      link: "/credit-classes",
    },
    {
      header: "Projects",
      value: projectsCount ?? "Loading...",
      link: "/projects",
    },
    {
      header: "Credit Batches",
      value: creditBatchesCount ?? "Loading...",
      link: "/batches",
    },
  ];

  const renderCreditTypeSection = (
    abbrev: string,
    creditType: CreditTypeInfo
  ) => (
    <div key={abbrev} className="mb-4">
      <h4 className="mb-2 text-md font-semibold flex items-center">
        {creditType.name
          .split(/[-\s]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
        <div className="ml-2 relative group">
          <div className="text-gray-500 cursor-pointer">
            <FontAwesomeIcon icon={faQuestionCircle} className="ml-1" />
          </div>
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs w-max rounded-sm py-1 px-2 max-w-[32rem]">
            {creditType.unit.charAt(0).toUpperCase() + creditType.unit.slice(1)}
            <div className="absolute left-1.5 top-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-700"></div>
          </div>
        </div>
      </h4>
      <InfoStats
        stats={[
          {
            header: "Tradable Credits",
            value: roundToDecimalPlaces(
              aggregatedSupplies[abbrev]?.tradable_amount || 0,
              3
            ),
          },
          {
            header: "Retired Credits",
            value: roundToDecimalPlaces(
              aggregatedSupplies[abbrev]?.retired_amount || 0,
              3
            ),
          },
          {
            header: "Cancelled Credits",
            value: roundToDecimalPlaces(
              aggregatedSupplies[abbrev]?.cancelled_amount || 0,
              3
            ),
          },
        ]}
        cellWidth="w-1/3"
      />
    </div>
  );

  return (
    <Layout>
      <h3 className="mb-4 text-lg font-semibold">Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="relative">
            <InfoStats stats={[stat]} />
            {stat.value !== "Loading..." && stat.link && (
              <Link
                href={stat.link}
                className="absolute top-2 right-3 flex items-center"
              >
                View all{" "}
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="ml-1"
                />
              </Link>
            )}
          </div>
        ))}
      </div>
      <h3 className="mt-8 mb-2 text-lg font-semibold">
        Credits Issued by Type
      </h3>
      {fixedCreditTypes.map((abbrev) => {
        const creditType = creditTypes[abbrev];
        return creditType ? renderCreditTypeSection(abbrev, creditType) : null;
      })}
      {Object.entries(creditTypes)
        .filter(([abbrev]) => !fixedCreditTypes.includes(abbrev))
        .map(([abbrev, creditType]) =>
          renderCreditTypeSection(abbrev, creditType)
        )}
    </Layout>
  );
};

export default StatsPage;
