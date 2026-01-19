export const employeeStyles = `
  .employee-container {
    padding: 24px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    color: #323130;
    margin: 0 0 24px 0;
    font-size: 28px;
    font-weight: 600;
    border-bottom: 3px solid #0078d4;
    padding-bottom: 12px;
  }

  h3 {
    color: #605e5c;
    font-size: 18px;
    margin: 0 0 16px 0;
  }

  /* Loading Spinner */
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: #605e5c;
  }

  .spinner {
    border: 4px solid #f3f2f1;
    border-top: 4px solid #0078d4;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Error Message */
  .error-message {
    padding: 16px 20px;
    background-color: #fde7e9;
    color: #a80000;
    border-left: 4px solid #a80000;
    border-radius: 4px;
    margin-bottom: 24px;
    font-size: 14px;
  }

  /* Add Employee Form */
  .add-employee-form {
    background: #f3f2f1;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 32px;
  }

  .form-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .form-input {
    flex: 1;
    min-width: 200px;
    padding: 10px 12px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    font-size: 14px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: border-color 0.2s;
  }

  .form-input:focus {
    outline: none;
    border-color: #0078d4;
    box-shadow: 0 0 0 1px #0078d4;
  }

  .btn-add {
    padding: 10px 24px;
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .btn-add:hover {
    background-color: #106ebe;
  }

  .btn-add:active {
    background-color: #005a9e;
  }

  /* Employee Count */
  .employee-count {
    color: #605e5c;
    font-size: 14px;
    margin-bottom: 16px;
    font-weight: 500;
  }

  /* Table Container */
  .table-container {
    overflow-x: auto;
    margin-top: 24px;
  }

  .employee-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
  }

  .employee-table th {
    background-color: #0078d4;
    color: white;
    padding: 14px 16px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .employee-table td {
    padding: 14px 16px;
    border-bottom: 1px solid #edebe9;
    color: #323130;
    font-size: 14px;
  }

  .employee-table tbody tr {
    transition: background-color 0.15s;
  }

  .employee-table tbody tr:hover {
    background-color: #f3f2f1;
  }

  .employee-table tbody tr:last-child td {
    border-bottom: none;
  }

  /* Delete Button */
  .btn-delete {
    padding: 6px 16px;
    background-color: #d13438;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .btn-delete:hover {
    background-color: #a4262c;
  }

  .btn-delete:active {
    background-color: #8a1c20;
  }

  /* No Data */
  .no-data {
    text-align: center;
    padding: 60px 20px;
    color: #605e5c;
    font-style: italic;
    font-size: 16px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .form-group {
      flex-direction: column;
    }

    .form-input {
      width: 100%;
    }

    .employee-table {
      font-size: 12px;
    }

    .employee-table th,
    .employee-table td {
      padding: 10px 8px;
    }
  }
`;
