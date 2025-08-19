'use strict';

// ---- Defaults identical to your HTML ----
function defaults() {
  return {
    annualRequests:300000000, monthlyGrowth:10, numAPIs:25, numConsumers:1000,
    ticketsPerMonth:200, pctApiTickets:70, pctEscalated:30,
    hrsSupportPerTicket:0.5, hrsEngPerEscalation:1.0,
    rateSupport:45, rateEng:85,
    weeklyPatternHours:20, rateAnalytics:70, azureHours:40,
    customers:2000, arpa:1500, retentionRisk:1.0,
    complianceFTE:0, fteCost:120000, altTooling:0, devPortalSavings:0,
    confidence:80, deployment:"SaaS", override:"",
    commsHoursPerTicket:0.25, currency:"USD",
    bmSupport:68.7, bmEng:86.9, bmComms:94.2, bmAzure:90.0,
    pSaaSBase:35988, pSaaS25:10800, pPrivBase:71976, pPrivPerAPI:360
  };
}

function mergeInputs(input) {
  const d = defaults();
  return { ...d, ...(input || {}) };
}

// ---- Pure compute: mirrors your HTML calc() math ----
function compute(raw) {
  const v = mergeInputs(raw);

  const apiTicketsMo     = v.ticketsPerMonth * (v.pctApiTickets/100);
  const escalationsMo    = apiTicketsMo * (v.pctEscalated/100);
  const annualSupportHrs = apiTicketsMo * v.hrsSupportPerTicket * 12;
  const annualEngHrs     = escalationsMo * v.hrsEngPerEscalation * 12;

  const supportHrsSaved  = annualSupportHrs * (v.bmSupport/100);
  const engHrsSaved      = annualEngHrs * (v.bmEng/100);
  const supportSavings   = supportHrsSaved * v.rateSupport;
  const engSavings       = engHrsSaved * v.rateEng;

  const commsHoursSaved  = apiTicketsMo * v.commsHoursPerTicket * 12 * (v.bmComms/100);
  const commsSavings     = commsHoursSaved * v.rateSupport;

  const azureHoursSaved  = v.azureHours * 12 * (v.bmAzure/100);
  const azureSavings     = azureHoursSaved * v.rateEng;

  const patternHoursSaved = v.weeklyPatternHours * 52;
  const patternSavings    = patternHoursSaved * v.rateAnalytics;

  const retentionSavings  = (v.retentionRisk/100) * v.customers * v.arpa;
  const complianceAvoid   = v.complianceFTE * v.fteCost;
  const altToolingAvoid   = v.altTooling;
  const devPortalSave     = v.devPortalSavings;

  const subtotal = supportSavings + engSavings + commsSavings + azureSavings + patternSavings
                 + retentionSavings + complianceAvoid + altToolingAvoid + devPortalSave;

  const benefit = subtotal * (v.confidence/100);

  // Cost (override-first), identical logic to your HTML
  let estCost = 0;
  let costNote = "";
  const overrideNum = (v.override === "" ? "" : Number(v.override));
  if (overrideNum !== "" && overrideNum > 0) {
    estCost = overrideNum; costNote = "Override";
  } else if (v.deployment === "SaaS") {
    const base = v.pSaaSBase;
    const extraAPIs = Math.max(0, v.numAPIs - 25);
    const packs25 = extraAPIs === 0 ? 0 : Math.ceil(extraAPIs/25);
    estCost = base + packs25 * v.pSaaS25; costNote = `SaaS: base + ${packs25}×25-pack`;
  } else {
    const base = v.pPrivBase;
    const overAPIs = Math.max(0, v.numAPIs - 25);
    estCost = base + overAPIs * v.pPrivPerAPI; costNote = `Private: base + ${overAPIs} over-APIs`;
  }

  const net = benefit - estCost;
  const roi = estCost > 0 ? (net / estCost) : NaN;
  const paybackMonths = benefit > 0 ? (12 * estCost / benefit) : NaN;

  const totalHoursSaved = supportHrsSaved + engHrsSaved + commsHoursSaved + azureHoursSaved + patternHoursSaved;

  return {
    inputs: v,
    metrics: {
      benefit,
      estCost,
      net,
      roi,
      paybackMonths,
      totalHoursSaved,
      costNote,
      confidence: v.confidence
    },
    breakdown: {
      supportSavings, engSavings, commsSavings, azureSavings, patternSavings,
      retentionSavings, complianceAvoid, altToolingAvoid, devPortalSave
    }
  };
}

module.exports = { defaults, compute };
