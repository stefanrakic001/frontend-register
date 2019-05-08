import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid
} from "@material-ui/core";
import Row from "./Row";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

function SimpleTable(props) {
  const { classes } = props;
  const onDelete = props.onDelete;
  const handleEdit = props.handleEdit;
  return (
    <Grid item xs={12}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name </TableCell>
              <TableCell align="center">Availability</TableCell>
              <TableCell align="center">Car </TableCell>
              <TableCell align="center">Construction Address </TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="right">Payment</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              ? props.rows.map((row, index) => (
                  <Row
                    rowId={index}
                    personInfo={row}
                    onDelete={onDelete}
                    handleEdit={handleEdit}
                    key={index}
                  />
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
