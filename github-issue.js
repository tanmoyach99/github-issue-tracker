const loadAllIssues = async () => {
  showLoader();
  hideEmpty();

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues", //all issues api
  );
  const issues = await res.json();

  hideLoader();

  if (!issues.data.length) {
    showEmpty(); //showing empty message
  } else {
    displayAllIssue(issues.data); //showing all issue
    setupFilters(issues.data); // filtering on status
  }
};

const displayAllIssue = (issues) => {
  const allIssues = document.getElementById("all-issues");
  const totalIssue = document.getElementById("total-issue");
  totalIssue.innerHTML =
    issues.length === 0 ? "0 issues found" : `${issues.length} issues`;
  allIssues.innerHTML = "";

  if (issues.length === 0) {
    showEmpty();
    return;
  } else {
    hideEmpty();
  }

  issues.forEach((issue) => {
    const statusIcon =
      issue.status === "open"
        ? '<img src="./assets/Open-Status.png" class="w-6 h-6" />'
        : '<img src="./assets/Closed-Status.png" class="w-6 h-6" />'; //conditional card header image

    const topBarClass = issue.status === "open" ? "bg-success" : "bg-primary"; //conditional top border

    const priorityClass =
      issue.priority === "high"
        ? "text-red-500 bg-red-200"
        : issue.priority === "medium"
          ? "text-orange-500 bg-orange-200"
          : "text-gray-700 bg-gray-200"; //condition priority

    const labelBadges = issue.labels
      .map((label) => {
        const labelClass =
          label === "bug"
            ? "text-red-500 bg-red-200"
            : label === "help wanted"
              ? "text-orange-500 bg-orange-200"
              : "text-green-500 bg-green-200";

        const labelIcons =
          label === "bug"
            ? '<i class="fa-solid fa-bug"></i>'
            : label === "help wanted"
              ? '<i class="fa-solid fa-circle-question"></i>'
              : '<i class="fa-solid fa-wand-magic-sparkles"></i>';

        return `
          <span class="px-2 py-1 rounded-full text-xs flex items-center gap-1 ${labelClass}">
            ${labelIcons} ${label.toUpperCase()}
          </span>
        `; //conditional labels and text and badges color
      })
      .join("");

    const card = document.createElement("div");
    card.className = "h-full";

    card.innerHTML = `
      <div class="card h-full flex flex-col bg-base-100 shadow-md border border-base-200" onclick=openModal(${issue.id})>

        <div class="${topBarClass} h-1 rounded-t-lg"></div>

        <div class="card-body flex flex-col gap-3 h-full">

          <div class="flex justify-between items-center">
            <div class="w-8 h-8 rounded-full border-2 ${
              issue.status === "open" ? "border-success" : "border-primary"
            } flex items-center justify-center">
              ${statusIcon}
            </div>

            <span class="px-3 py-1 text-xs font-semibold uppercase rounded-full ${priorityClass}">
              ${issue.priority}
            </span>
          </div>

          <div class="flex-grow">
            <h2 class="card-title text-base">${issue.title}</h2>
            <p class="text-sm text-base-content/70 line-clamp-2">
              ${issue.description}
            </p>

            <div class="flex flex-wrap gap-2 mt-2">
              ${labelBadges}
            </div>
          </div>

          <div class="divider my-1"></div>

          <div class="text-xs flex justify-between mt-auto">
            <span>#${issue.id} by ${issue.author}</span>
            <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>

          <div class="text-xs flex justify-between">
            <span>${issue.assignee || "No Assignee"}</span>
            <span>updated: ${new Date(issue.updatedAt).toLocaleDateString()}</span>
          </div>

        </div>
      </div>
    `;

    allIssues.append(card);
  });
};

// ...................................filtering based on status..........................................................//

