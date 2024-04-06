import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentsPage from "./pages/StudentsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import StudentDetails from "./pages/StudentDetails";

function App() {
  const query = new QueryClient();
  return (
    <QueryClientProvider client={query}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentsPage />} />
          <Route path="/student/:id" element={<StudentDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
