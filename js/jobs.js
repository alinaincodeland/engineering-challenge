import { jobRepositoryInstance } from "../repository/JobRepository.js";

let showFavoritesOnly = false;

// Render jobs in the table
function renderJobs() {
  const jobs = jobRepositoryInstance.getAllJobs();
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  jobs.forEach((job) => {
    if (showFavoritesOnly && !job.favorite) {
      return;
    }

    const row = document.createElement("tr");

    // Favourite button cell
    const favouriteCell = document.createElement("td");
    const favouriteButton = document.createElement("button");
    favouriteButton.setAttribute("class", "star-btn");
    favouriteButton.innerHTML = job.favorite ? "★" : "☆";
    favouriteButton.addEventListener("click", () => {
      job.favorite = !job.favorite;
      jobRepositoryInstance.saveJobs();
      renderJobs();
    });
    favouriteCell.appendChild(favouriteButton);

    // ID cell
    const idCell = document.createElement("td");
    idCell.textContent = job.id;

    // Job Name cell
    const nameCell = document.createElement("td");
    nameCell.textContent = job.name;

    // Submitted cell
    const submittedCell = document.createElement("td");
    const submittedDate = new Date().toLocaleDateString();
    submittedCell.textContent = submittedDate;

    // Execution cell

    const executionCell = document.createElement("td");
    const executionDate = job.request.executionTime
      ? new Date(job.request.executionTime).toLocaleDateString()
      : "Immediate";
    executionCell.textContent = executionDate;

    // Status cell
    const statusCell = document.createElement("td");

    const now = new Date();
    const executionTime = new Date(job.request.executionTime);

    if (executionTime <= now) {
      statusCell.textContent = "Completed";
      statusCell.style.color = "green";
    } else {
      statusCell.textContent = "Scheduled";
      statusCell.style.color = "orange";
    }

    // Details button cell
    const detailsCell = document.createElement("td");
    const detailsButton = document.createElement("button");
    detailsButton.setAttribute("class", "details-btn");
    detailsButton.textContent = "Details";
    detailsButton.addEventListener("click", () => {
      alert(`Showing details for job: ${job.id}`);
    });
    detailsCell.appendChild(detailsButton);

    // Append all cells to the row
    row.appendChild(favouriteCell);
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(submittedCell);
    row.appendChild(executionCell);
    row.appendChild(statusCell);
    row.appendChild(detailsCell);

    tbody.appendChild(row);
  });
}

// Render only favourite jobs when button is clicked
document.getElementById("show-favorites-btn").addEventListener("click", () => {
  showFavoritesOnly = !showFavoritesOnly;
  renderJobs();
});

// Initial render
renderJobs();
