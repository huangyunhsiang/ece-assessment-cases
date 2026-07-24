// 案例館前端互動：主題切換、案例篩選、燈箱
(function () {
  // 主題：?theme=a|b|c 記憶於 localStorage
  var params = new URLSearchParams(location.search);
  var theme = params.get("theme");
  if (theme && ["a", "b", "c"].includes(theme)) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("caseTheme", theme); } catch (e) {}
  }

  // 案例篩選（年齡 / 工具，單選各一，可疊加）
  var grid = document.getElementById("caseGrid");
  if (grid) {
    var state = { age: null, tool: null };
    function apply() {
      grid.querySelectorAll(".case-card").forEach(function (card) {
        var okAge = !state.age || card.dataset.age === state.age;
        var okTool = !state.tool || card.dataset.tools.split("|").includes(state.tool);
        card.classList.toggle("hide", !(okAge && okTool));
      });
    }
    document.querySelectorAll("[data-filter-age]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.age = state.age === btn.dataset.filterAge ? null : btn.dataset.filterAge;
        document.querySelectorAll("[data-filter-age]").forEach(function (b) {
          b.classList.toggle("active", b.dataset.filterAge === state.age);
        });
        apply();
      });
    });
    document.querySelectorAll("[data-filter-tool]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.tool = state.tool === btn.dataset.filterTool ? null : btn.dataset.filterTool;
        document.querySelectorAll("[data-filter-tool]").forEach(function (b) {
          b.classList.toggle("active", b.dataset.filterTool === state.tool);
        });
        apply();
      });
    });
    var clear = document.getElementById("clearFilter");
    if (clear) clear.addEventListener("click", function () {
      state.age = state.tool = null;
      document.querySelectorAll(".chip.active").forEach(function (b) { b.classList.remove("active"); });
      apply();
    });
  }

  // 燈箱
  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(lb);
  lb.addEventListener("click", function () { lb.classList.remove("open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("open"); });
  document.querySelectorAll(".shot").forEach(function (fig) {
    fig.addEventListener("click", function () {
      lb.querySelector("img").src = fig.querySelector("img").src;
      lb.querySelector("figcaption").textContent = (fig.querySelector("figcaption") || {}).textContent || "";
      lb.classList.add("open");
    });
  });
})();
