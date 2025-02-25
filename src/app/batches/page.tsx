import axios from "axios";
import React from "react";
import Header from "@/components/Header";
import { Table, TableRow, TableCell } from "@/components/GenericTable";
import Link from "next/link";

interface Batch {
  denom: string;
  issuance_date: string;
}

export default async function AllBatchesPage() {
  let batches: Batch[] = [];
  let error: string | null = null;

  try {
    const response = await axios.get(
      "http://mainnet.regen.network:1317/regen/ecocredit/v1/batches"
    );
    batches = response.data.batches;
  } catch (err) {
    error = "Error fetching batches.";
  }

  if (error) return <div>{error}</div>;
  if (!batches.length) return <div>Loading...</div>;

  return (
    <div className="h-screen">
      <div className="max-w-4xl mx-auto p-6 h-full flex flex-col">
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
    </div>
  );
}
