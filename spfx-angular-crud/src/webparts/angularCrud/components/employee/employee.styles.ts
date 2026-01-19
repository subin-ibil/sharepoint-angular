// employee.styles.ts
export const employeeStyles = `
.employee-container {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

.employee-container h2 {
  color: #0078d4;
  margin-bottom: 20px;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 10px;
}

.employee-container h3 {
  color: #333;
  margin-bottom: 15px;
}

.form-section {
  background: #f3f2f1;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px;
}

.form-section form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.form-group {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #323130;
}

.form-group input {
  padding: 8px 12px;
  border: 1px solid #8a8886;
  border-radius: 2px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #0078d4;
  box-shadow: 0 0 0 1px #0078d4;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #0078d4;
  color: white;
}

.btn-primary:hover {
  background-color: #106ebe;
}

.btn-secondary {
  background-color: #edebe9;
  color: #323130;
}

.btn-secondary:hover {
  background-color: #e1dfdd;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #0078d4;
  color: white;
}

thead th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
}

tbody tr {
  border-bottom: 1px solid #edebe9;
}

tbody tr:hover {
  background-color: #f3f2f1;
}

tbody td {
  padding: 12px;
  color: #323130;
}

.btn-delete {
  background-color: #d13438;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 13px;
}

.btn-delete:hover {
  background-color: #a4262c;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #605e5c;
  font-style: italic;
}
`;
