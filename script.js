let allIssues = [];
console.log("allIssues:", allIssues);
// Show loader
const showLoader = () => {
  console.log("Loader Showing...");
  document.getElementById("loader").style.display = "flex";
};

const hideLoader = () => {
  console.log("Loader Hidden");
  document.getElementById("loader").style.display = "none";
};

// Load issues from API
const loadIssues = () => {
  console.log("Fetching issues");
  showLoader();
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
    // console.log("API Data:", data);
      allIssues = data.data;
      hideLoader();
      displayIssues(allIssues);
      updateIssueCount(allIssues);
    })
    .catch(err => {
      console.error("Fetch Error:", err);
      hideLoader();
    });
};

// Display issues in cards
const displayIssues = (issues) => {
  const container = document.getElementById("issues-container");
  container.innerHTML = "";

  if (!issues || issues.length === 0) {
    container.innerHTML = `<p class="text-center col-span-full text-gray-500">No issues found.</p>`;
    return;
  }

  issues.forEach(issue => {
    // Top border color based on status
    const borderClass = issue.status === "open" ? "border-green-500" : "border-purple-500";
    const statusIcon = issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";

    // Priority badge
    let priorityClass = issue.priority.toLowerCase() === "high" ? "bg-red-200 text-red-800"
                      : issue.priority.toLowerCase() === "medium" ? "bg-yellow-200 text-yellow-700"
                      : "bg-gray-200 text-gray-700";

    // Labels
    const labelsHTML = issue.labels.map(label => {
      let labelClass = "bg-yellow-200 text-yellow-700";
      switch (label.toLowerCase()) {
        case "bug": labelClass = "bg-red-200 text-red-700"; break;
        case "help wanted": labelClass = "bg-blue-200 text-blue-700"; break;
        case "enhancement": labelClass = "bg-green-200 text-green-700"; break;
        case "good first issue": labelClass = "bg-purple-200 text-purple-700"; break;
      }
      return `<span class="px-2 py-1 rounded-full text-xs font-semibold ${labelClass}">${label.toUpperCase()}</span>`;
    }).join(" ");

    // Create card
    const card = document.createElement("div");
    card.className = `bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 ${borderClass}`;
    card.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <!-- Status icon left top -->
        <div class="flex items-center gap-2">
          <img src="${statusIcon}" class="w-7 h-7" alt="status">
        </div>

        <!-- Priority badge right top -->
        <span onclick="loadIssueDetails(${issue.id})" class="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${priorityClass}">
          ${issue.priority.toUpperCase()}
        </span>
      </div>

      <!-- Title -->
      <h3 onclick="loadIssueDetails(${issue.id})" class="font-bold text-lg cursor-pointer hover:text-blue-500 mb-2">
        ${issue.title}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm line-clamp-2 mb-2">${issue.description}</p>

      <!-- Labels -->
      <div class="flex gap-2 flex-wrap mb-2">${labelsHTML}</div>

      <hr class="border-gray-100 mt-2">

      <!-- Author & Date -->
      <div onclick="loadIssueDetails(${issue.id})" class="mt-2 text-sm text-gray-600">
        <p><span class="font-semibold">Author:</span> ${issue.author}</p>
        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
      </div>
    `;
    container.appendChild(card);
  });
};

// Update Issue Count
const updateIssueCount = (issues) => {
 // console.log("Issue Count:", issues.length);
  document.getElementById("issue-count").textContent = `${issues.length} Issues`;
};

// Load single issue
const loadIssueDetails = async (id) => {
  showLoader();
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const data = await res.json();
  hideLoader();
  displayIssueDetails(data.data);
};

// Modal display
const displayIssueDetails = (issue) => {
  const modalBox = document.getElementById("issue-details");

  // Labels in modal
  const labelsHTML = issue.labels.map(label => {
    let labelClass = "bg-yellow-200 text-yellow-800";
    switch (label.toLowerCase()) {
      case "bug": labelClass = "bg-red-200 text-red-800"; break;
      case "help wanted": labelClass = "bg-blue-200 text-blue-800"; break;
      case "enhancement": labelClass = "bg-green-200 text-green-800"; break;
      case "good first issue": labelClass = "bg-purple-200 text-purple-800"; break;
    }
    return `<span class="px-2 py-1 rounded-full text-xs font-semibold ${labelClass}">${label.toUpperCase()}</span>`;
  }).join(" ");

  // Priority badge in modal
  const priority = issue.priority.toUpperCase();
  const priorityClass = priority === "HIGH" ? "bg-red-200 text-red-800"
                     : priority === "MEDIUM" ? "bg-yellow-200 text-yellow-700"
                     : "bg-gray-200 text-gray-700";
 const statusClass =
  issue.status.toLowerCase() === "open"
    ? "bg-green-500 text-white"
    : "bg-purple-500 text-white-700";                    

  modalBox.innerHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold">${issue.title}</h2>
      <div class="flex gap-4 text-sm text-gray-600 items-center">
       <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusClass}">
       ${issue.status.toUpperCase()}
        </span>
        <span>Author: <strong>${issue.author}</strong></span>
        <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>
      <div class="flex flex-wrap gap-2">${labelsHTML}</div>
      <div class="text-gray-700">${issue.description}</div>

      <div class="flex justify-between mt-4 bg-gray-100 p-4 rounded text-sm text-center">
        <!-- Assignee -->
        <div>
          <p class="text-sm text-gray-500">Assignee:</p>
          <p class="font-semibold">${issue.assignee || "Unassigned"}</p>
        </div>

        <!-- Priority -->
        <div class="text-center">
          <p class="text-sm text-gray-500">Priority:</p>
          <div class="flex justify-center mt-1">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold ${priorityClass}">${priority}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("issue_modal").showModal();
};

// Tabs functionality with loader
const setupTabs = () => {
  const tabs = ["all", "open", "closed"];
  tabs.forEach(tab => {
    document.getElementById(`tab-${tab}`).addEventListener("click", () => {
      showLoader();
      setTimeout(() => {
        let filtered = [];
        if(tab === "all") filtered = allIssues;
        else filtered = allIssues.filter(issue => issue.status === tab);
        displayIssues(filtered);
        updateIssueCount(filtered);
        setActiveTab(`tab-${tab}`);
        hideLoader();
      }, 200);
    });
  });
};

// Active Tab Styling
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
  const filtered = allIssues.filter(issue => issue.title.toLowerCase().includes(query));
  displayIssues(filtered);
  updateIssueCount(filtered);
});

// Initialize
setupTabs();
loadIssues();