const setupFilters = (data) => {
  const all = document.getElementById("all");
  const open = document.getElementById("open");
  const closed = document.getElementById("closed");

  const setActive = (btn) => {
    all.classList.remove("btn-primary");
    open.classList.remove("btn-primary");
    closed.classList.remove("btn-primary");
    btn.classList.add("btn-primary");
  };

  all.addEventListener("click", () => {
    setActive(all);
    displayAllIssue(data);
  });
  //when open clicked
  open.addEventListener("click", () => {
    setActive(open);
    displayAllIssue(data.filter((i) => i.status === "open"));
  });
  //when closed clicked
  closed.addEventListener("click", () => {
    setActive(closed);
    displayAllIssue(data.filter((i) => i.status === "closed"));
  });
};
//.................................modal........................................//
const openModal = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const issue = data.data;

  const modal = document.getElementById("issue_modal");

  const priorityClass =
    issue.priority === "high"
      ? "badge-error"
      : issue.priority === "medium"
        ? "badge-warning"
        : "badge-ghost";

  const labels = issue.labels
    .map((label) => {
      const labelClass =
        label === "bug"
          ? "text-red-500 bg-red-200 "
          : label === "help wanted"
            ? "text-orange-500 bg-orange-200"
            : "text-green-500 bg-green-200";

      const icon =
        label === "bug"
          ? `<i class="fa-solid fa-bug"></i>`
          : label === "help wanted"
            ? `<i class="fa-solid fa-circle-question"></i>`
            : `<i class="fa-solid fa-wand-magic-sparkles"></i>`;

      return `<span class="badge ${labelClass} gap-1">${icon} ${label}</span>`;
    })
    .join("");

  modal.innerHTML = `
    <input type="checkbox" id="issue-modal" class="modal-toggle" checked />

    <div class="modal">
      <div class="modal-box max-w-2xl">

        <!-- Header -->
        <div class="flex items-center gap-3 mb-4">
          <h2 class="text-xl font-bold">${issue.title}</h2>
          <span class="badge badge-success">${issue.status}</span>
        </div>

        <!-- Meta -->
        <p class="text-sm text-gray-500 mb-3">
          Opened by <strong>${issue.author}</strong> • ${new Date(
            issue.createdAt,
          ).toLocaleDateString()}
        </p>

        <!-- Labels -->
        <div class="flex gap-2 mb-4 flex-wrap">
          ${labels}
        </div>

        <!-- Description -->
        <p class="text-gray-600 mb-6">
          ${issue.description}
        </p>

        <!-- Info -->
        <div class="bg-base-200 p-4 rounded-lg flex justify-between mb-6">
          <div>
            <p class="text-sm text-gray-500">Assignee</p>
            <p class="font-semibold">${issue.assignee || "Unassigned"}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Priority</p>
            <span class="badge ${priorityClass}">
              ${issue.priority}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="modal-action">
          <label for="issue-modal" class="btn btn-primary">
            Close
          </label>
        </div>

      </div>
    </div>
  `;
};
//..............................................search function.............................///
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", async function () {
  const inputValue = searchInput.value.trim(); // get value on click

  if (!inputValue) return; // prevent empty search

  showLoader();
  hideEmpty();

  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`,
    );

    const data = await res.json();
    const issues = data.data;
    document.getElementById("all-issues").innerHTML = "";
    document.getElementById("total-issue").innerHTML = "no issues found ";

    if (!issues.length) {
      showEmpty();
    } else {
      displayAllIssue(issues);
    }
    searchInput.value = "";
  } catch (error) {
    console.error("Search error:", error);
    showEmpty();
  } finally {
    hideLoader();
  }
});
//..........................................................loader issue.............................................................//
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden"); //loader shown initially//
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden"); //loader hidden after fetching issues from api//
};

const showEmpty = () => {
  document.getElementById("empty-state").classList.remove("hidden"); //show some message based on founding//
};

const hideEmpty = () => {
  document.getElementById("empty-state").classList.add("hidden"); //when issue has been found//
};

loadAllIssues();
