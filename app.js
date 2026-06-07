const Wizard = (() => {
  const LEGAL_TEXT_PLACEHOLDER = '[ TEXTE JURIDIQUE — À INTÉGRER ]';

  const LEGAL_MAJEUR = [
    'Dans le contexte de ce tournage nous soumettons à votre signature la présente autorisation pour l\'enregistrement, la reproduction et la représentation de votre image et de votre voix, dans les conditions définies ci-après.',
    'Je, soussigné(e), déclare autoriser expressément la société L\'Etudiant (Société par actions simplifiée à associé unique au capital de 9 430 299,84€, dont le siège social est situé à 52 rue Jacques Hillairet 75012 Paris, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 814 839 783) :',
    '— à procéder lors du tournage précité à une captation audiovisuelle de mon intervention/ma participation (ci-après la « Captation ») et à incorporer et exploiter tout ou partie de la Captation dans la Vidéo ;',
    '— le droit de fixer, d\'enregistrer, de numériser, de reproduire, de représenter ou de diffuser la Vidéo intégrant tout ou partie de la Captation, uniquement pour diffusion sur l\'ensemble des réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram), comprenant entre autres mes attributs de personnalité à savoir le prénom, l\'image et/ou la voix ;',
    '— le droit d\'extraire toute image tirée de la Vidéo intégrant tout ou partie de la Captation et de représenter, de diffuser tout ou partie de la Vidéo pour diffusion sur les réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram), comprenant notamment mes attributs de personnalité, à savoir prénom, image et/ou voix ;',
    '— à reproduire, adapter et représenter tout ou partie de la Captation et de la Vidéo, par tous procédés techniques, par tous moyens, et sur tous supports numériques ou électroniques, en tous formats, permettant la consultation et le téléchargement de la Vidéo, en ligne et hors ligne, sur tous réseaux Internet, en vue de sa diffusion au public sur les réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram).',
    'Toute autre utilisation et exploitation, notamment toute autre exploitation commerciale de la Captation, en tout ou partie, devra être soumise à autorisation préalable et écrite.',
    'La Captation et la Vidéo demeureront la propriété exclusive de l\'Etudiant qui s\'interdit de céder la présente autorisation à un tiers.',
    'L\'Etudiant s\'interdit expressément de procéder à une exploitation susceptible de porter atteinte à la vie privée, à la réputation, à l\'honneur, et notamment sur tout support à caractère pornographique, raciste, xénophobe ou toute autre exploitation qui pourrait être préjudiciable.',
    'La présente autorisation est consentie à titre gracieux pour une durée de 10 (dix) ans et pour le monde entier.',
    'Par la signature de la présente autorisation je reconnais avoir pris connaissance des informations ci-dessus.'
  ];

  const LEGAL_MINEUR = [
    'Dans le contexte de ce tournage nous soumettons à votre signature la présente autorisation pour l\'enregistrement, la reproduction et la représentation de l\'image et de la voix de votre enfant, dans les conditions définies ci-après.',
    'Je, soussigné(e), agissant en qualité de représentant légal de l\'enfant mineur, déclare autoriser expressément la société L\'Etudiant (Société par actions simplifiée à associé unique au capital de 9 430 299,84€, dont le siège social est situé à 52 rue Jacques Hillairet 75012 Paris, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 814 839 783) :',
    '— à procéder lors du tournage précité à une captation audiovisuelle de l\'intervention/la participation de mon enfant mineur (ci-après la « Captation ») et à incorporer et exploiter tout ou partie de la Captation dans la Vidéo ;',
    '— le droit de fixer, d\'enregistrer, de numériser, de reproduire, de représenter ou de diffuser la Vidéo intégrant tout ou partie de la Captation, uniquement pour diffusion sur l\'ensemble des réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram), comprenant entre autres les attributs de personnalité de mon enfant à savoir le prénom, l\'image et/ou la voix ;',
    '— le droit d\'extraire toute image tirée de la Vidéo intégrant tout ou partie de la Captation et de représenter, de diffuser tout ou partie de la Vidéo pour diffusion sur les réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram), comprenant notamment les attributs de personnalité de mon enfant, à savoir prénom, image et/ou voix ;',
    '— à reproduire, adapter et représenter tout ou partie de la Captation et de la Vidéo, par tous procédés techniques, par tous moyens, et sur tous supports numériques ou électroniques, en tous formats, permettant la consultation et le téléchargement de la Vidéo, en ligne et hors ligne, sur tous réseaux Internet, en vue de sa diffusion au public sur les réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram).',
    'Toute autre utilisation et exploitation, notamment toute autre exploitation commerciale de la Captation et des droits de la personnalité de mon enfant, en tout ou partie, devra être soumise à autorisation préalable et écrite du représentant légal.',
    'La Captation et la Vidéo demeureront la propriété exclusive de l\'Etudiant qui s\'interdit de céder la présente autorisation à un tiers.',
    'L\'Etudiant s\'interdit expressément de procéder à une exploitation susceptible de porter atteinte à la vie privée, à la réputation, à l\'honneur de mon enfant mineur, et notamment sur tout support à caractère pornographique, raciste, xénophobe ou toute autre exploitation qui pourrait lui être préjudiciable.',
    'La présente autorisation est consentie à titre gracieux pour une durée de 10 (dix) ans et pour le monde entier.',
    'Par la signature de la présente autorisation je reconnais avoir pris connaissance des informations ci-dessus.'
  ];

  const FORMAT_OPTIONS = [
    'Micro Trottoir',
    'Interview',
    'Reportage',
    'Interro',
    'School Story',
    'C\'est Quoi ?',
    'Audrey T\'explique'
  ];

  let _signaturePad = null;

  const wizardState = {
    statut: null,
    prenom: '',
    nom: '',
    contact: '',
    contactType: 'email',
    repPrenom: '',
    repNom: '',
    repQualite: '',
    repContact: '',
    repContactType: 'email',
    sujet: '',
    format: '',
    date: '',
    lieuTournage: '',
    journalistePrenom: '',
    journalisteNom: ''
  };

  function formatSystemDate() {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return day + '/' + month + '/' + year;
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.remove('active');
      s.style.display = '';
    });
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('active');
    }
  }

  function makeBackBtn(targetScreenId) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.type = 'button';
    btn.textContent = 'RETOUR';
    btn.addEventListener('click', () => showScreen(targetScreenId));
    return btn;
  }

  function clearScreen(id) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  }

  function fullName(prenom, nom) {
    return (prenom + ' ' + nom).trim();
  }

  function resetWizardState(keepStatut) {
    const statut = keepStatut ? wizardState.statut : null;
    wizardState.statut = statut;
    wizardState.prenom = '';
    wizardState.nom = '';
    wizardState.contact = '';
    wizardState.contactType = 'email';
    wizardState.repPrenom = '';
    wizardState.repNom = '';
    wizardState.repQualite = '';
    wizardState.repContact = '';
    wizardState.repContactType = 'email';
    wizardState.sujet = '';
    wizardState.format = '';
    wizardState.lieuTournage = '';
    wizardState.date = formatSystemDate();
    wizardState.journalisteNom = '';
    wizardState.journalistePrenom = (window.covenantSession && window.covenantSession.profileName) || '';
  }

  function createFieldGroup(labelText, inputEl) {
    const group = document.createElement('div');
    group.className = 'field-group';
    const label = document.createElement('label');
    label.className = 'field-label';
    label.textContent = labelText;
    group.appendChild(label);
    group.appendChild(inputEl);
    return group;
  }

  function buildContactSection(typeKey, contactKey) {
    const section = document.createElement('div');
    section.className = 'covenant-contact-section gap-md';

    const toggleWrap = document.createElement('div');
    toggleWrap.className = 'flex gap-sm';

    const emailBtn = document.createElement('button');
    emailBtn.type = 'button';
    emailBtn.textContent = 'EMAIL';

    const telBtn = document.createElement('button');
    telBtn.type = 'button';
    telBtn.textContent = 'TÉL';

    const inputWrap = document.createElement('div');
    let inputEl = null;

    function setType(type) {
      wizardState[typeKey] = type;
      emailBtn.className = type === 'email' ? 'btn btn-primary' : 'btn btn-secondary';
      telBtn.className = type === 'tel' ? 'btn btn-primary' : 'btn btn-secondary';

      const input = document.createElement('input');
      input.className = 'text-input';
      input.type = type === 'email' ? 'email' : 'tel';
      input.value = wizardState[contactKey] || '';
      input.addEventListener('input', () => {
        wizardState[contactKey] = input.value.trim();
      });

      inputWrap.innerHTML = '';
      inputWrap.appendChild(input);
      inputEl = input;
    }

    emailBtn.addEventListener('click', () => setType('email'));
    telBtn.addEventListener('click', () => setType('tel'));
    setType(wizardState[typeKey] || 'email');

    toggleWrap.appendChild(emailBtn);
    toggleWrap.appendChild(telBtn);
    section.appendChild(toggleWrap);
    section.appendChild(inputWrap);

    return section;
  }

  function renderScreenStatut() {
    clearScreen('screen-statut');
    const screen = document.getElementById('screen-statut');
    if (!screen) return;

    const wrap = document.createElement('div');
    wrap.className = 'covenant-wizard-screen flex-center gap-lg';

    const title = document.createElement('h2');
    title.textContent = 'STATUT DE L\'INTERVIEWÉ';

    const actions = document.createElement('div');
    actions.className = 'covenant-statut-actions flex gap-md';

    const majeurBtn = document.createElement('button');
    majeurBtn.type = 'button';
    majeurBtn.className = 'btn btn-primary btn-lg';
    majeurBtn.textContent = 'MAJEUR';
    majeurBtn.addEventListener('click', () => {
      wizardState.statut = 'majeur';
      renderScreenInterviewe();
      showScreen('screen-interviewe');
    });

    const mineurBtn = document.createElement('button');
    mineurBtn.type = 'button';
    mineurBtn.className = 'btn btn-primary btn-lg';
    mineurBtn.textContent = 'MINEUR';
    mineurBtn.addEventListener('click', () => {
      wizardState.statut = 'mineur';
      renderScreenInterviewe();
      showScreen('screen-interviewe');
    });

    actions.appendChild(majeurBtn);
    actions.appendChild(mineurBtn);
    wrap.appendChild(title);
    wrap.appendChild(actions);
    screen.appendChild(wrap);
  }

  function renderScreenInterviewe() {
    clearScreen('screen-interviewe');
    const screen = document.getElementById('screen-interviewe');
    if (!screen) return;

    const wrap = document.createElement('div');
    wrap.className = 'covenant-wizard-screen gap-lg';

    const header = document.createElement('div');
    header.className = 'flex-between gap-md';
    header.appendChild(makeBackBtn('screen-statut'));

    const title = document.createElement('h2');
    title.textContent = 'IDENTITÉ DE L\'INTERVIEWÉ';
    header.appendChild(title);
    wrap.appendChild(header);

    const prenomInput = document.createElement('input');
    prenomInput.className = 'text-input';
    prenomInput.type = 'text';
    prenomInput.value = wizardState.prenom;
    prenomInput.addEventListener('input', () => { wizardState.prenom = prenomInput.value.trim(); });
    wrap.appendChild(createFieldGroup('PRÉNOM', prenomInput));

    const nomInput = document.createElement('input');
    nomInput.className = 'text-input';
    nomInput.type = 'text';
    nomInput.value = wizardState.nom;
    nomInput.addEventListener('input', () => { wizardState.nom = nomInput.value.trim(); });
    wrap.appendChild(createFieldGroup('NOM', nomInput));

    wrap.appendChild(buildContactSection('contactType', 'contact'));

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = 'SUIVANT';
    nextBtn.addEventListener('click', () => {
      if (!wizardState.prenom || !wizardState.nom || !wizardState.contact) return;
      if (wizardState.statut === 'mineur') {
        renderScreenRepLegal();
        showScreen('screen-replegal');
        return;
      }
      renderScreenProjet();
      showScreen('screen-projet');
    });
    wrap.appendChild(nextBtn);
    screen.appendChild(wrap);
  }

  function renderScreenRepLegal() {
    clearScreen('screen-replegal');
    const screen = document.getElementById('screen-replegal');
    if (!screen) return;

    const wrap = document.createElement('div');
    wrap.className = 'covenant-wizard-screen gap-lg';

    const header = document.createElement('div');
    header.className = 'flex-between gap-md';
    header.appendChild(makeBackBtn('screen-interviewe'));

    const title = document.createElement('h2');
    title.textContent = 'REPRÉSENTANT LÉGAL';
    header.appendChild(title);
    wrap.appendChild(header);

    const qualiteInput = document.createElement('input');
    qualiteInput.className = 'text-input';
    qualiteInput.type = 'text';
    qualiteInput.value = wizardState.repQualite;
    qualiteInput.addEventListener('input', () => { wizardState.repQualite = qualiteInput.value.trim(); });
    wrap.appendChild(createFieldGroup('QUALITÉ', qualiteInput));

    const repPrenomInput = document.createElement('input');
    repPrenomInput.className = 'text-input';
    repPrenomInput.type = 'text';
    repPrenomInput.value = wizardState.repPrenom;
    repPrenomInput.addEventListener('input', () => { wizardState.repPrenom = repPrenomInput.value.trim(); });
    wrap.appendChild(createFieldGroup('PRÉNOM', repPrenomInput));

    const repNomInput = document.createElement('input');
    repNomInput.className = 'text-input';
    repNomInput.type = 'text';
    repNomInput.value = wizardState.repNom;
    repNomInput.addEventListener('input', () => { wizardState.repNom = repNomInput.value.trim(); });
    wrap.appendChild(createFieldGroup('NOM', repNomInput));

    wrap.appendChild(buildContactSection('repContactType', 'repContact'));

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = 'SUIVANT';
    nextBtn.addEventListener('click', () => {
      if (!wizardState.repQualite || !wizardState.repPrenom || !wizardState.repNom || !wizardState.repContact) return;
      renderScreenProjet();
      showScreen('screen-projet');
    });
    wrap.appendChild(nextBtn);
    screen.appendChild(wrap);
  }

  function renderScreenProjet() {
    clearScreen('screen-projet');
    const screen = document.getElementById('screen-projet');
    if (!screen) return;

    if (!wizardState.date) {
      wizardState.date = formatSystemDate();
    }

    const wrap = document.createElement('div');
    wrap.className = 'covenant-wizard-screen gap-lg';

    const backTarget = wizardState.statut === 'mineur' ? 'screen-replegal' : 'screen-interviewe';

    const header = document.createElement('div');
    header.className = 'flex-between gap-md';
    header.appendChild(makeBackBtn(backTarget));

    const title = document.createElement('h2');
    title.textContent = 'LE PROJET';
    header.appendChild(title);
    wrap.appendChild(header);

    const lieuInput = document.createElement('input');
    lieuInput.className = 'text-input';
    lieuInput.type = 'text';
    lieuInput.value = wizardState.lieuTournage || '';
    lieuInput.addEventListener('input', () => { wizardState.lieuTournage = lieuInput.value.trim(); });
    wrap.appendChild(createFieldGroup('LIEU DE TOURNAGE', lieuInput));

    const formatSelect = document.createElement('select');
    formatSelect.className = 'text-input';
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '';
    formatSelect.appendChild(emptyOption);
    FORMAT_OPTIONS.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      if (wizardState.format === option) opt.selected = true;
      formatSelect.appendChild(opt);
    });
    formatSelect.addEventListener('change', () => { wizardState.format = formatSelect.value; });
    wrap.appendChild(createFieldGroup('FORMAT', formatSelect));

    const dateInput = document.createElement('input');
    dateInput.className = 'text-input';
    dateInput.type = 'text';
    dateInput.value = wizardState.date;
    dateInput.readOnly = true;
    wrap.appendChild(createFieldGroup('DATE', dateInput));

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = 'SUIVANT';
    nextBtn.addEventListener('click', () => {
      wizardState.format = formatSelect.value;
      if (!wizardState.format || !wizardState.lieuTournage) return;
      renderScreenSign();
      showScreen('screen-sign');
    });
    wrap.appendChild(nextBtn);
    screen.appendChild(wrap);
  }

  function initSignaturePad() {
    const canvas = document.getElementById('covenant-canvas');
    if (!canvas || typeof SignaturePad === 'undefined') return;

    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    _signaturePad = new SignaturePad(canvas, { penColor: '#ffffff' });
  }

  function renderScreenSign() {
    clearScreen('screen-sign');
    _signaturePad = null;
    const screen = document.getElementById('screen-sign');
    if (!screen) return;

    const wrap = document.createElement('div');
    wrap.className = 'covenant-wizard-screen gap-lg';

    const header = document.createElement('div');
    header.className = 'flex-between gap-md';
    header.appendChild(makeBackBtn('screen-projet'));

    const title = document.createElement('h2');
    title.textContent = 'SIGNATURE';
    header.appendChild(title);
    wrap.appendChild(header);

    const summary = document.createElement('div');
    summary.className = 'covenant-sign-summary gap-sm';
    const statutLabel = wizardState.statut === 'mineur' ? 'MINEUR' : 'MAJEUR';
    [
      'STATUT : ' + statutLabel,
      'NOM COMPLET : ' + fullName(wizardState.prenom, wizardState.nom),
      'FORMAT : ' + wizardState.format,
      'SUJET : ' + wizardState.sujet,
      'DATE : ' + wizardState.date
    ].forEach(line => {
      const p = document.createElement('p');
      p.className = 'text-primary';
      p.textContent = line;
      summary.appendChild(p);
    });
    wrap.appendChild(summary);

    const legalToggleBtn = document.createElement('button');
    legalToggleBtn.type = 'button';
    legalToggleBtn.className = 'btn btn-ghost';
    legalToggleBtn.textContent = 'LIRE LE TEXTE INTÉGRAL';

    const legalBlock = document.createElement('div');
    legalBlock.className = 'covenant-legal-text';
    legalBlock.hidden = true;
    const paragraphs = wizardState.statut === 'mineur' ? LEGAL_MINEUR : LEGAL_MAJEUR;
    paragraphs.forEach(p => {
      const para = document.createElement('p');
      para.className = 'text-secondary';
      para.style.marginBottom = '0.75rem';
      para.textContent = p;
      legalBlock.appendChild(para);
    });

    legalToggleBtn.addEventListener('click', () => {
      legalBlock.hidden = !legalBlock.hidden;
    });

    wrap.appendChild(legalToggleBtn);
    wrap.appendChild(legalBlock);

    const canvas = document.createElement('canvas');
    canvas.id = 'covenant-canvas';
    canvas.width = 600;
    canvas.height = 200;
    wrap.appendChild(canvas);

    const signActions = document.createElement('div');
    signActions.className = 'flex gap-md';

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'btn btn-secondary';
    clearBtn.textContent = 'EFFACER';
    clearBtn.addEventListener('click', () => {
      if (_signaturePad) _signaturePad.clear();
    });

    const validateBtn = document.createElement('button');
    validateBtn.type = 'button';
    validateBtn.className = 'btn btn-primary';
    validateBtn.textContent = 'VALIDER LA SIGNATURE';
    validateBtn.addEventListener('click', async () => {
      if (!_signaturePad || _signaturePad.isEmpty()) return;
      validateBtn.disabled = true;
      validateBtn.textContent = 'GÉNÉRATION...';
      await generateAndDownloadPDF();
      validateBtn.disabled = false;
      validateBtn.textContent = 'VALIDER LA SIGNATURE';
      renderScreenConfirm();
      showScreen('screen-confirm');
    });

    signActions.appendChild(clearBtn);
    signActions.appendChild(validateBtn);
    wrap.appendChild(signActions);
    screen.appendChild(wrap);

    requestAnimationFrame(() => initSignaturePad());
  }

  function renderScreenConfirm() {
    clearScreen('screen-confirm');
    const screen = document.getElementById('screen-confirm');
    if (!screen) return;

    const wrap = document.createElement('div');
    wrap.className = 'covenant-confirm-screen';

    // Coche animée SVG
    const svgWrap = document.createElement('div');
    svgWrap.className = 'covenant-checkmark-wrap';
    svgWrap.innerHTML = '<svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">' +
      '<circle class="covenant-checkmark-circle" cx="26" cy="26" r="25"/>' +
      '<path class="covenant-checkmark-tick" d="M14 27 l8 8 l16-16"/>' +
      '</svg>';
    wrap.appendChild(svgWrap);

    // Titre
    const title = document.createElement('h2');
    title.className = 'covenant-confirm-title';
    title.textContent = 'AUTORISATION ENREGISTRÉE';
    wrap.appendChild(title);

    // Statut email
    const emailStatus = document.createElement('p');
    emailStatus.className = window._covenantEmailResult === 'success' ? 'covenant-email-success' : 'covenant-email-error';
    emailStatus.textContent = window._covenantEmailResult === 'success'
      ? 'EMAIL ENVOYÉ'
      : 'ENVOI EMAIL ÉCHOUÉ — PDF TÉLÉCHARGÉ LOCALEMENT';
    emailStatus.style.opacity = '0';
    emailStatus.style.animation = 'covenant-fade-in 0.4s ease 1.0s forwards';
    wrap.appendChild(emailStatus);

    // Checklist dynamique
    const statutLabel = wizardState.statut === 'mineur' ? 'MINEUR' : 'MAJEUR';
    const journaliste = (window.covenantSession && window.covenantSession.profileName)
      || fullName(wizardState.journalistePrenom, wizardState.journalisteNom);

    const checklistItems = [
      { label: 'STATUT', value: statutLabel },
      { label: 'INTERVIEWÉ', value: fullName(wizardState.prenom, wizardState.nom) },
      { label: 'FORMAT', value: wizardState.format },
      { label: 'DATE', value: wizardState.date },
      { label: 'RESPONSABLE', value: journaliste },
      { label: 'PDF', value: 'GÉNÉRÉ' },
      { label: 'EMAIL', value: window._covenantEmailResult === 'success' ? 'ENVOYÉ' : 'ÉCHEC' }
    ];

    const checklist = document.createElement('div');
    checklist.className = 'covenant-checklist';

    checklistItems.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'covenant-checklist-item';
      row.style.animationDelay = (1.1 + i * 0.15) + 's';
      row.innerHTML =
        '<span class="covenant-checklist-check">✓</span>' +
        '<span class="covenant-checklist-label">' + item.label + '</span>' +
        '<span class="covenant-checklist-value">' + item.value + '</span>';
      checklist.appendChild(row);

      setTimeout(() => {
        row.classList.add('visible');
      }, (1100 + i * 150));
    });

    wrap.appendChild(checklist);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'covenant-confirm-actions';

    const downloadBtn = document.createElement('button');
    downloadBtn.type = 'button';
    downloadBtn.className = 'btn btn-primary';
    downloadBtn.textContent = 'TÉLÉCHARGER LE PDF';
    downloadBtn.addEventListener('click', () => {
      if (!window._covenantPdfBlob || !window._covenantPdfFilename) return;
      const url = URL.createObjectURL(window._covenantPdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = window._covenantPdfFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    actions.appendChild(downloadBtn);

    const newSignBtn = document.createElement('button');
    newSignBtn.type = 'button';
    newSignBtn.className = 'btn btn-primary';
    newSignBtn.textContent = 'NOUVELLE SIGNATURE';
    newSignBtn.addEventListener('click', () => {
      resetWizardState(true);
      renderScreenStatut();
      showScreen('screen-statut');
    });

    const finishBtn = document.createElement('button');
    finishBtn.type = 'button';
    finishBtn.className = 'btn btn-secondary';
    finishBtn.textContent = 'TERMINER';
    finishBtn.addEventListener('click', () => {
      resetWizardState(false);
      renderScreenStatut();
      showScreen('screen-statut');
    });

    actions.appendChild(newSignBtn);
    actions.appendChild(finishBtn);
    wrap.appendChild(actions);
    screen.appendChild(wrap);
  }

  async function generateAndDownloadPDF() {
    const { PDFDocument, StandardFonts, rgb } = window.PDFLib;

    function sanitizeFilenamePart(str) {
      return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '');
    }

    const fileDate = new Date();
    const yy = String(fileDate.getFullYear()).slice(-2);
    const mm = String(fileDate.getMonth() + 1).padStart(2, '0');
    const dd = String(fileDate.getDate()).padStart(2, '0');
    const formatPart = (wizardState.format || '').replace(/\s+/g, '-');
    const nomPrenom = sanitizeFilenamePart(wizardState.nom + wizardState.prenom);
    const journalistePart = sanitizeFilenamePart(
      window.covenantSession ? window.covenantSession.profileName : ''
    );
    const filename = yy + mm + dd + '_AUTORISATION_' + formatPart + '_' + nomPrenom + '_' + journalistePart + '.pdf';

    const pdfDoc = await PDFDocument.create();
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const colorBlack = rgb(0, 0, 0);
    const colorSecondary = rgb(0.4, 0.4, 0.4);
    const colorLegal = rgb(0.15, 0.15, 0.15);

    let page = pdfDoc.addPage([595, 842]);

    function drawText(targetPage, text, x, y, size, font, color) {
      targetPage.drawText(text, { x, y, size, font, color });
    }

    function drawWrappedText(text, x, y, maxWidth, size, font, color) {
      const words = text.split(/\s+/).filter(Boolean);
      let line = '';
      let currentY = y;
      const lineHeight = size + 4;

      function flushLine() {
        if (!line) return;
        if (currentY < 60) {
          page = pdfDoc.addPage([595, 842]);
          currentY = 780;
        }
        drawText(page, line, x, currentY, size, font, color);
        currentY -= lineHeight;
        line = '';
      }

      words.forEach(word => {
        const testLine = line ? line + ' ' + word : word;
        const width = font.widthOfTextAtSize(testLine, size);
        if (width > maxWidth && line) {
          flushLine();
          line = word;
        } else {
          line = testLine;
        }
      });
      flushLine();
      return currentY;
    }

    let logoEmbedded = null;
    try {
      const logoRes = await fetch('assets/logo_etudiant.png');
      if (logoRes.ok) {
        const logoBuffer = await logoRes.arrayBuffer();
        logoEmbedded = await pdfDoc.embedPng(logoBuffer);
      }
    } catch (e) {
      logoEmbedded = null;
    }

    let cursorY = 780;

    if (logoEmbedded) {
      const logoDims = logoEmbedded.scale(1);
      const pageWidth = 595;
      const logoWidth = 120;
      const logoX = (pageWidth - logoWidth) / 2;
      const logoHeight = (logoWidth / logoDims.width) * logoDims.height;
      page.drawImage(logoEmbedded, { x: logoX, y: 760, width: logoWidth, height: logoHeight });
      cursorY = 740;
    }

    const titleText = 'AUTORISATION DE DROIT A L\'IMAGE ET A LA VOIX';
    const titleWidth = fontBold.widthOfTextAtSize(titleText, 10);
    const titleX = (595 - titleWidth) / 2;
    drawText(page, titleText, titleX, cursorY, 10, fontBold, colorBlack);
    page.drawLine({
      start: { x: 50, y: cursorY - 16 },
      end: { x: 545, y: cursorY - 16 },
      thickness: 0.5,
      color: rgb(0.7, 0.7, 0.7)
    });
    cursorY -= 40;

    const titreVideo = 'Vidéo « ' + wizardState.format + ' »';

    const majeurParagraphs = [
      'Dans le contexte de ce tournage nous soumettons à votre signature la présente autorisation pour l\'enregistrement, la reproduction et la représentation de votre image et de votre voix, dans les conditions définies ci-après.',
      'Je, soussigné(e) ' + wizardState.prenom + ' ' + wizardState.nom + ', déclare autoriser expressément la société L\'Etudiant (Société par actions simplifiée à associé unique au capital de 9 430 299,84€, dont le siège social est situé à 52 rue Jacques Hillairet 75012 Paris, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 814 839 783) :',
      '— à procéder lors du tournage précité à une captation audiovisuelle de mon intervention/ma participation (ci-après la « Captation ») et à incorporer et exploiter tout ou partie de la Captation dans la Vidéo ;',
      '— le droit de fixer, d\'enregistrer, de numériser, de reproduire, de représenter ou de diffuser la Vidéo intégrant tout ou partie de la Captation, uniquement pour diffusion sur l\'ensemble des réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram), comprenant entre autres mes attributs de personnalité à savoir le prénom, l\'image et/ou la voix ;',
      '— le droit d\'extraire toute image tirée de la Vidéo intégrant tout ou partie de la Captation et de représenter, de diffuser tout ou partie de la Vidéo pour diffusion sur les réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram), comprenant notamment mes attributs de personnalité, à savoir prénom, image et/ou voix ;',
      '— à reproduire, adapter et représenter tout ou partie de la Captation et de la Vidéo, par tous procédés techniques, par tous moyens, et sur tous supports numériques ou électroniques, en tous formats, permettant la consultation et le téléchargement de la Vidéo, en ligne et hors ligne, sur tous réseaux Internet, en vue de sa diffusion au public sur les réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram).',
      'Toute autre utilisation et exploitation, notamment toute autre exploitation commerciale de la Captation, en tout ou partie, devra être soumise à autorisation préalable et écrite.',
      'La Captation et la Vidéo demeureront la propriété exclusive de l\'Etudiant qui s\'interdit de céder la présente autorisation à un tiers.',
      'L\'Etudiant s\'interdit expressément de procéder à une exploitation susceptible de porter atteinte à la vie privée, à la réputation, à l\'honneur, et notamment sur tout support à caractère pornographique, raciste, xénophobe ou toute autre exploitation qui pourrait être préjudiciable.',
      'La présente autorisation est consentie à titre gracieux pour une durée de 10 (dix) ans et pour le monde entier.',
      'Par la signature de la présente autorisation je reconnais avoir pris connaissance des informations ci-dessus.'
    ];

    const mineurParagraphs = [
      'Dans le contexte de ce tournage nous soumettons à votre signature la présente autorisation pour l\'enregistrement, la reproduction et la représentation de l\'image et de la voix de votre enfant, dans les conditions définies ci-après.',
      'Je, soussigné(e) ' + wizardState.repPrenom + ' ' + wizardState.repNom + ', agissant en qualité de ' + wizardState.repQualite + ' de l\'enfant mineur ' + wizardState.prenom + ' ' + wizardState.nom + ', déclare autoriser expressément la société L\'Etudiant (Société par actions simplifiée à associé unique au capital de 9 430 299,84€, dont le siège social est situé à 52 rue Jacques Hillairet 75012 Paris, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 814 839 783) :',
      '— à procéder lors du tournage précité à une captation audiovisuelle de l\'intervention/la participation de mon enfant mineur (ci-après la « Captation ») et à incorporer et exploiter tout ou partie de la Captation dans la Vidéo ;',
      '— le droit de fixer, d\'enregistrer, de numériser, de reproduire, de représenter ou de diffuser la Vidéo intégrant tout ou partie de la Captation, uniquement pour diffusion sur l\'ensemble des réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram), comprenant entre autres les attributs de personnalité de mon enfant à savoir le prénom, l\'image et/ou la voix ;',
      '— le droit d\'extraire toute image tirée de la Vidéo intégrant tout ou partie de la Captation et de représenter, de diffuser tout ou partie de la Vidéo pour diffusion sur les réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram), comprenant notamment les attributs de personnalité de mon enfant, à savoir prénom, image et/ou voix ;',
      '— à reproduire, adapter et représenter tout ou partie de la Captation et de la Vidéo, par tous procédés techniques, par tous moyens, et sur tous supports numériques ou électroniques, en tous formats, permettant la consultation et le téléchargement de la Vidéo, en ligne et hors ligne, sur tous réseaux Internet, en vue de sa diffusion au public sur les réseaux sociaux de L\'ETUDIANT (TikTok, Youtube et Instagram).',
      'Toute autre utilisation et exploitation, notamment toute autre exploitation commerciale de la Captation et des droits de la personnalité de mon enfant, en tout ou partie, devra être soumise à autorisation préalable et écrite du représentant légal.',
      'La Captation et la Vidéo demeureront la propriété exclusive de l\'Etudiant qui s\'interdit de céder la présente autorisation à un tiers.',
      'L\'Etudiant s\'interdit expressément de procéder à une exploitation susceptible de porter atteinte à la vie privée, à la réputation, à l\'honneur de mon enfant mineur, et notamment sur tout support à caractère pornographique, raciste, xénophobe ou toute autre exploitation qui pourrait lui être préjudiciable.',
      'La présente autorisation est consentie à titre gracieux pour une durée de 10 (dix) ans et pour le monde entier.',
      'Par la signature de la présente autorisation je reconnais avoir pris connaissance des informations ci-dessus.'
    ];

    const paragraphs = (wizardState.statut === 'mineur' ? mineurParagraphs : majeurParagraphs)
      .map(p => p.replace(/Vidéo/g, titreVideo));
    paragraphs.forEach(paragraph => {
      cursorY = drawWrappedText(paragraph, 50, cursorY, 495, 8, fontRegular, colorLegal);
      cursorY -= 8;
    });

    cursorY -= 20;
    page.drawLine({
      start: { x: 50, y: cursorY },
      end: { x: 545, y: cursorY },
      thickness: 0.5,
      color: rgb(0.7, 0.7, 0.7)
    });
    cursorY -= 20;
    drawText(page, 'Lu et approuvé', 50, cursorY, 8, fontRegular, colorSecondary);
    cursorY -= 10;

    if (_signaturePad && !_signaturePad.isEmpty()) {
      const signatureDataUrl = _signaturePad.toDataURL('image/png');
      const signatureBase64 = signatureDataUrl.split(',')[1];
      const signatureBytes = Uint8Array.from(atob(signatureBase64), c => c.charCodeAt(0));
      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      const sigDims = signatureImage.scale(1);
      const sigWidth = Math.min(200, sigDims.width);
      const sigHeight = (sigWidth / sigDims.width) * sigDims.height;
      if (cursorY - sigHeight < 60) {
        page = pdfDoc.addPage([595, 842]);
        cursorY = 780;
      }
      page.drawImage(signatureImage, { x: 50, y: cursorY - sigHeight, width: sigWidth, height: sigHeight });
      cursorY -= sigHeight + 14;
    }

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const horodatage = 'Signé le ' + wizardState.date + ' à ' + hh + 'h' + min;
    drawText(page, horodatage, 50, cursorY, 8, fontRegular, rgb(0.4, 0.4, 0.4));
    cursorY -= 16;
    drawText(page, 'FAIT À : ' + (wizardState.lieuTournage || '').toUpperCase(), 50, cursorY, 8, fontBold, rgb(0.15, 0.15, 0.15));

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    // Stockage du blob pour téléchargement manuel depuis l'écran de confirmation
    window._covenantPdfBlob = blob;
    window._covenantPdfFilename = filename;

    // Envoi email via proxy Netlify
    try {
      const pdfBase64 = btoa(String.fromCharCode(...pdfBytes));
      const journaliste = (window.covenantSession && window.covenantSession.profileName)
        || Wizard.wizardState.journalistePrenom || '';
      const responsableEmail = (window.covenantSession && window.covenantSession.profileEmailPrefix)
        ? window.covenantSession.profileEmailPrefix + '@letudiant.fr'
        : null;
      const payload = {
        pdfBase64,
        filename,
        interviewe: (Wizard.wizardState.prenom + ' ' + Wizard.wizardState.nom).trim(),
        format: Wizard.wizardState.format,
        date: Wizard.wizardState.date,
        journaliste,
        responsableEmail: responsableEmail,
        statut: Wizard.wizardState.statut
      };
      const response = await fetch('https://musical-tanuki-a691a5.netlify.app/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      window._covenantEmailResult = response.ok ? 'success' : 'error';
    } catch (e) {
      window._covenantEmailResult = 'error';
    }
  }

  wizardState.date = formatSystemDate();

  return {
    wizardState,
    showScreen,
    makeBackBtn,
    renderScreenStatut,
    renderScreenInterviewe,
    renderScreenRepLegal,
    renderScreenProjet,
    renderScreenSign,
    renderScreenConfirm,
    generateAndDownloadPDF
  };
})();

