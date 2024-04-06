import { useQuery } from "react-query";
import axios from "axios";
import StudentTable from "../components/StudentsTable";

const StudentsPage = () => {
  const { data, isLoading, isError } = useQuery("students", () =>
    axios
      .get("http://94.131.246.109:5555/v1/2/Schoolboy")
      .then((res) => res.data)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return <StudentTable students={data.Items} />;
};

export default StudentsPage;
