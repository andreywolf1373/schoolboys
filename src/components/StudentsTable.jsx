import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";

const BASE_URL = "http://94.131.246.109:5555/v1";
const CLASS_KEY = "/2/";
const StudentTable = ({ students }) => {
  const [columns, setColumns] = useState([]);
  const [absences, setAbsences] = useState([]);
  const filteredStudents = students.filter((student) => {
    return (
      student.FirstName !== null &&
      student.SecondName !== null &&
      student.LastName !== null
    );
  });
  useEffect(() => {
    axios
      .get(`${BASE_URL}${CLASS_KEY}Column`)
      .then((res) => setColumns(res.data.Items))
      .catch((error) => console.error("Error fetching columns:", error));

    axios
      .get(`${BASE_URL}${CLASS_KEY}Rate`)
      .then((res) => setAbsences(res.data.Items))
      .catch((error) => console.error("Error fetching absences:", error));
  }, [columns, absences]);

  const handleAbsenceStatus = (studentId, columnId) => {
    const absence = absences.find(
      (item) => item.SchoolboyId === studentId && item.ColumnId === columnId
    );
    return absence ? "Н" : "";
  };

  const setAbsenceStatus = useMutation((data) => {
    axios.post(`${BASE_URL}${CLASS_KEY}Rate`, data);
  });
  const unsetAbsenceStatus = useMutation((data) =>
    axios.post(`${BASE_URL}${CLASS_KEY}UnRate`, data)
  );

  const toggleAbsenceStatus = (studentId, columnId) => {
    const absence = absences.find(
      (item) => item.SchoolboyId === studentId && item.ColumnId === columnId
    );
    if (absence) {
      unsetAbsenceStatus.mutate({
        SchoolboyId: studentId,
        ColumnId: columnId,
        Title: "",
      });
    } else {
      setAbsenceStatus.mutate({
        SchoolboyId: studentId,
        ColumnId: columnId,
        Title: "Н",
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> № </TableCell>
            <TableCell>Ім'я учня</TableCell>
            {columns.map((column) => (
              <TableCell key={column.Id}>{column.Title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.map((student, index) => (
            <TableRow key={student.Id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                <Link
                  to={`/student/%20${student.FirstName}%20${student.SecondName}%20${student.LastName}`}
                >
                  {student.FirstName} {student.SecondName} {student.LastName}
                </Link>
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.Id}
                  onClick={() => toggleAbsenceStatus(student.Id, column.Id)}
                >
                  {handleAbsenceStatus(student.Id, column.Id)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
