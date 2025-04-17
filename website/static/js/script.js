document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const contentContainer = document.querySelector(".content-container");
  const statsTitle = document.getElementById("stats-title");
  const statsContent = document.getElementById("stats-content");
  const videoContainer = document.querySelector(".video-container");

  const handleVideoTransition = (videoPath) => {
    const newVideo = document.createElement("video");
    newVideo.className = "background-video";
    newVideo.autoplay = true;
    newVideo.muted = true;
    newVideo.loop = true;
    newVideo.playsInline = true;
    newVideo.innerHTML = `<source src="${videoPath}" type="video/mp4">`;

    videoContainer.appendChild(newVideo);

    setTimeout(() => {
      const activeVideo = document.querySelector(".background-video.active");
      activeVideo.classList.remove("active");
      newVideo.classList.add("active");

      setTimeout(() => {
        activeVideo.remove();
        activeVideo.pause();
      }, 1500);
    }, 50);
  };

  const handleStats = async (statType, buttonText) => {
    try {
      const response = await fetch(`/get_stats/${statType}`);
      const data = await response.json();

      let content = "";
      switch (statType) {
        case "survival":
          content = `
                      <div class="stat-box">
                          <div class="stat-row">Died: ${data[0] || 0}</div>
                          <div class="stat-row">Survived: ${data[1] || 0}</div>
                      </div>
                  `;
          break;

        case "embarkation":
          content = `
                      <div class="stat-box">
                          ${Object.entries(data)
                            .map(
                              ([port, count]) => `
                              <div class="stat-row">Port ${port}: ${count} Passengers</div>
                          `
                            )
                            .join("")}
                      </div>
                  `;
          break;

        case "passenger":
          content = `
                      <div class="stat-box">
                          <div class="stat-row">Total Passengers: ${data.total}</div>
                          <div class="stat-row">Total Male: ${data.male}</div>
                          <div class="stat-row">Total Female: ${data.female}</div>
                      </div>
                  `;
          break;
      }

      statsTitle.textContent = buttonText;
      statsContent.innerHTML = content;
      contentContainer.classList.add("active");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (item.tagName === "BUTTON") {
        handleVideoTransition(item.dataset.bg);
        handleStats(item.dataset.stat, item.textContent);
      }
      dropdownMenu.classList.remove("active");
    });
  });

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu-container")) {
      dropdownMenu.classList.remove("active");
    }
  });
});
