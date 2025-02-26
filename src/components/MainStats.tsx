import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoStats from "@/components/InfoStats";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface MainStatsProps {}

const MainStats: React.FC<MainStatsProps> = () => {
  const [creditTypesCount, setCreditTypesCount] = useState<number | null>(null);
  const [creditClassesCount, setCreditClassesCount] = useState<number | null>(
    null
  );
  const [projectsCount, setProjectsCount] = useState<number | null>(null);
  const [creditBatchesCount, setCreditBatchesCount] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function fetchCreditTypesCount() {
      try {
        const response = await axios.get("/api/credit-types");
        const creditTypes = response.data.credit_types;
        setCreditTypesCount(creditTypes.length);
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

    async function fetchData() {
      await fetchCreditTypesCount();
      await fetchCreditClassesCount();
      await fetchProjectsCount();
      await fetchCreditBatchesCount();
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

  return (
    <div className="w-full md:w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="relative">
            <InfoStats stats={[stat]} />
            {stat.value !== "Loading..." && stat.link && (
              <Link
                href={stat.link}
                className="absolute top-4 right-6 flex items-center"
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
    </div>
  );
};

export default MainStats;
