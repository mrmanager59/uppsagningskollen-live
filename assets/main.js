
const form = document.getElementById('calculator-form');
const results = document.getElementById('results');
const graphicSummary = document.getElementById('graphic-summary');
const ctx = document.getElementById('resultChart').getContext('2d');
let chart; // Keep chart instance

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const salary = parseFloat(document.getElementById('salary').value);
  const years = parseInt(document.getElementById('years').value);
  const collective = document.getElementById('collective').value;

  let noticeMonths;

  if (collective === 'yes') {
    noticeMonths = Math.min(6, Math.ceil(years / 2) + 1);
  } else {
    if (years < 2) noticeMonths = 1;
    else if (years < 4) noticeMonths = 2;
    else if (years < 6) noticeMonths = 3;
    else if (years < 8) noticeMonths = 4;
    else if (years < 10) noticeMonths = 5;
    else noticeMonths = 6;
  }

  const legalCompensation = salary * noticeMonths;

  let minExtraMonths, maxExtraMonths;
  if (collective === 'yes') {
    minExtraMonths = 3;
    maxExtraMonths = 6;
  } else {
    minExtraMonths = 2;
    maxExtraMonths = 4;
  }

  const minNegotiationTarget = legalCompensation + (salary * minExtraMonths);
  const maxNegotiationTarget = legalCompensation + (salary * maxExtraMonths);

  graphicSummary.innerHTML = `
    <p><strong>Lagstadgad ersättning:</strong> ${legalCompensation.toLocaleString()} SEK</p>
    <p><strong>Rimligt förhandlingsmål:</strong> ${minNegotiationTarget.toLocaleString()} – ${maxNegotiationTarget.toLocaleString()} SEK</p>
  `;

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lagstadgad rätt', 'Lägre förhandlingsmål', 'Högre förhandlingsmål'],
      datasets: [{
        label: 'Belopp (SEK)',
        data: [legalCompensation, minNegotiationTarget, maxNegotiationTarget],
        backgroundColor: ['#0a9396', '#94d2bd', '#0077b6']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  results.style.display = 'block';
});
// Event Tracking för "Visa resultat"-knappen
document.getElementById('calculator-form').addEventListener('submit', function() {
  if (typeof gtag === 'function') {
    gtag('event', 'klick_visa_resultat', {
      'event_category': 'Form',
      'event_label': 'Visa resultat-knapp'
    });
  }
});
