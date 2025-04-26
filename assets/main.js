// Funktion för att hantera kalkylatorns logik
document.getElementById('calculator-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Förhindra vanlig form-submit

  var salary = parseFloat(document.getElementById('salary').value);
  var years = parseFloat(document.getElementById('years').value);
  var collective = document.getElementById('collective').value;

  if (isNaN(salary) || isNaN(years)) {
    alert('Fyll i alla fält korrekt.');
    return;
  }

  var baseMonths = Math.min(12, Math.floor(years / 2));
  var baseCompensation = baseMonths * salary;

  var negotiationFactor = 1;
  if (collective === 'yes') {
    negotiationFactor = 1.2;
  } else if (collective === 'unknown') {
    negotiationFactor = 1.1;
  }

  var totalCompensation = baseCompensation * negotiationFactor;

  // Visa resultat
  document.getElementById('results').style.display = 'block';
  document.getElementById('graphic-summary').innerHTML = `
    <p><strong>Beräknad ersättning:</strong> ${totalCompensation.toLocaleString('sv-SE')} SEK</p>
    <p><small>Observera att detta är en preliminär uppskattning och inte juridisk rådgivning.</small></p>
  `;

  // Skapa graf
  var ctx = document.getElementById('resultChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Grundbelopp', 'Förhandlingsutrymme'],
      datasets: [{
        label: 'Belopp (SEK)',
        data: [baseCompensation, totalCompensation - baseCompensation],
        backgroundColor: ['#4caf50', '#2196f3']
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
});

// Event Tracking direkt på knappen
document.querySelector('button[type="submit"]').addEventListener('click', function() {
  console.log("Visa resultat-knappen klickad! Skickar GA4-event...");
  if (typeof gtag === 'function') {
    gtag('event', 'klick_visa_resultat', {
      'event_category': 'Form',
      'event_label': 'Visa resultat-knapp'
    });
  } else {
    console.log("GA4 gtag är inte definierad");
  }
});

