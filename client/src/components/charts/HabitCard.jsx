import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ChartHeader from "./ChartsHeader";

const HabitCard = ({ title, dataSource }) => {
  const text = "\u2605";

  return (
    <div className="w-12/12 pl-2 pr-2 pt-2">
      <ChartHeader title={title} />
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {dataSource.map((row) => (
              <TableRow key={row.goal_id}>
                {row.is_complete && (
                  <TableCell align="center">
                    <StarIcon sx={{ color: "#b88716" }} />
                  </TableCell>
                )}
                {!row.is_complete && <TableCell >{row.is_complete}</TableCell>}

                <TableCell variant="head">{row.goal_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HabitCard;
