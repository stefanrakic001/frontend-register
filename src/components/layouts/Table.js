import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

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

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name </TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Car </TableCell>
            <TableCell align="right">Construction Address </TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{props.rows}</TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
