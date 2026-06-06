const MONDAY_API_URL = 'https://api.monday.com/v1/';
const PROXY_URL = 'https://musical-tanuki-a691a5.netlify.app/.netlify/functions/proxy';
const MONDAY_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjYxODY3ODk2NCwiYWFpIjoxMSwidWlkIjo2NzA4Mjk3NSwiaWFkIjoiMjAyNi0wMi0wOVQwOToxMzowOC45NzNaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTUxMzM5NDAsInJnbiI6ImV1YzEifQ.FsgVKBIv_xaWxaA4nzgJQVBnNWVTtLTeXY9IukoaMFI';

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
      profileColor: profile.color || 'var(--accent)'
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

  function _createAvatarFallback(profile) {
    const fb = document.createElement('div');
    fb.className = 'covenant-ps-avatar-fallback text-upper';
    fb.textContent = profile.initiales || (profile.firstName || '').slice(0, 1).toUpperCase();
    return fb;
  }

  function _createAvatarFromProfile(profile) {
    const wrap = document.createElement('div');
    wrap.className = 'covenant-ps-avatar-wrap';

    if (profile.avatar) {
      const img = document.createElement('img');
      img.className = 'covenant-ps-avatar';
      img.src = profile.avatar;
      img.alt = profile.firstName || '';
      img.addEventListener('error', function () {
        img.replaceWith(_createAvatarFallback(profile));
      });
      wrap.appendChild(img);
    } else {
      wrap.appendChild(_createAvatarFallback(profile));
    }

    return wrap;
  }

  function _createAvatarFromSession(session) {
    const wrap = document.createElement('div');
    wrap.className = 'covenant-ps-avatar-wrap';

    if (session.profileAvatar) {
      const img = document.createElement('img');
      img.className = 'covenant-ps-avatar';
      img.src = session.profileAvatar;
      img.alt = session.profileName || '';
      img.addEventListener('error', function () {
        img.replaceWith(_createAvatarFallback({
          initiales: session.profileInitiales,
          firstName: session.profileName
        }));
      });
      wrap.appendChild(img);
    } else {
      wrap.appendChild(_createAvatarFallback({
        initiales: session.profileInitiales,
        firstName: session.profileName
      }));
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

    const wrap = document.createElement('div');
    wrap.className = 'covenant-ps-selection flex-center gap-lg';

    const title = document.createElement('h1');
    title.textContent = 'QUI ES-TU ?';

    const list = document.createElement('div');
    list.className = 'covenant-ps-list gap-md';

    if (_profiles.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'text-tertiary';
      empty.textContent = 'AUCUN PROFIL DISPONIBLE';
      list.appendChild(empty);
    } else {
      _profiles.forEach(profile => {
        const card = document.createElement('div');
        card.className = 'covenant-ps-card flex gap-md';
        card.setAttribute('role', 'button');
        card.tabIndex = 0;

        card.appendChild(_createAvatarFromProfile(profile));

        const info = document.createElement('div');
        info.className = 'covenant-ps-info';

        const name = document.createElement('div');
        name.className = 'text-primary text-upper';
        name.textContent = profile.firstName || '';
        info.appendChild(name);

        if (profile.role) {
          const role = document.createElement('div');
          role.className = 'text-secondary';
          role.textContent = profile.role;
          info.appendChild(role);
        }

        card.appendChild(info);

        function selectProfile() {
          const session = writeSession(profile);
          _notifyReady(session);
        }

        card.addEventListener('click', selectProfile);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectProfile();
          }
        });

        list.appendChild(card);
      });
    }

    wrap.appendChild(title);
    wrap.appendChild(list);
    container.appendChild(wrap);
  }

  function renderConfirmation(session) {
    _clearContainer();
    const container = _getContainer();
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.className = 'covenant-ps-confirm flex-center gap-lg';

    wrap.appendChild(_createAvatarFromSession(session));

    const title = document.createElement('h1');
    title.textContent = 'TU ES BIEN ' + (session.profileName || '') + ' ?';
    wrap.appendChild(title);

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
    wrap.appendChild(actions);
    container.appendChild(wrap);
  }

  function _notifyReady(session) {
    window.covenantSession = session;

    const profileScreen = document.getElementById('screen-profile');
    const projectsScreen = document.getElementById('screen-projects');
    if (profileScreen) profileScreen.style.display = 'none';
    if (projectsScreen) projectsScreen.style.display = 'block';

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

document.addEventListener('DOMContentLoaded', () => {
  WebProfileSelector.init();
});
