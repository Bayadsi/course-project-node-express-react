import React, { useEffect, useState } from 'react';
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
  TextField,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStyles, useToolbarStyles } from './styles';
import { Course } from '../../store/course/types';
import { useHistory } from 'react-router-dom';
import { Order, stableSort, getComparator, getCategoryName } from '../../service';
import { Category } from '../../store/course/types';
import { User } from '../../store/user/types';

interface Data {
  _id: string;
  name: string;
  reviews: number;
  subscribers: number;
  category: string;
  credits: number;
  isUserSubscribed: number;
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
  { id: 'subscribers', numeric: true, disablePadding: false, label: 'Subscribers' },
  { id: 'reviews', numeric: true, disablePadding: false, label: 'Reviews' },
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
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = ({
  checkBoxes,
  setCheckBoxes,
  searchString,
  setSearchString
}: { checkBoxes: any, setCheckBoxes: any, searchString: string, setSearchString: any }) => {
  const classes = useToolbarStyles();
  const history = useHistory();
  const goToAddNewCourse = () => history.push('/add-course-suggestion');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxes({ ...checkBoxes, [event.target.name]: event.target.checked });
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Courses
      </Typography>
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={goToAddNewCourse}
          variant='contained'
          color='primary'
          className={classes.addNewCourseBuuton}
        >
          Add new course
        </Button>
      </Grid>
      <Grid item xs={3}>
        <TextField
          className={classes.searchInput}
          value={searchString}
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchString(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
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

export interface CoursesTableProps {
  courses: Course[];
  user: User;
  subscribe: (courseId: string) => void;
}

export function CoursesTable(props: CoursesTableProps) {
  const { user, courses } = props;
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    const newRows: Data[] = courses.map((course) => {
      let isUserSubscribed = 0;
      if (course && course.subscriptions) {
        const numberOfSubscriptions = course.subscriptions
          .filter(subscription => subscription.userId === user?._id).length;
        isUserSubscribed = numberOfSubscriptions
      }
      const hasReviews = course.reviews && course.reviews.length && course.reviews[0]._id;
      return {
        _id: course._id || '',
        reviews: hasReviews ? course.reviews.length : 0,
        subscribers: course?.subscriptions?.length || 0,
        credits: course.credits,
        category: course.category as string || '',
        name: course.name,
        isUserSubscribed,
      }
    });
    setRows(newRows);
  }, [courses]);

  const history = useHistory();
  const goToCourse = (id = '') => {
    history.push(`/courses/${id}`)
  }

  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
  const [searchString, setSeachString] = useState('');


  useEffect(() => {
    let searchResultsRows: Data[] = rows;
    if (searchString) {
      const lowerCaseSearchString = searchString.toLowerCase()
      searchResultsRows = rows.filter(
        (row) => row.name.toLocaleLowerCase().includes(lowerCaseSearchString)
      );
    }
    if (checkBoxes.m || checkBoxes.p || checkBoxes.mpcs || checkBoxes.tcs) {
      let filterResult: Data[] = [];
      if (checkBoxes.m) {
        const mathCourses = searchResultsRows.filter(r => r.category === Category.M);
        filterResult = filterResult.concat(mathCourses);
      } if (checkBoxes.p) {
        const pCourses = searchResultsRows.filter(r => r.category === Category.P);
        filterResult = filterResult.concat(pCourses);
      } if (checkBoxes.tcs) {
        const tscCourses = searchResultsRows.filter(r => r.category === Category.TCS);
        filterResult = filterResult.concat(tscCourses);
      } if (checkBoxes.mpcs) {
        const mpcsCourses = searchResultsRows.filter(r => r.category === Category.MPCS);
        filterResult = filterResult.concat(mpcsCourses);
      }
      setVisibleRows(filterResult);
    } else if (searchString) {
      setVisibleRows(searchResultsRows);
    } else {
      setVisibleRows(rows);
    }
  }, [checkBoxes, rows, searchString]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <EnhancedTableToolbar
            checkBoxes={checkBoxes}
            setCheckBoxes={setCheckBoxes}
            searchString={searchString}
            setSearchString={setSeachString}
          />
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
              {stableSort(visibleRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Data, index: number) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell component="th" id={labelId} scope="row"
                        onClick={() => { goToCourse(row._id) }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="left">{row.credits}</TableCell>
                      <TableCell align="left">{row.subscribers}</TableCell>
                      <TableCell align="left">{row.reviews}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          color={row.isUserSubscribed ? "secondary" : "primary"}
                          onClick={(e) => {
                            props.subscribe(row._id);
                          }}
                          className={classes.subscribeButton}
                        >
                          {row.isUserSubscribed ? 'Unsubscribe' : 'Subscribe'}
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
