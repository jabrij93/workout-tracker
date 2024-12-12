document.addEventListener("DOMContentLoaded", () => {
    const graph = document.querySelector(".graph");
  
    // Generate random data for contributions
    for (let i = 0; i < 365; i++) {
      const level = Math.floor(Math.random() * 5); // 0 to 4
      const div = document.createElement("div");
      if (level > 0) div.classList.add(`level-${level}`);
      graph.appendChild(div);
    }
  });  