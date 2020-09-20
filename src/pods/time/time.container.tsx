import React from 'react';
import { TimeComponent } from './time.component';
import { useProjects } from './time.hooks';

export const TimeContainer: React.FC = () => {
  const {
    counters,
    disabled,
    headers,
    projects,
    updateProject,
    updateWeek,
    week,
  } = useProjects();

  return (
    <TimeComponent
      columns={headers}
      counters={counters}
      disabled={disabled}
      projects={projects}
      updateProject={updateProject}
      updateWeek={updateWeek}
      week={week}
    />
  );
};
