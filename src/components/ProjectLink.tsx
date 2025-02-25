import React from "react";

interface ProjectLinkProps {
  id: string;
}

const ProjectLink = ({ id }: ProjectLinkProps) => {
  return (
    <a className="text-blue-400" href={`/project/${id}`}>
      {id}
    </a>
  );
};

export default ProjectLink;
