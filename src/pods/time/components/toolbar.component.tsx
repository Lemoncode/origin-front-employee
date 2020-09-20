import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import { literals } from 'core/i18n';
import * as classes from './toolbar.styles';

interface Props {
  date: Date;
  onNavigate: (direction: 'Left' | 'Right') => void;
}

const getMonthOfYear = (date: Date): string => {
  const monthsOfYear = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiebre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  return `${monthsOfYear[date.getMonth()]} de ${date.getFullYear()}`;
};

export const ToolbarComponent: React.FC<Props> = ({ date, onNavigate }) => {
  const handleOnClickLeft = () => onNavigate('Left');
  const handleOnClickRight = () => onNavigate('Right');
  const handleOnKeyUp = (event: KeyboardEvent) => {
    if (/ArrowLeft|ArrowRight/.test(event.code)) {
      onNavigate('ArrowLeft' === event.code ? 'Left' : 'Right');
    }
  };

  React.useEffect(() => {
    window.addEventListener('keyup', handleOnKeyUp);
    return () => window.removeEventListener('keyup', handleOnKeyUp);
  }, [onNavigate]);

  return (
    <Toolbar variant="dense">
      <Button className={classes.menuButton} variant="outlined">
        {literals.components.date.today}
      </Button>
      <IconButton className={classes.menuButton} onClick={handleOnClickLeft}>
        <LeftIcon />
      </IconButton>
      <IconButton className={classes.menuButton} onClick={handleOnClickRight}>
        <RightIcon />
      </IconButton>
      <Typography>{getMonthOfYear(date)}</Typography>
    </Toolbar>
  );
};
