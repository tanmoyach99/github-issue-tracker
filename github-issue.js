const loadAllIssues = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues ",
  );
  const issues = await res.json();
  displayAllIssue(issues.data);
};

const displayAllIssue = (data) => {
  console.log(data);
  const allIssues = document.getElementById("all-issues");
  allIssues.innerHTML = "";
  data.forEach((issue) => {
    const statusIcon =
      issue.status === "open"
        ? '<img src="./assets/Open-Status.png" alt="open" class="w-6 h-6" />'
        : '<img src="./assets/Closed- Status.png" alt="closed" class="w-6 h-6" />';
    const topBarClass = issue.status === "open" ? "bg-success" : "bg-primary";
    const card = document.createElement("div");
    const priorityClass =
      issue.priority === "high"
        ? "text-red-500 bg-red-200"
        : issue.priority === "medium"
          ? "text-orange-500 bg-orange-200"
          : "text-black bg-gray-200";

    const labelBadges = issue.labels
      .map((label) => {
        const labelClass =
          label === "bug"
            ? "text-red-500 bg-red-200 border-none"
            : label === "help wanted"
              ? "text-orange-500 bg-orange-200 border-none"
              : "text-green-500 bg-green-200 border-none";

        const labelIcons =
          label === "bug"
            ? '<i class="fa-solid fa-bug"></i>'
            : label === "help wanted"
              ? '<i class="fa-solid fa-gear"></i>'
              : '<i class="fa-solid fa-wand-magic-sparkles"></i>';

        return `
      <span class="badge ${labelClass} text-xs flex items-center gap-1">
        ${labelIcons} ${label.toUpperCase()}
      </span>
    `;
      })
      .join("");
    card.className = "h-full";

    card.innerHTML = `
  <div class="card h-full flex flex-col bg-base-100 shadow-md border border-base-200">

    <!-- Top Border -->
    <div class="${topBarClass} rounded-t-lg h-1"></div>

    <div class="card-body flex flex-col gap-3 h-full">

      <!-- Header -->
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

      <!-- Content Grow Area -->
      <div class="flex-grow">

        <!-- Title -->
        <h2 class="card-title text-base font-semibold leading-snug">
          ${issue.title}
        </h2>

        <!-- Description -->
        <p class="text-sm text-base-content/70 line-clamp-2">
          ${issue.description}
        </p>

        <!-- Labels -->
        <div class="flex flex-wrap gap-2 mt-2 font-semibold">
          ${labelBadges}
        </div>

      </div>

      <!-- Divider -->
      <div class="divider my-1"></div>

      <!-- Footer -->
      <div class="text-xs text-base-content/60 flex justify-between mt-auto">
        <span>#${issue.id} by ${issue.author}</span>
        <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>
      <div class="text-xs text-base-content/60 flex justify-between mt-auto">
        <span>${issue.assignee ? issue.assignee : " No Assignee"}</span>
        <span>updated:${new Date(issue.updatedAt).toLocaleDateString()}</span>
      </div>

    </div>
  </div>
`;
    allIssues.append(card);
  });
};
const displaySpecific = async () => {
  const all = document.getElementById("all");
  const open = document.getElementById("open");
  const closed = document.getElementById("closed");
};

loadAllIssues();
