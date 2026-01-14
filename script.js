let startTime = Date.now();
let mouseMoves = 0;
let scrollDepth = 0;
let tabSwitches = 0;
let userIP = "Unknown";
let isp = "Unknown";
let country = "Unknown";
let keyBuffer = "";
let pendingSave = false;

// ==========================
// Fetch Public IP + Location
// ==========================
fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    userIP = data.ip;
    country = data.country_name;
    isp = data.org;
  })
  .catch(() => {
    userIP = "Blocked / Not available";
  });

// ==========================
// Mouse movement tracking
// ==========================
document.addEventListener("mousemove", () => {
  mouseMoves++;
});

// ==========================
// Scroll tracking
// ==========================
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY + window.innerHeight;
  const height = document.documentElement.scrollHeight;
  scrollDepth = Math.max(
    scrollDepth,
    Math.round((scrolled / height) * 100)
  );
});

// ==========================
// Tab focus tracking
// ==========================
window.addEventListener("blur", () => tabSwitches++);
window.addEventListener("focus", () => tabSwitches++);

// ==========================
// Awareness trigger (30 sec)
// ==========================
setTimeout(showAwareness, 30000);

function showAwareness() {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);

  const report = `
    <ul>
      <li><strong>Public IP Address:</strong> ${userIP}</li>
      <li><strong>Country:</strong> ${country}</li>
      
      <li><strong>Mouse movements:</strong> ${mouseMoves}</li>
      <li><strong>Tab switches:</strong> ${tabSwitches}</li>
      <li><strong>Screen:</strong> ${screen.width}x${screen.height}</li>
      <li><strong>Timezone:</strong> ${Intl.DateTimeFormat().resolvedOptions().timeZone}</li>
    </ul>
  `;

  document.getElementById("report").innerHTML = report;
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("loader").style.display = "none";  
}

function continueThinking() {
  document.getElementById("overlay").style.display = "none";
}

// ==========================
// Secret typing trigger
// ==========================

const secretKey = "iamaware"; // secret phrase

document.addEventListener("keydown", (e) => {
  // Only track printable characters
  if (e.key.length === 1) {
    keyBuffer += e.key.toLowerCase();

    // Keep buffer same length as secret
    if (keyBuffer.length > secretKey.length) {
      keyBuffer = keyBuffer.slice(-secretKey.length);
    }

    // Match secret phrase
    if (keyBuffer === secretKey) {
      revealSecret();
      keyBuffer = ""; // reset buffer
    }
  }
});

// ==========================
// Secret action
// ==========================

function revealSecret() {
  // Optional: small delay for effect
  setTimeout(() => {
    window.location.href = "/WOYM/Backgrounds/mirror.html";
  }, 500);
}

// ctrl + s interation
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "s") {
    setTimeout(() => {
      showCtrlSMessage();
    }, 300);
  }
});

function showCtrlSMessage() {
  const msg = document.createElement("div");
  msg.innerText = "Your browser offered to save this page. That feeling matters.";
  msg.style.position = "fixed";
  msg.style.bottom = "15px";
  msg.style.right = "10px";
  msg.style.background = "rgba(2,30,18,0.9)";
  msg.style.color = "#e5e7eb";
  msg.style.padding = "10px 15px";
  msg.style.borderRadius = "8px";
  msg.style.zIndex = "9999";
  msg.style.fontSize = "0.9em";

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 8000);
}

// === CONFESSION EXPORT (HIDDEN FEATURE) ===
document.addEventListener("DOMContentLoaded", () => {

  // Ctrl+Shift+S trigger
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (!pendingSave) showSavePrompt();
    }
  });

  function showSavePrompt() {
    const textarea = document.querySelector("textarea");
    if (!textarea || textarea.value.trim() === "") return;

    pendingSave = true;
    document.getElementById("saveOverlay").classList.remove("hidden");
  }

  function closeSavePrompt() {
    pendingSave = false;
    document.getElementById("saveOverlay").classList.add("hidden");
  }

  document.getElementById("confirmSave").addEventListener("click", () => {
    exportConfession();
    closeSavePrompt();
  });

  document.getElementById("cancelSave").addEventListener("click", () => {
    closeSavePrompt();
  });

  function exportConfession() {
    const textarea = document.querySelector("textarea");
    if (!textarea || textarea.value.trim() === "") return;

    const confession = textarea.value.trim();
    const now = new Date();

    const content = `
CONFESSION LOG
────────────────────────────
Date: ${now.toLocaleDateString()}
Time: ${now.toLocaleTimeString()}

User Environment:
- Browser: ${navigator.userAgent}
- Platform: ${navigator.platform}
- Screen: ${window.screen.width} x ${window.screen.height}

────────────────────────────
You wrote:

"${confession}"

────────────────────────────
You chose to save this.

Some thoughts feel lighter when written down.
Others feel heavier once they exist.

Nothing was uploaded.
But this moment still happened.
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `confession_${now.getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});


