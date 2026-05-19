<template>
  <q-layout view="lHh Lpr lFf">

    <q-header class="app-header">
      <div class="header-rope top-rope" />
      <q-toolbar class="app-toolbar">

        <div class="brand">
          <div class="jolly-roger">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="11" r="7" fill="#F5E6C8" stroke="#1a0a00" stroke-width="1.2"/>
              <ellipse cx="11" cy="10" rx="1.5" ry="2" fill="#1a0a00"/>
              <ellipse cx="17" cy="10" rx="1.5" ry="2" fill="#1a0a00"/>
              <path d="M11 14.5 Q14 16.5 17 14.5" stroke="#1a0a00" stroke-width="1.2" stroke-linecap="round" fill="none"/>
              <line x1="4" y1="20" x2="24" y2="24" stroke="#1a0a00" stroke-width="2" stroke-linecap="round"/>
              <line x1="4" y1="24" x2="24" y2="20" stroke="#1a0a00" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="brand-text">
            <q-toolbar-title class="brand-title">Log Pose</q-toolbar-title>
            <span class="brand-sub">Task Navigator</span>
          </div>
        </div>

        <nav class="nav-scroll">
          <div class="nav-flag">
            <q-btn flat label="⚓ Todo" to="/" class="nav-btn" :ripple="false" />
            <div class="flag-notch" />
          </div>
          <div class="nav-flag">
            <q-btn flat label="📜 History" to="/history" class="nav-btn" :ripple="false" />
            <div class="flag-notch" />
          </div>
        </nav>

        <div class="crew-badge">
          <span class="crew-label">Straw Hat Crew</span>
          <div class="wind-indicator">
            <span class="wind-bar" style="--d:0.0s"/>
            <span class="wind-bar" style="--d:0.15s"/>
            <span class="wind-bar" style="--d:0.3s"/>
            <span class="wind-bar" style="--d:0.45s"/>
          </div>
        </div>

      </q-toolbar>
      <div class="header-rope bottom-rope" />
    </q-header>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');

:root {
  --navy-deep:   #0B1826;
  --navy-mid:    #122236;
  --navy-soft:   #1C3550;
  --gold:        #D4A017;
  --gold-light:  #F0C040;
  --gold-pale:   #F5E6C8;
  --red-flag:    #8B1A1A;
  --red-bright:  #C0392B;
  --wood:        #3D1F0A;
  --wood-light:  #6B3A1F;
  --rope:        #8B6914;
  --cream:       #FDF6E3;
  --text-light:  #F5E6C8;
  --text-muted:  #9FB3C8;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--navy-deep) !important;
  font-family: 'Crimson Pro', Georgia, serif !important;
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(212,160,23,0.04) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(139,26,26,0.06) 0%, transparent 50%);
}

/* ── Ropes ── */
.header-rope {
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    var(--rope) 0px,
    #A0791E 3px,
    var(--rope) 6px,
    #7A5810 9px,
    var(--rope) 12px
  );
  opacity: 0.9;
}

/* ── Header ── */
.app-header {
  background: linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%) !important;
  border-bottom: 3px solid var(--gold) !important;
  box-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 2px 8px rgba(212,160,23,0.15) !important;
}

.app-toolbar {
  padding: 0 1.5rem;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

/* ── Brand ── */
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.jolly-roger {
  width: 44px;
  height: 44px;
  background: var(--red-flag);
  border: 2px solid var(--gold);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(212,160,23,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
  position: relative;
}

.jolly-roger::after {
  content: '';
  position: absolute;
  inset: 2px;
  border: 1px solid rgba(212,160,23,0.25);
  border-radius: 4px;
  pointer-events: none;
}

.brand-text { display: flex; flex-direction: column; line-height: 1; }

.brand-title {
  font-family: 'Cinzel', serif !important;
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: var(--gold-light) !important;
  letter-spacing: 0.08em !important;
  text-shadow: 0 0 20px rgba(212,160,23,0.4) !important;
  padding: 0 !important;
  flex: none !important;
  line-height: 1.2 !important;
}

.brand-sub {
  font-family: 'Crimson Pro', serif;
  font-style: italic;
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 2px;
}

/* ── Nav flags ── */
.nav-scroll {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-flag {
  position: relative;
  display: flex;
  align-items: center;
}

.flag-notch {
  position: absolute;
  right: -8px;
  width: 0;
  height: 0;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-left: 9px solid transparent;
  pointer-events: none;
  z-index: 2;
  transition: border-left-color 0.2s ease;
}

.nav-btn {
  font-family: 'Cinzel', serif !important;
  font-size: 0.72rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.06em !important;
  text-transform: none !important;
  color: var(--text-muted) !important;
  background: rgba(255,255,255,0.03) !important;
  border: 1px solid rgba(212,160,23,0.15) !important;
  border-radius: 4px !important;
  padding: 6px 18px 6px 14px !important;
  min-height: unset !important;
  transition: all 0.2s ease !important;
  position: relative;
  z-index: 1;
}

.nav-btn:hover {
  color: var(--gold-light) !important;
  background: rgba(212,160,23,0.08) !important;
  border-color: rgba(212,160,23,0.4) !important;
}

.nav-btn.router-link-active {
  background: var(--red-flag) !important;
  color: var(--gold-pale) !important;
  border-color: var(--gold) !important;
  box-shadow: 0 2px 12px rgba(139,26,26,0.5), inset 0 1px 0 rgba(255,255,255,0.08) !important;
  text-shadow: 0 0 10px rgba(240,192,64,0.5) !important;
}

.nav-flag:has(.router-link-active) .flag-notch {
  border-left-color: var(--red-flag);
}

/* ── Crew badge ── */
.crew-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex: 1;
  align-items: flex-end;
}

.crew-label {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--gold);
  text-transform: uppercase;
  opacity: 0.7;
}

.wind-indicator {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 14px;
}

.wind-bar {
  display: block;
  width: 3px;
  border-radius: 2px;
  background: var(--gold);
  animation: wind 1.4s ease-in-out infinite;
  animation-delay: var(--d);
  opacity: 0.6;
}

.wind-bar:nth-child(1) { height: 6px; }
.wind-bar:nth-child(2) { height: 10px; }
.wind-bar:nth-child(3) { height: 14px; }
.wind-bar:nth-child(4) { height: 8px; }

@keyframes wind {
  0%, 100% { transform: scaleY(1); opacity: 0.6; }
  50% { transform: scaleY(0.5); opacity: 1; }
}

/* ── Page ── */
.page-container {
  background: var(--navy-deep);
  min-height: calc(100vh - 68px - 12px);
  background-image:
    radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,160,23,0.03) 0%, transparent 70%);
}
</style>