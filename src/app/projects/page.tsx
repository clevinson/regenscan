"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import ProjectsTable from "@/components/ProjectsTable";

interface Project {
  id: string;
  jurisdiction: string;
  metadata: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get("api/projects");
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <Layout>
      <h3 className="mb-4 text-lg font-semibold">Projects</h3>
      <ProjectsTable projects={projects} />
    </Layout>
  );
}
