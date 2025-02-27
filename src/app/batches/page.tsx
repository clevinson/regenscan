"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Table, TableRow, TableCell } from "@/components/GenericTable";
import Link from "next/link";

interface Batch {
  denom: string;
  issuance_date: string;
}

const AllBatchesPage: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBatches() {
      try {
        const response = await axios.get("/api/batches");
        setBatches(response.data.batches);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error fetching batches.");
        setLoading(false);
      }
    }

    fetchBatches();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      <h3 className="mb-4 text-lg font-semibold">All Batches</h3>
      <Table headers={["Denom", "Issuance Date"]}>
        {batches.map((batch) => (
          <TableRow key={batch.denom}>
            <TableCell>
              <Link href={`/batch/${batch.denom}`}>{batch.denom}</Link>
            </TableCell>
            <TableCell>{batch.issuance_date}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default AllBatchesPage;
