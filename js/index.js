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
