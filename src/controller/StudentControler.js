// StudentController.js
import React, { useState, useEffect } from "react";
import Student from "../model/student";
import StudentView from "../view/StudentView";
function StudentController() {
  const [students, setStudents] = useState([
    new Student("Nguyễn Trần Hữu Phúc", "QE170051", "Active"),
    
  ]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    code: "",
    status: "Active",
  });
  const [totalSelected, setTotalSelected] = useState(0);

  const handleInputChange = (event) => {
    setNewStudent({
      ...newStudent,
      [event.target.name]: event.target.value,
    });
  };

  const addStudent = () => {
    setStudents([new Student(newStudent.name, newStudent.code, newStudent.status), ...students]);
    setNewStudent({ name: "", code: "", status: "Active" });
  };

  const deleteStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (index) => {
    setStudents((prevStudents) =>
      prevStudents.map((student, i) =>
        i === index ? { ...student, selected: !student.selected } : student
      )
    );
  };

  useEffect(() => {
    const countSelected = students.filter((student) => student.selected)
      .length;
    setTotalSelected(countSelected);
  }, [students]);

  const clearAll = () => {
    setStudents([]);
    setTotalSelected(0);
  };

  return (
    <StudentView
      students={students}
      newStudent={newStudent}
      totalSelected={totalSelected}
      handleInputChange={handleInputChange}
      addStudent={addStudent}
      deleteStudent={deleteStudent}
      handleCheckboxChange={handleCheckboxChange}
      clearAll={clearAll}
    />
  );
}

export default StudentController;