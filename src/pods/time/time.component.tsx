import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ActionsComponent,
  TableComponent,
  ToolbarComponent,
} from './components';
import * as VM from './time.vm';
import * as classes from './time.styles';
import { getNextMonday, getPreviousMonday } from './time.helpers';

interface Props {
  columns: string[];
  counters: VM.Counter[];
  disabled: boolean;
  projects: VM.Project[];
  updateProject: (nameProject: string, assignment: VM.Assignment) => void;
  updateWeek: (date: Date) => void;
  week: Date;
}

export const TimeComponent: React.FC<Props> = ({
  columns,
  counters,
  disabled,
  projects,
  updateProject,
  updateWeek,
  week,
}) => {
  const handleOnChange = (nameProject: string, item: VM.Assignment) => {
    updateProject(nameProject, item);
  };

  const handleOnNavigate = (direction: 'Left' | 'Right') => {
    if (disabled) return;

    updateWeek(
      'Left' === direction ? getPreviousMonday(week) : getNextMonday(week)
    );
  };

  return (
    <>
      <Paper className={classes.paper}>
        <ToolbarComponent date={week} onNavigate={handleOnNavigate} />
        <TableComponent
          items={projects}
          onChange={handleOnChange}
          columns={columns}
          counters={counters}
        />
      </Paper>
      <ActionsComponent />
    </>
  );
};
