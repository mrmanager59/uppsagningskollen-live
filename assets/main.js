// Uppdaterad main.js med månadspåslag för Uppsägningskollen

document.getElementById('calculator-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var salary = parseFloat(document.getElementById('salary').value);
  var years = parseFloat(document.getElementById('years').value);
  var collective = document.getElementById('collective').value;

  if (isNaN(salary) || isNaN(years)) {
    alert('Fyll i alla fält korrekt.');
    return;
  }

  var baseMonths = Math.min(12, Math.floor(years / 2));
  var baseCompensation = baseMonths * salary;

  var collectiveFactor = 1;
  if (collective === 'yes') {
    collectiveFactor = 1.1;
  } else if (collective === 'unknown') {
    collectiveFactor = 1.05;
  }

  var legalRight = baseCompensation * collectiveFactor;
  var lowerNegotiation = legalRight + (salary * 2); // +2 månader
  var higherNegotiation = legalRight + (salary * 5); // +5 månader

  document.getElementById('results').style.display = 'block';
  document.getElementById('graphic-summary').innerHTML = `
    <p><strong>Preliminär beräkning:</strong></p>
    <ul>
      <li><strong>Lagstadgad rätt:</strong> ${legalRight.toLocaleString('sv-SE')} SEK</li>
      <li><strong>Lägre förhandlingsmål:</strong> ${lowerNegotiation.toLocaleString('sv-SE')} SEK</li>
      <li><strong>Högre förhandlingsmål:</strong> ${higherNegotiation.toLocaleString('sv-SE')} SEK</li>
    </ul>
    <p><small>Observera att alla belopp är preliminära uppskattningar och inte utgör juridisk rådgivning.</small></p>
  `;

  var ctx = document.getElementById('resultChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lagstadgad rätt', 'Lägre förhandlingsmål', 'Högre förhandlingsmål'],
      datasets: [{
        label: 'Belopp (SEK)',
        data: [legalRight, lowerNegotiation, higherNegotiation],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});

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
