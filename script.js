
 let allIssues = [];

// Load issues from API
const loadIssues = () => {
  document.getElementById("loader").style.display = "flex";

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      allIssues = data.data;

      document.getElementById("loader").style.display = "none";

      displayIssues(allIssues);
      updateIssueCount(allIssues);
    })
    .catch(err => console.error(err));
};


// Display issues
const displayIssues = (issues) => {

  const container = document.getElementById("issues-container");
  container.innerHTML = "";

  issues.forEach(issue => {

    const border = issue.status === "open"
      ? "border-green-500"
      : "border-purple-500";

    const statusIcon = issue.status === "open"
      ? "./assets/Open-Status.png"
      : "./assets/Closed-Status.png";

    let priorityClass = "";

    if (issue.priority.toLowerCase() === "high") {
      priorityClass = "bg-red-200 text-red-800";
    }
    else if (issue.priority.toLowerCase() === "medium") {
      priorityClass = "bg-yellow-200 text-yellow-600";
    }
    else {
      priorityClass = "bg-gray-200 text-gray-700";
    }

    const labelsHTML = issue.labels
      .map(label =>
        `<span class="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-200 text-yellow-700">${label}</span>`
      )
      .join(" ");

    const card = document.createElement("div");

    card.innerHTML = `
    <div class="bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 ${border}">
      
      <div class="flex justify-between items-center mb-3">
        
        <div class="flex items-center gap-2">
          <img src="${statusIcon}" class="w-7 h-7" alt="">
          <span class="text-sm font-semibold">${issue.status}</span>
        </div>

        <span onclick="loadIssueDetails(${issue.id})"
        class="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${priorityClass}">
        ${issue.priority}
        </span>

      </div>

      <h3 onclick="loadIssueDetails(${issue.id})"
      class="font-bold text-lg cursor-pointer hover:text-blue-500">
      ${issue.title}
      </h3>

      <p class="text-gray-600 mt-2 line-clamp-2">
        ${issue.description}
      </p>

      <div class="mt-2 flex gap-2 flex-wrap">
        ${labelsHTML}
      </div>

      <hr class="border-gray-100 mt-3">

      <div onclick="loadIssueDetails(${issue.id})"
      class="mt-3 text-sm text-gray-600 space-y-1">

        <p><span class="font-semibold">Author:</span> ${issue.author}</p>
        ${new Date(issue.createdAt).toLocaleDateString()}

      </div>
    </div>
    `;

    container.appendChild(card);
  });
};


// Update Issue Count
const updateIssueCount = (issues) => {
  document.getElementById("issue-count").textContent =
    `${issues.length} Issues`;
};


// Load single issue
const loadIssueDetails = async (id) => {

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  );

  const data = await res.json();

  displayIssueDetails(data.data);
};


// Modal
const displayIssueDetails = (issue) => {

  const modalBox = document.getElementById("issue-details");

  modalBox.innerHTML = `
<div class="space-y-4">

  <h2 class="text-2xl font-bold">${issue.title}</h2>

  <div class="flex gap-4 text-sm text-gray-600">
    <span class="badge badge-success">${issue.status}</span>
    <span>Author: <strong>${issue.author}</strong></span>
    <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
  </div>

  <div class="flex flex-wrap gap-2">
    ${issue.labels.map(label =>
      `<span class="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-200 text-yellow-800">${label}</span>`
    ).join("")}
  </div>

  <div class="text-gray-700">
    ${issue.description}
  </div>

 <div class="flex justify-between mt-4">

  <!-- Assignee -->
  <div>
    <p class="text-sm text-gray-500">Assignee:</p>
    <p class="font-semibold">${issue.assignee}</p>
  </div>
<div class="text-center">
  <p class="text-sm text-gray-500">Priority:</p>

  <div class="flex justify-center mt-1">
  <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold 
  ${ issue.priority.toLowerCase() === "high" ? "bg-red-200 text-red-800" :
     issue.priority.toLowerCase() === "medium" ? "bg-yellow-200 text-yellow-700" :
     "bg-gray-200 text-gray-700"
  }">
    ${issue.priority}
  </span>
</div>

`;

  document.getElementById("issue_modal").showModal();
};


// Tabs
document.getElementById("tab-all").addEventListener("click", () => {
  displayIssues(allIssues);
  setActiveTab("tab-all");
  updateIssueCount(allIssues);
});

document.getElementById("tab-open").addEventListener("click", () => {

  const filtered = allIssues.filter(issue => issue.status === "open");

  displayIssues(filtered);
  setActiveTab("tab-open");
  updateIssueCount(filtered);
});

document.getElementById("tab-closed").addEventListener("click", () => {

  const filtered = allIssues.filter(issue => issue.status === "closed");

  displayIssues(filtered);
  setActiveTab("tab-closed");
  updateIssueCount(filtered);
});


// Active tab
const setActiveTab = (tabId) => {

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });

  const activeBtn = document.getElementById(tabId);

  activeBtn.classList.add("btn-primary");
  activeBtn.classList.remove("btn-outline");
};


// Search
document.getElementById("search-input").addEventListener("input", (e) => {

  const query = e.target.value.toLowerCase();

  const filtered = allIssues.filter(issue =>
    issue.title.toLowerCase().includes(query)
  );

  displayIssues(filtered);
  updateIssueCount(filtered);

});


// Initial load
loadIssues();