import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import { mapProjectListAmToVm } from './time.mapper';
import {
  replaceAssignmentInProject,
  getCountersFromProject,
} from './time.business';
import * as api from './time.api';
import * as VM from './time.vm';
import { getDateFormat, getMonday, getWeekDates } from './time.helpers';

export const useProjects = (): {
  counters: VM.Counter[];
  disabled: boolean;
  headers: string[];
  projects: VM.Project[];
  updateProject: (nameProject: string, assignment: VM.Assignment) => void;
  updateWeek: (date: Date) => void;
  week: Date;
} => {
  const [week, setWeek] = React.useState<Date>(getMonday(new Date()));
  const [projects, setProjects] = React.useState<VM.Project[]>([]);
  const [counters, setCounters] = React.useState<VM.Counter[]>([]);
  const [headers, setHeaders] = React.useState<string[]>([]);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    // TODO: Pass date to ask real api for week data
    trackPromise(
      api
        .getProjects()
        .then(mapProjectListAmToVm)
        .then(setProjects)
    );
  }, []);

  const updateProject = (nameProject: string, assignment: VM.Assignment) => {
    const projectsToUpdate = projects.map(project =>
      replaceAssignmentInProject(project, nameProject, assignment)
    );

    setProjects(projectsToUpdate);
  };

  const updateWeek = (date: Date) => {
    setWeek(date);
  };

  React.useEffect(() => {
    if (projects.length > 0) {
      const dates = projects[0].assignments.map(assignment => assignment.date);
      setCounters(getCountersFromProject(dates, projects));
    }
  }, [projects]);

  React.useEffect(() => {
    setDisabled(true);

    setHeaders(
      getWeekDates(week).map(date => getDateFormat(date, 'dd/mm/yyyy'))
    );

    trackPromise(
      api
        .getProjects()
        .then(mapProjectListAmToVm)
        .then(setProjects)
    ).finally(() => setDisabled(false));
  }, [week]);

  return {
    counters,
    disabled,
    headers,
    projects,
    updateProject,
    updateWeek,
    week,
  };
};
