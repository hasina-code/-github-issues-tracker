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


};

// Update Issue Count
const updateIssueCount = (issues) => {
 // console.log("Issue Count:", issues.length);
  document.getElementById("issue-count").textContent = `${issues.length} Issues`;
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



// Initialize
setupTabs();
loadIssues();