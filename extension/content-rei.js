(function () {
  function extractProductTitle() {
    const h1 = document.querySelector("h1");
    return h1?.textContent?.trim() ?? document.title;
  }

  // REI renders spec tables a few different ways depending on the page template.
  // Try the common patterns and merge whatever key/value pairs turn up.
  function extractSpecs() {
    const specs = {};

    document.querySelectorAll("dl").forEach((dl) => {
      const terms = dl.querySelectorAll("dt");
      const defs = dl.querySelectorAll("dd");
      terms.forEach((dt, i) => {
        const key = dt.textContent?.trim();
        const value = defs[i]?.textContent?.trim();
        if (key && value) specs[key] = value;
      });
    });

    document.querySelectorAll("table tr").forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      if (cells.length === 2) {
        const key = cells[0].textContent?.trim();
        const value = cells[1].textContent?.trim();
        if (key && value) specs[key] = value;
      }
    });

    return specs;
  }

  function buildWidget() {
    const container = document.createElement("div");
    container.id = "fledge-fit-widget";

    const button = document.createElement("button");
    button.id = "fledge-fit-button";
    button.textContent = "🏕 Check fit for trip";
    container.appendChild(button);

    const panel = document.createElement("div");
    panel.id = "fledge-fit-panel";
    panel.className = "hidden";
    container.appendChild(panel);

    document.body.appendChild(container);
    return { button, panel };
  }

  function renderPickerPanel(panel, title) {
    const guessedId = guessGearItemId(title);
    const options = FLEDGE_GEAR_CATALOG.map(
      (item) =>
        `<option value="${item.id}" ${item.id === guessedId ? "selected" : ""}>${item.name}</option>`,
    ).join("");

    panel.innerHTML = `
      <p class="fledge-fit-title">What is this for on your checklist?</p>
      <select id="fledge-fit-select">${options}</select>
      <button id="fledge-fit-submit">Score this fit</button>
      <div id="fledge-fit-result"></div>
    `;
    panel.classList.remove("hidden");
  }

  function renderResult(container, response, itemId) {
    if (!response.ok) {
      container.innerHTML = `<p class="fledge-fit-error">${response.error}</p>`;
      return;
    }

    const { itemName, score, verdict, reasons, commonlyMissed } = response.result;
    const checkOffHtml = `<button class="fledge-fit-checkoff" data-item-id="${itemId}">Mark as checked off</button><p class="fledge-fit-checkoff-status"></p>`;

    if (score === null) {
      container.innerHTML = `
        <p class="fledge-fit-verdict">${verdict}</p>
        <p class="fledge-fit-note">Fit-scoring for "${itemName}" isn't built yet — check it against your checklist manually.</p>
        ${checkOffHtml}
      `;
      return;
    }

    const reasonsHtml = reasons.map((r) => `<li>${r}</li>`).join("");
    container.innerHTML = `
      <p class="fledge-fit-score">${score}<span>/100</span></p>
      <p class="fledge-fit-verdict">${verdict} — ${itemName}</p>
      <ul class="fledge-fit-reasons">${reasonsHtml}</ul>
      ${commonlyMissed ? '<p class="fledge-fit-note">This is one of the items beginners most commonly forget for this kind of trip.</p>' : ""}
      ${checkOffHtml}
    `;
  }

  async function init() {
    const title = extractProductTitle();
    const { button, panel } = buildWidget();

    button.addEventListener("click", () => {
      if (panel.classList.contains("hidden")) {
        renderPickerPanel(panel, title);
      } else {
        panel.classList.add("hidden");
      }
    });

    panel.addEventListener("click", (event) => {
      if (event.target.id === "fledge-fit-submit") {
        const select = panel.querySelector("#fledge-fit-select");
        const resultEl = panel.querySelector("#fledge-fit-result");
        resultEl.innerHTML = `<p class="fledge-fit-loading">Scoring…</p>`;

        const itemId = select.value;
        const specs = extractSpecs();
        chrome.runtime.sendMessage(
          { type: "FLEDGE_SCORE_PRODUCT", itemId, specs },
          (response) =>
            renderResult(resultEl, response ?? { ok: false, error: "No response." }, itemId),
        );
        return;
      }

      if (event.target.classList.contains("fledge-fit-checkoff")) {
        const itemId = event.target.dataset.itemId;
        const statusEl = event.target.nextElementSibling;
        event.target.disabled = true;
        chrome.runtime.sendMessage({ type: "FLEDGE_SET_CHECKED", itemId }, (response) => {
          if (response?.ok) {
            statusEl.textContent = "Checked off ✓";
          } else {
            event.target.disabled = false;
            statusEl.textContent = response?.error ?? "Couldn't check this off.";
          }
        });
      }
    });
  }

  init();
})();
