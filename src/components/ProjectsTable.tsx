import React from "react";
import { Table, TableRow, TableCell } from "@/components/GenericTable";
import Link from "next/link";

interface Project {
  id: string;
  jurisdiction: string;
  metadata: string;
}

interface ProjectsTableProps {
  projects: Project[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
  return (
    <Table headers={["ID", "Jurisdiction", "Metadata"]}>
      {projects.map((project) => (
        <TableRow key={project.id}>
          <TableCell>
            <Link href={`/project/${project.id}`}>
              <span className="whitespace-nowrap">{project.id}</span>
            </Link>
          </TableCell>
          <TableCell>{project.jurisdiction}</TableCell>
          <TableCell>
            <Link href={`/dataset/${project.metadata}`}>
              {project.metadata}
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default ProjectsTable;
