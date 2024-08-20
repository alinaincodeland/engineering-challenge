import Job from "../models/Job.js";
import Request from "../models/Request.js";
import { jobRepositoryInstance } from "../repository/JobRepository.js";

// Add new row functionality

document.getElementById("add-row-btn").addEventListener("click", () => {
  const tbody = document.querySelector("#headers-table tbody");
  const rowCount = tbody.rows.length;

  // Create new row with key and value cells
  const newRow = document.createElement("tr");
  const placeholders = { key: "Enter Key", value: "Enter Value" };
  ["key", "value"].forEach((type) => {
    const cell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.id = `${type}${rowCount + 1}`;
    input.name = `${type}${rowCount + 1}`;
    input.placeholder = placeholders[type];
    cell.appendChild(input);
    newRow.appendChild(cell);
  });

  tbody.appendChild(newRow);
});

// Submit new job functionality

const submitJob = (event) => {
  event.preventDefault();

  // Gather form data
  const name = document.getElementById("name").value.trim();

  if (!name) {
    alert("Job name is required.");
    return;
  }

  const httpMethod = document.getElementById("http-request").value;
  const apiEndpoint = document.getElementById("api-endpoint").value;

  const headers = {};
  const rows = document.querySelectorAll("#headers-table tbody tr");
  rows.forEach((row) => {
    const inputSelector = row.querySelectorAll('input[type="text"]');
    const key = inputSelector[0].value;
    const value = inputSelector[1].value;
    if (key && value) {
      headers[key] = value;
    }
  });

  const executeNow = document.getElementById("execute-now").checked;
  let executionTime;

  if (executeNow) {
    executionTime = new Date().toISOString();
  } else {
    const selectedDate = new Date(
      `${document.getElementById("date").value}T${
        document.getElementById("settime").value
      }`
    );

    const now = new Date();

    // Validate that the selected date is in the future
    if (selectedDate <= now) {
      alert("Please schedule the job in the future.");
      return;
    }

    executionTime = selectedDate.toISOString();
  }

  // Create Request and Job objects
  const request = new Request(
    httpMethod,
    apiEndpoint,
    headers,
    "",
    executionTime
  );

  const job = new Job(name, generateUniqueId(), request);

  // Add job to repository
  jobRepositoryInstance.createJob(job);

  alert("Job created successfully!");

  window.location.href = "jobs.html";
};

document.getElementById("form").addEventListener("submit", submitJob);
document.getElementById("form").reset();

// Generate a unique ID for a job
function generateUniqueId() {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString() + "dev";
}
