/* NAID — quiz.js
   Mini-quiz devis : navigation étapes, sélections, calcul fourchette
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  const form = document.getElementById('quiz');
  if (!form) return;

  const steps = form.querySelectorAll('.quiz-step');
  const progress = form.querySelectorAll('.quiz-progress-bar');
  const answers = {}; // { type, mission, surface, style, delai, rate, pricemin, pricemax, sqm, stylerate }
  let current = 1;
  const total = steps.length;

  // ---------- helpers ----------
  function goTo(step) {
    steps.forEach((s) => s.classList.toggle('active', Number(s.dataset.step) === step));
    progress.forEach((p) => {
      const n = Number(p.dataset.step);
      p.classList.remove('done', 'current');
      if (n < step) p.classList.add('done');
      if (n === step) p.classList.add('current');
    });
    current = step;
    // scroll to top of quiz
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function validateStep(step) {
    if (step === 6) return true;
    const stepEl = form.querySelector(`.quiz-step[data-step="${step}"]`);
    const selected = stepEl.querySelector('.quiz-option.selected');
    if (!selected) {
      stepEl.querySelectorAll('.quiz-option').forEach((o) => {
        o.style.animation = 'shake 420ms';
        setTimeout(() => (o.style.animation = ''), 450);
      });
      return false;
    }
    return true;
  }

  // ---------- selection handling ----------
  form.querySelectorAll('.quiz-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      const key = opt.dataset.key;
      // deselect siblings
      opt.closest('.quiz-options').querySelectorAll('.quiz-option').forEach((o) => o.classList.remove('selected'));
      opt.classList.add('selected');
      // store answer
      answers[key] = opt.dataset.value;
      // store extras
      if (opt.dataset.rate) answers.rate = Number(opt.dataset.rate);
      if (opt.dataset.pricemin) {
        answers.pricemin = Number(opt.dataset.pricemin);
        answers.pricemax = Number(opt.dataset.pricemax);
      }
      if (opt.dataset.sqm) answers.sqm = Number(opt.dataset.sqm);
      if (opt.dataset.stylerate) answers.stylerate = Number(opt.dataset.stylerate);
    });
  });

  // ---------- navigation ----------
  form.querySelectorAll('[data-action="next"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!validateStep(current)) return;
      goTo(current + 1);
    });
  });
  form.querySelectorAll('.quiz-back').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current > 1) goTo(current - 1);
    });
  });

  // ---------- calcul ----------
  const calcBtn = form.querySelector('[data-action="calculate"]');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      if (!validateStep(current)) return;

      // Compute ranges
      const rate = answers.rate || 1;          // multiplicateur type projet
      const sqm = answers.sqm || 50;            // surface médiane
      const stylerate = answers.stylerate || 1; // multiplicateur style
      const priceMin = answers.pricemin || 150;
      const priceMax = answers.pricemax || 400;

      const min = Math.round((priceMin * sqm * rate * stylerate) / 100) * 100;
      const max = Math.round((priceMax * sqm * rate * stylerate) / 100) * 100;

      // Display estimation
      const output = document.getElementById('estimation-output');
      const fmt = (n) => n.toLocaleString('fr-FR') + ' €';
      output.innerHTML = `${fmt(min)} <span class="sep">—</span> ${fmt(max)}`;

      // Summary
      const labels = {
        type: { appartement: 'Appartement', maison: 'Maison / Villa', hotellerie: 'Hôtellerie', bureaux: 'Bureaux', commerce: 'Commerce', autre: 'Autre' },
        mission: { conseil: 'Conseil & DA', decoration: 'Décoration & ameublement', renovation: 'Rénovation complète', pro: 'Projet professionnel' },
        surface: { '<50': '< 50 m²', '50-100': '50 – 100 m²', '100-200': '100 – 200 m²', '200-400': '200 – 400 m²', '>400': '> 400 m²' },
        style: { contemporain: 'Contemporain', artdeco: 'Art déco', atelier: 'Atelier', moderne: 'Moderne tropical', mix: 'Mix personnalisé', undecided: 'À définir' },
        delai: { immediat: 'Dès que possible', '3mois': 'Dans 3 mois', '6mois': 'Dans 6 mois', reflechis: 'En réflexion' }
      };
      const summary = document.getElementById('quiz-summary');
      summary.innerHTML = `
        <div><span class="label-mini">Projet</span><strong>${labels.type[answers.type] || '—'}</strong></div>
        <div><span class="label-mini">Mission</span><strong>${labels.mission[answers.mission] || '—'}</strong></div>
        <div><span class="label-mini">Surface</span><strong>${labels.surface[answers.surface] || '—'}</strong></div>
        <div><span class="label-mini">Style</span><strong>${labels.style[answers.style] || '—'}</strong></div>
        <div><span class="label-mini">Délai</span><strong>${labels.delai[answers.delai] || '—'}</strong></div>
        <div><span class="label-mini">Fourchette</span><strong>${fmt(min)} – ${fmt(max)}</strong></div>
      `;

      // Hidden summary for Formspree
      const hidden = document.getElementById('hidden-summary');
      if (hidden) {
        hidden.value = `Projet: ${labels.type[answers.type]} | Mission: ${labels.mission[answers.mission]} | Surface: ${labels.surface[answers.surface]} | Style: ${labels.style[answers.style]} | Délai: ${labels.delai[answers.delai]} | Estimation: ${fmt(min)} – ${fmt(max)}`;
      }

      goTo(6);
    });
  }

  // ---------- submission ----------
  const contactForm = document.getElementById('quiz-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const action = contactForm.action;
      // If no Formspree ID set, just simulate success (for local preview)
      if (action.includes('YOUR_FORM_ID')) {
        console.info('[NAID] Formspree non configuré — formulaire simulé.');
        showThanks();
        return;
      }
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) showThanks();
        else alert('Une erreur est survenue. Merci de réessayer ou de nous contacter directement par email.');
      } catch (err) {
        alert('Connexion impossible. Merci de nous contacter par email : naid.deco.contact@gmail.com');
      }
    });
  }

  function showThanks() {
    contactForm.style.display = 'none';
    document.querySelector('.quiz-result').style.display = 'none';
    document.getElementById('quiz-thanks').style.display = 'block';
  }

  // Shake keyframe inject
  const style = document.createElement('style');
  style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }`;
  document.head.appendChild(style);
})();
