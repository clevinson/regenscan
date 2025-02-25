import React from "react";
import { Table, TableRow, TableCell } from "@/components/GenericTable";
import CreditClassLink from "@/components/CreditClassLink";
import MetadataLink from "@/components/MetadataLink";

interface CreditClass {
  id: string;
  metadata: string;
}

interface CreditClassesTableProps {
  creditClasses: CreditClass[];
}

const CreditClassesTable: React.FC<CreditClassesTableProps> = ({
  creditClasses,
}) => {
  return (
    <Table headers={["Class ID", "Metadata"]}>
      {creditClasses.map((creditClass) => (
        <TableRow key={creditClass.id}>
          <TableCell>
            <CreditClassLink id={creditClass.id} />
          </TableCell>
          <TableCell>
            <MetadataLink iri={creditClass.metadata} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default CreditClassesTable;
