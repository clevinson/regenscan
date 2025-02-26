import React from "react";

interface ProjectLinkProps {
  id: string;
}

const ProjectLink = ({ id }: ProjectLinkProps) => {
  return <a href={`/project/${id}`}>{id}</a>;
};

export default ProjectLink;
