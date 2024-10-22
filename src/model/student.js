// student.js
class Student {
  constructor(name, code, status) {
    this.name = name;
    this.code = code;
    this.status = status;
    this.selected = false; // Add selected property
  }
}

export default Student;