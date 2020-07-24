import React, { useEffect, useState } from 'react';
import { CourseSuggestion } from '../../../store/course-suggestions/types';
import { Redirect } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
  Typography,
  Tooltip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStyles, useToolbarStyles } from './styles';
import { useHistory } from 'react-router-dom';
import { Order, stableSort, getComparator, getCategoryName } from '../../../service';
import { Category } from '../../../store/course/types';

interface Data {
  _id: string;
  name: string;
  category?: string | undefined;
  credits?: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Course name' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'credits', numeric: true, disablePadding: false, label: 'Credits' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="left" />
        <TableCell align="left" />
      </TableRow>
    </TableHead>
  );
}


const EnhancedTableToolbar = ({ checkBoxes, setCheckBoxes }: { checkBoxes: any, setCheckBoxes: any }) => {
  const classes = useToolbarStyles();
  const history = useHistory();
  const goToAddNewCourse = () => history.push('/add-course');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxes({ ...checkBoxes, [event.target.name]: event.target.checked });
  };

  return (
    <Grid container className={classes.root}>
      <Grid xs={4}>
        <Button
          onClick={goToAddNewCourse}
          variant='contained'
          color='primary'
          className={classes.addNewCourseBuuton}
        >
          Add new course
        </Button>
      </Grid>
      <Grid xs={4}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Course Suggesctions
        </Typography>
      </Grid>
      <Grid xs={4}>
        <Accordion>
          <AccordionSummary
            expandIcon={(
              <Tooltip title="Filter list">
                <IconButton aria-label="filter list">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Filter Categories
        </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={checkBoxes.m} onChange={handleChange} name="m" />}
                  label={getCategoryName(Category.M)}
                />
                <FormControlLabel
                  control={<Checkbox checked={checkBoxes.p} onChange={handleChange} name="p" />}
                  label={getCategoryName(Category.P)}
                />
                <FormControlLabel
                  control={<Checkbox checked={checkBoxes.mpcs} onChange={handleChange} name="mpcs" />}
                  label={getCategoryName(Category.MPCS)}
                />
                <FormControlLabel
                  control={<Checkbox checked={checkBoxes.tcs} onChange={handleChange} name="tcs" />}
                  label={getCategoryName(Category.TCS)}
                />
              </FormGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};


export interface CourseSuggestionsProps {
  courseSuggestions: CourseSuggestion[] | null;
  deleteCourseSuggestion: any;
}

export interface RedirectTo {
  pathname: string,
  state: CourseSuggestion,
}

export function CourseSuggestions(props: CourseSuggestionsProps) {
  const classes = useStyles();
  const { courseSuggestions } = props;
  const [rows, setRows] = useState<Data[]>([]);
  const [redirectObject, setRedirectObject] = useState<RedirectTo>();
  const createCourse = (courseSuggestion: CourseSuggestion) => {
    setRedirectObject({
      pathname: "/add-course",
      state: courseSuggestion,
    });
  }

  useEffect(() => {
    if (!courseSuggestions) {
      return;
    }

    const newRows: Data[] = courseSuggestions.map((suggestion) => {
      return {
        _id: suggestion._id || '',
        credits: 0,
        category: suggestion.category as string || '-',
        name: suggestion.name,
      }
    });
    setRows(newRows);
  }, [courseSuggestions]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [visibleRows, setVisibleRows] = React.useState<Data[]>([]);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, visibleRows.length - page * rowsPerPage);
  const [checkBoxes, setCheckBoxes] = React.useState({
    m: false,
    p: false,
    tcs: false,
    mpcs: false,
  });


  useEffect(() => {
    if (checkBoxes.m || checkBoxes.p || checkBoxes.mpcs || checkBoxes.tcs) {
      let filterResult: Data[] = [];
      if (checkBoxes.m) {
        const mathCourses = rows.filter(r => r.category === Category.M);
        filterResult = filterResult.concat(mathCourses);
      } if (checkBoxes.p) {
        const pCourses = rows.filter(r => r.category === Category.P);
        filterResult = filterResult.concat(pCourses);
      } if (checkBoxes.tcs) {
        const tscCourses = rows.filter(r => r.category === Category.TCS);
        filterResult = filterResult.concat(tscCourses);
      } if (checkBoxes.mpcs) {
        const mpcsCourses = rows.filter(r => r.category === Category.MPCS);
        filterResult = filterResult.concat(mpcsCourses);
      }
      setVisibleRows(filterResult);
    } else {
      setVisibleRows(rows);
    }
  }, [checkBoxes, rows]);

  if (redirectObject) {
    return <Redirect to={redirectObject} />
  }

  if (!props.courseSuggestions || props.courseSuggestions.length === 0) {
    return (
      <Typography>
        There are no course suggestions
      </Typography>
    );
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <EnhancedTableToolbar checkBoxes={checkBoxes} setCheckBoxes={setCheckBoxes} />
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {
                stableSort(
                  visibleRows.map(vr => ({
                    ...vr,
                    category: vr.category || '',
                    credits: vr.credits || 0,
                  })),
                  getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell component="th" id={labelId} scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.category ? row.category : ''}</TableCell>
                        <TableCell align="left">{row.credits}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color={"secondary"}
                            onClick={(e) => {
                              props.deleteCourseSuggestion(row._id);
                            }}
                            className={classes.subscribeButton}
                          >
                            Delete Suggestion
                        </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color={"primary"}
                            onClick={(e) => {
                              const css = courseSuggestions?.filter(cs => cs._id === row._id);
                              if (css) {
                                createCourse(css[0]);
                              }
                            }}
                            className={classes.subscribeButton}
                          >
                            View Suggestion
                        </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={(
            <Typography>
              Courses per page
            </Typography>
          )}
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={visibleRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
