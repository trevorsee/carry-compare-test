const DATA_URL = "./data/plans.json";
const EVENTS_KEY = "cc_compare_events_v1";

/** @typedef {"known"|"unknown"|"not_disclosed"|"varies"} FieldStatus */

function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(v) {
  if (typeof v !== "number" || Number.isNaN(v)) return "—";
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(v);
}

function nowIso() {
  return new Date().toISOString();
}

function loadEvents() {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-2000)));
}

function track(name, props = {}) {
  const events = loadEvents();
  events.push({ ts: nowIso(), name, props });
  saveEvents(events);
  renderAnalyticsPreview();
}

function downloadJson(filename, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const US_STATES = [
  ["", "Any state"],
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"]
];

function getTaxLabel(taxonomies, typeStr, id) {
  if (!typeStr.startsWith("enum:")) return String(id ?? "");
  const taxKey = typeStr.slice("enum:".length);
  const list = taxonomies[taxKey] || [];
  const found = list.find((x) => x.id === id);
  return found ? found.label : String(id ?? "");
}

function statusLabel(status) {
  if (status === "known") return "Known";
  if (status === "unknown") return "Unknown";
  if (status === "not_disclosed") return "Not disclosed";
  if (status === "varies") return "Varies";
  return "Unknown";
}

function renderStatusPill(status) {
  const cls = `status status--${status === "not_disclosed" ? "not_disclosed" : status}`;
  return `<span class="${cls}">${escapeHtml(statusLabel(status))}</span>`;
}

function fieldToDisplayValue(field, attrDef, data) {
  if (!field) return { status: "unknown", html: "—", sourcesHtml: "" };
  const status = field.status || "unknown";
  let valueText = "—";

  if (attrDef.type === "money") {
    if (status === "known") valueText = formatMoney(field.value);
  } else if (attrDef.type.startsWith("enum:")) {
    if (status === "known") valueText = getTaxLabel(data.taxonomies, attrDef.type, field.value);
  } else if (attrDef.type === "list") {
    if (status === "known" && Array.isArray(field.value)) {
      valueText = field.value.join("\n");
    }
  } else {
    if (status === "known") valueText = String(field.value ?? "—");
  }

  if (status !== "known") {
    valueText = String(field.note || statusLabel(status));
  }

  const sources = Array.isArray(field.sources) ? field.sources : [];
  const sourcesHtml =
    sources.length === 0
      ? ""
      : `<div class="sourceList">Source: ${sources
          .map((s) => `<a href="${escapeHtml(s.url)}" target="_blank" rel="noreferrer">${escapeHtml(s.title || s.url)}</a>`)
          .join(", ")}${field.lastVerified ? ` · Last verified: ${escapeHtml(field.lastVerified)}` : ""}</div>`;

  const html =
    attrDef.type === "list" && status === "known" && Array.isArray(field.value)
      ? `<ul>${field.value.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
      : `<div>${escapeHtml(valueText)}</div>`;

  return { status, html, sourcesHtml };
}

function availabilityMatches(plan, stateCode, includeUnknown) {
  if (!stateCode) return true;
  const av = plan.availability || { status: "unknown" };
  if (av.status !== "known") return includeUnknown;
  const included = Array.isArray(av.statesIncluded) ? av.statesIncluded : [];
  const excluded = Array.isArray(av.statesExcluded) ? av.statesExcluded : [];
  if (excluded.includes(stateCode)) return false;
  if (included.length === 0) return true;
  return included.includes(stateCode);
}

function priceMatches(plan, maxMonthly, includeUnknownPrice) {
  const f = plan.fields?.monthly_price_usd;
  if (!f || f.status !== "known") return includeUnknownPrice;
  const v = Number(f.value);
  if (Number.isNaN(v)) return includeUnknownPrice;
  return v <= maxMonthly;
}

function enumMatches(plan, fieldId, allowedIds) {
  if (!allowedIds || allowedIds.size === 0) return true;
  const f = plan.fields?.[fieldId];
  if (!f || f.status !== "known") return false;
  return allowedIds.has(String(f.value));
}

function summarizeUnknowns(plan, data) {
  let known = 0;
  let unknown = 0;
  let notDisclosed = 0;
  let varies = 0;

  const attrIds = new Set(data.themes.flatMap((t) => t.attributes.map((a) => a.id)));
  for (const id of attrIds) {
    const f = plan.fields?.[id];
    const st = (f?.status || "unknown");
    if (st === "known") known += 1;
    else if (st === "not_disclosed") notDisclosed += 1;
    else if (st === "varies") varies += 1;
    else unknown += 1;
  }
  return { known, unknown, notDisclosed, varies, total: known + unknown + notDisclosed + varies };
}

function computeDatasetFreshness(data) {
  const dates = [];
  for (const p of data.plans || []) {
    for (const f of Object.values(p.fields || {})) {
      if (typeof f?.lastVerified === "string") dates.push(f.lastVerified);
    }
  }
  dates.sort();
  const last = dates.length ? dates[dates.length - 1] : data.meta?.lastUpdated;
  return last ? `Last verified: ${last}` : "Last verified: —";
}

function computePlanFreshness(plan) {
  const dates = [];
  for (const f of Object.values(plan.fields || {})) {
    if (typeof f?.lastVerified === "string") dates.push(f.lastVerified);
  }
  dates.sort();
  return dates.length ? dates[dates.length - 1] : null;
}

function getPlanDisplayName(plan) {
  const provider = plan.provider?.name || "Provider";
  const planName = plan.planName || "Plan";
  return `${provider} — ${planName}`;
}

function toQuery(state) {
  const params = new URLSearchParams();
  if (state.stateCode) params.set("state", state.stateCode);
  if (typeof state.maxMonthly === "number") params.set("maxMonthly", String(state.maxMonthly));
  if (!state.includeUnknownAvailability) params.set("inclUnknownAvail", "0");
  if (!state.includeUnknownPrice) params.set("inclUnknownPrice", "0");
  if (state.paymentModels.size) params.set("pay", [...state.paymentModels].join(","));
  if (state.attorneyChoices.size) params.set("att", [...state.attorneyChoices].join(","));
  if (state.familyCoverage.size) params.set("fam", [...state.familyCoverage].join(","));
  if (state.compareSelected.length) params.set("cmp", state.compareSelected.join(","));
  return params.toString();
}

function fromQuery() {
  const params = new URLSearchParams(location.search);
  const state = {
    stateCode: params.get("state") || "",
    maxMonthly: Number(params.get("maxMonthly") || "50"),
    includeUnknownAvailability: (params.get("inclUnknownAvail") || "1") !== "0",
    includeUnknownPrice: (params.get("inclUnknownPrice") || "1") !== "0",
    paymentModels: new Set((params.get("pay") || "").split(",").filter(Boolean)),
    attorneyChoices: new Set((params.get("att") || "").split(",").filter(Boolean)),
    familyCoverage: new Set((params.get("fam") || "").split(",").filter(Boolean)),
    compareSelected: (params.get("cmp") || "").split(",").filter(Boolean).slice(0, 4)
  };
  if (!Number.isFinite(state.maxMonthly)) state.maxMonthly = 50;
  return state;
}

const ui = {
  stateSelect: $("stateSelect"),
  includeUnknownAvailability: $("includeUnknownAvailability"),
  maxMonthly: $("maxMonthly"),
  maxMonthlyValue: $("maxMonthlyValue"),
  includeUnknownPrice: $("includeUnknownPrice"),
  paymentModelChips: $("paymentModelChips"),
  attorneyChoiceChips: $("attorneyChoiceChips"),
  familyCoverageChips: $("familyCoverageChips"),
  resetFiltersBtn: $("resetFiltersBtn"),
  resultsSummary: $("resultsSummary"),
  resultsList: $("resultsList"),
  compareBar: $("compareBar"),
  compareCount: $("compareCount"),
  openCompareBtn: $("openCompareBtn"),
  clearCompareBtn: $("clearCompareBtn"),
  compareSection: $("compareSection"),
  compareTableWrap: $("compareTableWrap"),
  closeCompareBtn: $("closeCompareBtn"),
  dataFreshnessPill: $("dataFreshnessPill"),
  copyShareLinkBtn: $("copyShareLinkBtn"),
  toggleAnalyticsBtn: $("toggleAnalyticsBtn"),
  analyticsSection: $("analyticsSection"),
  closeAnalyticsBtn: $("closeAnalyticsBtn"),
  eventCount: $("eventCount"),
  eventsPreview: $("eventsPreview"),
  downloadEventsBtn: $("downloadEventsBtn"),
  clearEventsBtn: $("clearEventsBtn")
};

let DATA = null;
let STATE = fromQuery();

function renderStateSelect() {
  ui.stateSelect.innerHTML = US_STATES.map(([code, name]) => `<option value="${escapeHtml(code)}">${escapeHtml(name)}</option>`).join("");
  ui.stateSelect.value = STATE.stateCode;
}

function renderEnumChips(container, taxonomy, setRef, analyticsName) {
  container.innerHTML = taxonomy
    .filter((x) => x.id !== "unknown")
    .map((x) => {
      const checked = setRef.has(x.id);
      const id = `${analyticsName}_${x.id}`;
      return `<label class="chip" for="${escapeHtml(id)}">
        <input id="${escapeHtml(id)}" type="checkbox" ${checked ? "checked" : ""} data-chip="${escapeHtml(analyticsName)}" data-value="${escapeHtml(x.id)}" />
        <span>${escapeHtml(x.label)}</span>
      </label>`;
    })
    .join("");
}

function applyUiStateToControls() {
  ui.stateSelect.value = STATE.stateCode;
  ui.includeUnknownAvailability.checked = STATE.includeUnknownAvailability;
  ui.maxMonthly.value = String(STATE.maxMonthly);
  ui.maxMonthlyValue.textContent = formatMoney(STATE.maxMonthly);
  ui.includeUnknownPrice.checked = STATE.includeUnknownPrice;
}

function filteredPlans() {
  const plans = (DATA?.plans || []).slice();
  plans.sort((a, b) => getPlanDisplayName(a).localeCompare(getPlanDisplayName(b)));
  return plans.filter((p) => {
    if (!availabilityMatches(p, STATE.stateCode, STATE.includeUnknownAvailability)) return false;
    if (!priceMatches(p, STATE.maxMonthly, STATE.includeUnknownPrice)) return false;
    if (!enumMatches(p, "payment_model", STATE.paymentModels)) return false;
    if (!enumMatches(p, "attorney_choice", STATE.attorneyChoices)) return false;
    if (!enumMatches(p, "family_coverage", STATE.familyCoverage)) return false;
    return true;
  });
}

function planFamilyLabel(plan) {
  const f = plan.fields?.family_coverage;
  if (!f || f.status !== "known") return "Unknown / not disclosed";
  return getTaxLabel(DATA.taxonomies, "enum:familyCoverage", f.value);
}

function planPaymentLabel(plan) {
  const f = plan.fields?.payment_model;
  if (!f || f.status !== "known") return "Unknown / not disclosed";
  return getTaxLabel(DATA.taxonomies, "enum:paymentModels", f.value);
}

function planAttorneyLabel(plan) {
  const f = plan.fields?.attorney_choice;
  if (!f || f.status !== "known") return "Unknown / not disclosed";
  return getTaxLabel(DATA.taxonomies, "enum:attorneyChoice", f.value);
}

function planPriceLabel(plan) {
  const f = plan.fields?.monthly_price_usd;
  if (!f || f.status !== "known") return "Unknown / not disclosed";
  return `${formatMoney(f.value)}/mo`;
}

function renderPlanCard(plan) {
  const name = getPlanDisplayName(plan);
  const badges = [];
  if (plan.isSponsored) badges.push(`<span class="badge badge--sponsored">Sponsored</span>`);
  if (plan.isSample) badges.push(`<span class="badge">Sample data</span>`);
  const unk = summarizeUnknowns(plan, DATA);
  if (unk.unknown + unk.notDisclosed > 0) badges.push(`<span class="badge badge--unknown">Unknowns: ${unk.unknown + unk.notDisclosed}</span>`);

  const selected = STATE.compareSelected.includes(plan.id);
  const compareDisabled = !selected && STATE.compareSelected.length >= 4;

  const actionsHtml = (plan.actions || [])
    .map((a) => {
      const displayLabel = a.isSponsored ? `${a.label} (sponsored)` : a.label;
      const aria = `${displayLabel}. ${a.whatHappens || ""}`.trim();
      return `<div class="actionBlock">
        <a class="btn" href="${escapeHtml(a.url)}" target="_blank" rel="noreferrer" data-outbound="1" data-plan="${escapeHtml(
          plan.id
        )}" data-action="${escapeHtml(a.id)}" data-sponsored="${a.isSponsored ? "1" : "0"}" aria-label="${escapeHtml(aria)}">${escapeHtml(
          displayLabel
        )}</a>
        <div class="actionNote">${escapeHtml(a.whatHappens || "You’ll leave this tool and visit the provider.")}</div>
      </div>`;
    })
    .join("");

  const bestFor = Array.isArray(plan.bestFor) ? plan.bestFor : [];
  const notIdealIf = Array.isArray(plan.notIdealIf) ? plan.notIdealIf : [];
  const av = plan.availability || { status: "unknown" };
  const avText =
    av.status === "known"
      ? STATE.stateCode
        ? availabilityMatches(plan, STATE.stateCode, true)
          ? "Available (per dataset)"
          : "Not available (per dataset)"
        : "Availability varies by state"
      : "Unknown / not disclosed";
  const planFresh = computePlanFreshness(plan);

  return `<article class="planCard" data-plan-card="${escapeHtml(plan.id)}">
    <div class="planCard__top">
      <div>
        <h3 class="planTitle">${escapeHtml(name)}</h3>
        <p class="subtle">Availability: ${escapeHtml(avText)}${planFresh ? ` · Last verified: ${escapeHtml(planFresh)}` : ""}</p>
      </div>
      <div class="badges">${badges.join("")}</div>
    </div>

    <div class="kv" role="list">
      <div class="kv__item" role="listitem">
        <div class="kv__label">Monthly</div>
        <div class="kv__value">${escapeHtml(planPriceLabel(plan))}</div>
      </div>
      <div class="kv__item" role="listitem">
        <div class="kv__label">Payment model</div>
        <div class="kv__value">${escapeHtml(planPaymentLabel(plan))}</div>
      </div>
      <div class="kv__item" role="listitem">
        <div class="kv__label">Attorney choice</div>
        <div class="kv__value">${escapeHtml(planAttorneyLabel(plan))}</div>
      </div>
      <div class="kv__item" role="listitem">
        <div class="kv__label">Family coverage</div>
        <div class="kv__value">${escapeHtml(planFamilyLabel(plan))}</div>
      </div>
    </div>

    <div class="planActions">
      <label class="checkbox">
        <input type="checkbox" data-compare="1" data-plan="${escapeHtml(plan.id)}" ${selected ? "checked" : ""} ${
          compareDisabled ? "disabled" : ""
        }/>
        Select to compare
      </label>
      ${actionsHtml}
    </div>

    <hr class="mutedHr" />

    <details class="details">
      <summary>Best for / Not ideal if</summary>
      <div class="details__body">
        <div class="row row--gap row--wrap">
          <div class="pill"><strong>Best for</strong></div>
          <div class="subtle">${escapeHtml(bestFor.join(" · ") || "—")}</div>
        </div>
        <div class="row row--gap row--wrap" style="margin-top:10px">
          <div class="pill"><strong>Not ideal if</strong></div>
          <div class="subtle">${escapeHtml(notIdealIf.join(" · ") || "—")}</div>
        </div>
      </div>
    </details>

    <details class="details">
      <summary>Exclusions / caveats (and unknowns)</summary>
      <div class="details__body">
        <p class="subtle">This is a quick scan of notable caveats and what’s missing from disclosures.</p>
        ${renderFieldInline(plan, "waiting_period")}
        ${renderFieldInline(plan, "common_exclusions")}
        <p class="subtle">Known fields: ${unk.known}/${unk.total} · Unknown: ${unk.unknown} · Not disclosed: ${unk.notDisclosed}</p>
      </div>
    </details>

    <details class="details">
      <summary>Key sources &amp; last verified</summary>
      <div class="details__body">
        <p class="subtle">Decision-relevant fields with sources where available. Unknowns are shown explicitly.</p>
        ${renderFieldInline(plan, "monthly_price_usd")}
        ${renderFieldInline(plan, "payment_model")}
        ${renderFieldInline(plan, "attorney_choice")}
        ${renderFieldInline(plan, "family_coverage")}
      </div>
    </details>
  </article>`;
}

function attrDefById(id) {
  for (const t of DATA.themes) {
    for (const a of t.attributes) {
      if (a.id === id) return a;
    }
  }
  return null;
}

function renderFieldInline(plan, fieldId) {
  const def = attrDefById(fieldId);
  const field = plan.fields?.[fieldId];
  const display = fieldToDisplayValue(field, def || { type: "text" }, DATA);
  return `<div style="margin-top:10px">
    <div><strong>${escapeHtml(def?.label || fieldId)}</strong>${renderStatusPill(display.status)}</div>
    <div>${display.html}</div>
    ${display.sourcesHtml}
  </div>`;
}

function renderResults() {
  const plans = filteredPlans();
  const total = DATA.plans.length;
  const applied =
    (STATE.stateCode ? 1 : 0) +
    (STATE.paymentModels.size ? 1 : 0) +
    (STATE.attorneyChoices.size ? 1 : 0) +
    (STATE.familyCoverage.size ? 1 : 0) +
    (STATE.maxMonthly !== 50 ? 1 : 0) +
    (STATE.includeUnknownAvailability !== true ? 1 : 0) +
    (STATE.includeUnknownPrice !== true ? 1 : 0);
  ui.resultsSummary.textContent = `${plans.length} of ${total} plans match. Filters applied: ${applied}.`;
  ui.resultsList.innerHTML = plans.map(renderPlanCard).join("") || `<p class="subtle">No plans match. Try clearing filters.</p>`;
  updateCompareBar();
}

function updateCompareBar() {
  const n = STATE.compareSelected.length;
  ui.compareCount.textContent = String(n);
  ui.compareBar.hidden = n === 0;
  ui.openCompareBtn.disabled = n < 2;
}

function clearCompareSelection() {
  if (STATE.compareSelected.length) track("compare_clear", { count: STATE.compareSelected.length });
  STATE.compareSelected = [];
  renderResults();
  renderCompare();
}

function toggleCompare(planId, checked) {
  const already = STATE.compareSelected.includes(planId);
  if (checked && !already) {
    if (STATE.compareSelected.length >= 4) return;
    STATE.compareSelected = [...STATE.compareSelected, planId].slice(0, 4);
    track("compare_select", { planId, count: STATE.compareSelected.length });
  }
  if (!checked && already) {
    STATE.compareSelected = STATE.compareSelected.filter((id) => id !== planId);
    track("compare_unselect", { planId, count: STATE.compareSelected.length });
  }
  renderResults();
  renderCompare();
}

function renderCompare() {
  const selected = STATE.compareSelected.map((id) => DATA.plans.find((p) => p.id === id)).filter(Boolean);
  if (selected.length < 2) {
    ui.compareSection.hidden = true;
    ui.compareTableWrap.innerHTML = "";
    return;
  }
  const header = `<table>
    <thead>
      <tr>
        <th class="attrName">Attribute</th>
        ${selected.map((p) => `<th>${escapeHtml(getPlanDisplayName(p))}</th>`).join("")}
      </tr>
    </thead>
    <tbody>`;

  const rows = [];
  for (const theme of DATA.themes) {
    rows.push(`<tr class="themeRow"><th colspan="${selected.length + 1}">${escapeHtml(theme.label)}</th></tr>`);
    for (const attr of theme.attributes) {
      const cells = selected
        .map((p) => {
          const f = p.fields?.[attr.id];
          const d = fieldToDisplayValue(f, attr, DATA);
          return `<td>
            ${d.html}
            ${renderStatusPill(d.status)}
            ${d.sourcesHtml}
          </td>`;
        })
        .join("");
      rows.push(`<tr><td><strong>${escapeHtml(attr.label)}</strong><div class="subtle">${escapeHtml(attr.description)}</div></td>${cells}</tr>`);
    }
  }

  const footer = `</tbody></table>`;
  ui.compareTableWrap.innerHTML = header + rows.join("") + footer;
}

function renderAnalyticsPreview() {
  const events = loadEvents();
  ui.eventCount.textContent = String(events.length);
  const preview = events.slice(-50);
  ui.eventsPreview.textContent = JSON.stringify(preview, null, 2);
}

function openCompare() {
  track("compare_open", { count: STATE.compareSelected.length });
  renderCompare();
  ui.compareSection.hidden = false;
  ui.compareSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeCompare() {
  track("compare_close", {});
  ui.compareSection.hidden = true;
}

function openAnalytics() {
  track("analytics_open", {});
  renderAnalyticsPreview();
  ui.analyticsSection.hidden = false;
  ui.analyticsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeAnalytics() {
  track("analytics_close", {});
  ui.analyticsSection.hidden = true;
}

function resetFilters() {
  track("filters_reset", {});
  STATE = {
    stateCode: "",
    maxMonthly: 50,
    includeUnknownAvailability: true,
    includeUnknownPrice: true,
    paymentModels: new Set(),
    attorneyChoices: new Set(),
    familyCoverage: new Set(),
    compareSelected: STATE.compareSelected
  };
  applyUiStateToControls();
  renderEnumChips(ui.paymentModelChips, DATA.taxonomies.paymentModels, STATE.paymentModels, "paymentModel");
  renderEnumChips(ui.attorneyChoiceChips, DATA.taxonomies.attorneyChoice, STATE.attorneyChoices, "attorneyChoice");
  renderEnumChips(ui.familyCoverageChips, DATA.taxonomies.familyCoverage, STATE.familyCoverage, "familyCoverage");
  renderResults();
}

function copyShareLink() {
  const q = toQuery(STATE);
  const url = `${location.origin}${location.pathname}${q ? `?${q}` : ""}`;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      ui.copyShareLinkBtn.textContent = "Copied!";
      setTimeout(() => (ui.copyShareLinkBtn.textContent = "Copy share link"), 1200);
      track("share_copy_link", { length: url.length });
    })
    .catch(() => {
      track("share_copy_link_failed", {});
      alert("Could not copy. Your browser may block clipboard access.");
    });
}

function wireEvents() {
  ui.stateSelect.addEventListener("change", () => {
    STATE.stateCode = ui.stateSelect.value;
    track("filter_change", { key: "state", value: STATE.stateCode });
    renderResults();
  });

  ui.includeUnknownAvailability.addEventListener("change", () => {
    STATE.includeUnknownAvailability = ui.includeUnknownAvailability.checked;
    track("filter_change", { key: "includeUnknownAvailability", value: STATE.includeUnknownAvailability });
    renderResults();
  });

  ui.maxMonthly.addEventListener("input", () => {
    STATE.maxMonthly = Number(ui.maxMonthly.value);
    ui.maxMonthlyValue.textContent = formatMoney(STATE.maxMonthly);
  });
  ui.maxMonthly.addEventListener("change", () => {
    track("filter_change", { key: "maxMonthly", value: STATE.maxMonthly });
    renderResults();
  });

  ui.includeUnknownPrice.addEventListener("change", () => {
    STATE.includeUnknownPrice = ui.includeUnknownPrice.checked;
    track("filter_change", { key: "includeUnknownPrice", value: STATE.includeUnknownPrice });
    renderResults();
  });

  document.addEventListener("change", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    if (t instanceof HTMLInputElement && t.matches("input[data-chip]")) {
      const group = t.dataset.chip;
      const value = t.dataset.value;
      const checked = t.checked;
      const map = {
        paymentModel: STATE.paymentModels,
        attorneyChoice: STATE.attorneyChoices,
        familyCoverage: STATE.familyCoverage
      }[group];
      if (map) {
        if (checked) map.add(value);
        else map.delete(value);
        track("filter_change", { key: group, value: [...map] });
        renderResults();
      }
      return;
    }

    if (t instanceof HTMLInputElement && t.matches("input[data-compare]")) {
      const planId = t.dataset.plan;
      toggleCompare(planId, t.checked);
      return;
    }
  });

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    const clearGroupBtn = t.closest("button[data-clear-group]");
    if (clearGroupBtn && clearGroupBtn instanceof HTMLButtonElement) {
      const g = clearGroupBtn.dataset.clearGroup;
      if (g === "paymentModel") STATE.paymentModels = new Set();
      if (g === "attorneyChoice") STATE.attorneyChoices = new Set();
      if (g === "familyCoverage") STATE.familyCoverage = new Set();
      track("filter_clear_group", { group: g });
      renderEnumChips(ui.paymentModelChips, DATA.taxonomies.paymentModels, STATE.paymentModels, "paymentModel");
      renderEnumChips(ui.attorneyChoiceChips, DATA.taxonomies.attorneyChoice, STATE.attorneyChoices, "attorneyChoice");
      renderEnumChips(ui.familyCoverageChips, DATA.taxonomies.familyCoverage, STATE.familyCoverage, "familyCoverage");
      renderResults();
      return;
    }

    const outbound = t.closest("a[data-outbound]");
    if (outbound && outbound instanceof HTMLAnchorElement) {
      track("outbound_click", {
        planId: outbound.dataset.plan,
        actionId: outbound.dataset.action,
        sponsored: outbound.dataset.sponsored === "1"
      });
      return;
    }
  });

  ui.resetFiltersBtn.addEventListener("click", resetFilters);
  ui.openCompareBtn.addEventListener("click", openCompare);
  ui.clearCompareBtn.addEventListener("click", clearCompareSelection);
  ui.closeCompareBtn.addEventListener("click", closeCompare);
  ui.copyShareLinkBtn.addEventListener("click", copyShareLink);

  ui.toggleAnalyticsBtn.addEventListener("click", () => {
    if (ui.analyticsSection.hidden) openAnalytics();
    else closeAnalytics();
  });
  ui.closeAnalyticsBtn.addEventListener("click", closeAnalytics);
  ui.downloadEventsBtn.addEventListener("click", () => downloadJson("events.json", loadEvents()));
  ui.clearEventsBtn.addEventListener("click", () => {
    track("analytics_clear_events", { count: loadEvents().length });
    localStorage.removeItem(EVENTS_KEY);
    renderAnalyticsPreview();
  });
}

async function main() {
  const res = await fetch(DATA_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load data: ${res.status}`);
  DATA = await res.json();

  ui.dataFreshnessPill.textContent = computeDatasetFreshness(DATA);

  renderStateSelect();
  applyUiStateToControls();

  renderEnumChips(ui.paymentModelChips, DATA.taxonomies.paymentModels, STATE.paymentModels, "paymentModel");
  renderEnumChips(ui.attorneyChoiceChips, DATA.taxonomies.attorneyChoice, STATE.attorneyChoices, "attorneyChoice");
  renderEnumChips(ui.familyCoverageChips, DATA.taxonomies.familyCoverage, STATE.familyCoverage, "familyCoverage");

  // Re-apply compare selections from URL, ignoring unknown ids.
  const validIds = new Set(DATA.plans.map((p) => p.id));
  STATE.compareSelected = STATE.compareSelected.filter((id) => validIds.has(id)).slice(0, 4);

  wireEvents();
  renderResults();
  renderCompare();
  renderAnalyticsPreview();

  track("page_view", { dataset: DATA?.meta?.datasetName || "unknown" });
}

main().catch((err) => {
  console.error(err);
  $("resultsSummary").textContent = "Failed to load data. See console.";
});