const wizardState = Wizard.wizardState;
const showScreen = Wizard.showScreen;
const makeBackBtn = Wizard.makeBackBtn;
const renderScreenStatut = Wizard.renderScreenStatut;
const renderScreenInterviewe = Wizard.renderScreenInterviewe;
const renderScreenRepLegal = Wizard.renderScreenRepLegal;
const renderScreenProjet = Wizard.renderScreenProjet;
const renderScreenSign = Wizard.renderScreenSign;
const renderScreenConfirm = Wizard.renderScreenConfirm;
const WebProfileSelector = (() => {
  const PROFILES_URL = 'https://realcoolclint.github.io/tranquility-core/profiles-public.json';
  const LS_KEY = 'ts_session_covenant';
  const APP_KEY = 'covenant';

  let _profiles = [];

  function readSession() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function writeSession(profile) {
    const session = {
      version: 2,
      writtenBy: 'covenant',
      writtenAt: new Date().toISOString(),
      profileId: profile.id,
      profileName: profile.firstName,
      profileRole: profile.role,
      profileAvatar: profile.avatar || null,
      profileInitiales: profile.initiales,
      profileColor: profile.color || 'var(--accent)',
      profileEmailPrefix: profile.emailPrefix || null
    };
    localStorage.setItem(LS_KEY, JSON.stringify(session));
    return session;
  }

  function clearSession() {
    localStorage.removeItem(LS_KEY);
  }

  function _getContainer() {
    return document.getElementById('profile-selector-container');
  }

  function _clearContainer() {
    const container = _getContainer();
    if (container) container.innerHTML = '';
  }

  async function syncProfiles() {
    try {
      const res = await fetch(PROFILES_URL, { cache: 'no-cache' });
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      const src = Array.isArray(data) ? data : (data.profiles || []);
      if (!Array.isArray(src)) throw new Error('invalid data');
      _profiles = src.filter(p => p.appPermissions && p.appPermissions[APP_KEY] === true);
      return true;
    } catch (e) {
      return false;
    }
  }

  function _createAvatarFromSession(session) {
    const wrap = document.createElement('div');
    wrap.className = 'ps-avatar-wrap';
    const initiales = session.profileInitiales || (session.profileName || '').slice(0, 1).toUpperCase();
    const color = session.profileColor && session.profileColor.indexOf('var(') !== 0
      ? session.profileColor
      : '#2563eb';

    if (session.profileAvatar) {
      wrap.innerHTML =
        '<img class="ps-avatar" src="' + session.profileAvatar + '" alt="' + (session.profileName || '') + '"' +
        ' onerror="this.style.display=\'none\';this.nextElementSibling.classList.remove(\'ps-hidden\')" />' +
        '<div class="ps-avatar-fallback ps-hidden" style="background-color:' + color + '">' + initiales + '</div>';
    } else {
      wrap.innerHTML =
        '<div class="ps-avatar-fallback" style="background-color:' + color + '">' + initiales + '</div>';
    }

    return wrap;
  }

  function renderError() {
    _clearContainer();
    const container = _getContainer();
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'covenant-ps-error flex-center gap-md';

    const msg = document.createElement('p');
    msg.className = 'text-secondary';
    msg.textContent = 'CONNEXION IMPOSSIBLE — RÉESSAYER';

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.type = 'button';
    btn.textContent = 'RÉESSAYER';
    btn.addEventListener('click', () => {
      init();
    });

    wrap.appendChild(msg);
    wrap.appendChild(btn);
    container.appendChild(wrap);
  }

  function renderSelection() {
    _clearContainer();
    const container = _getContainer();
    if (!container) return;

    const card = document.createElement('div');
    card.className = 'ps-card';

    const header = document.createElement('div');
    header.className = 'ps-header';

    const patch = document.createElement('img');
    patch.className = 'ps-app-patch';
    patch.src = 'assets/patch_COVENANT.png';
    patch.alt = 'COVENANT';

    const appName = document.createElement('div');
    appName.className = 'ps-app-name';
    appName.textContent = 'COVENANT';

    const title = document.createElement('div');
    title.className = 'ps-title';
    title.textContent = 'QUI ES-TU ?';

    header.appendChild(patch);
    header.appendChild(appName);
    header.appendChild(title);

    const grid = document.createElement('div');
    grid.id = 'ps-profiles-grid';
    grid.className = 'ps-profiles-grid';

    const empty = document.createElement('div');
    empty.id = 'ps-empty-state';
    empty.className = 'ps-empty-state';
    empty.hidden = true;
    empty.innerHTML = '<p>Aucun profil disponible.<br>Vérifiez votre connexion Internet.</p>';

    if (_profiles.length === 0) {
      empty.hidden = false;
    } else {
      _profiles.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.className = 'ps-profile-card';
        const initiales = profile.initiales || (profile.firstName || '').slice(0, 1).toUpperCase();
        const color = profile.color || '#2563eb';
        const isAdmin = profile.role === 'admin';
        profileCard.innerHTML =
          '<div class="ps-check">&#10003;</div>' +
          '<div class="ps-avatar-wrap">' +
            '<img class="ps-avatar" src="' + (profile.avatar || '') + '" alt="' + (profile.firstName || '') + '"' +
            ' onerror="this.style.display=\'none\';this.nextElementSibling.classList.remove(\'ps-hidden\')" />' +
            '<div class="ps-avatar-fallback ps-hidden" style="background-color:' + color + '">' + initiales + '</div>' +
          '</div>' +
          '<div class="ps-profile-name">' + (profile.firstName || '') + '</div>' +
          (isAdmin ? '<span class="ps-badge-admin">ADMIN</span>' : '');
        profileCard.addEventListener('click', () => {
          const session = writeSession(profile);
          _notifyReady(session);
        });
        grid.appendChild(profileCard);
      });
    }

    card.appendChild(header);
    card.appendChild(grid);
    card.appendChild(empty);
    container.appendChild(card);
  }

  function renderConfirmation(session) {
    _clearContainer();
    const container = _getContainer();
    if (!container) return;

    const card = document.createElement('div');
    card.className = 'ps-card';

    const header = document.createElement('div');
    header.className = 'ps-header';

    const patch = document.createElement('img');
    patch.className = 'ps-app-patch';
    patch.src = 'assets/patch_COVENANT.png';
    patch.alt = 'COVENANT';

    const appName = document.createElement('div');
    appName.className = 'ps-app-name';
    appName.textContent = 'COVENANT';

    const title = document.createElement('div');
    title.className = 'ps-title';
    title.textContent = 'TU ES BIEN ' + (session.profileName || '') + ' ?';

    header.appendChild(patch);
    header.appendChild(appName);
    header.appendChild(title);

    const profileCard = document.createElement('div');
    profileCard.className = 'ps-profile-card selected is-static';
    profileCard.innerHTML = '<div class="ps-check">&#10003;</div>';
    profileCard.appendChild(_createAvatarFromSession(session));
    const name = document.createElement('div');
    name.className = 'ps-profile-name';
    name.textContent = session.profileName || '';
    profileCard.appendChild(name);
    if (session.profileRole === 'admin') {
      const badge = document.createElement('span');
      badge.className = 'ps-badge-admin';
      badge.textContent = 'ADMIN';
      profileCard.appendChild(badge);
    }

    const actions = document.createElement('div');
    actions.className = 'covenant-ps-actions flex gap-md';

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-primary';
    confirmBtn.type = 'button';
    confirmBtn.textContent = 'OUI, C\'EST MOI';
    confirmBtn.addEventListener('click', () => {
      _notifyReady(session);
    });

    const changeBtn = document.createElement('button');
    changeBtn.className = 'btn btn-secondary';
    changeBtn.type = 'button';
    changeBtn.textContent = 'CHANGER DE PROFIL';
    changeBtn.addEventListener('click', async () => {
      clearSession();
      const ok = await syncProfiles();
      if (!ok) {
        renderError();
        return;
      }
      renderSelection();
    });

    actions.appendChild(confirmBtn);
    actions.appendChild(changeBtn);
    card.appendChild(header);
    card.appendChild(profileCard);
    card.appendChild(actions);
    container.appendChild(card);
  }

  function _notifyReady(session) {
    window.covenantSession = session;
    wizardState.journalistePrenom = session.profileName || '';
    const profileScreen = document.getElementById('screen-profile');
    if (profileScreen) {
      profileScreen.classList.remove('active');
      profileScreen.classList.add('hidden');
    }
    showScreen('screen-statut');
    renderScreenStatut();

    if (typeof WebProfileSelector.onSessionReady === 'function') {
      WebProfileSelector.onSessionReady(session);
    }
  }

  async function init() {
    const session = readSession();
    if (session) {
      renderConfirmation(session);
      return;
    }

    const ok = await syncProfiles();
    if (!ok) {
      renderError();
      return;
    }
    renderSelection();
  }

  return { init, onSessionReady: null };
})();

window.onMercuryComplete = function() {
  document.getElementById('screen-profile').classList.add('active');
  WebProfileSelector.init();
};
