"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Table, TableRow, TableCell } from "@/components/GenericTable";
import { formatTimestamp } from "@/utils/utils";
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
    <Layout>
      <h3 className="mb-4 text-lg font-semibold">All Batches</h3>
      <Table headers={["Denom", "Issuance Date"]}>
        {batches.map((batch) => (
          <TableRow key={batch.denom}>
            <TableCell>
              <Link href={`/batch/${batch.denom}`}>{batch.denom}</Link>
            </TableCell>
            <TableCell>{formatTimestamp(batch.issuance_date)}</TableCell>
          </TableRow>
        ))}
      </Table>
    </Layout>
  );
};

export default AllBatchesPage;
