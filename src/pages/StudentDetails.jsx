import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const StudentDetails = () => {
  const { id } = useParams();

  console.log(id);
  return (
    <div>
      <h1>{id}</h1>
      <Link to="/">Назад</Link>
    </div>
  );
};

export default StudentDetails;
