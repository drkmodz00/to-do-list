<template>
  <q-page class="op-login-page">

    <div class="login-container">

      <!-- Left: Crew Panel -->
      <div class="crew-panel">
        <div class="crew-overlay" />

        <div class="crew-content">
          <div class="crew-emblem">
            <svg width="52" height="52" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="11" r="7" fill="#F5E6C8" stroke="#1a0a00" stroke-width="1.2"/>
              <ellipse cx="11" cy="10" rx="1.5" ry="2" fill="#1a0a00"/>
              <ellipse cx="17" cy="10" rx="1.5" ry="2" fill="#1a0a00"/>
              <path d="M11 14.5 Q14 16.5 17 14.5" stroke="#1a0a00" stroke-width="1.2" stroke-linecap="round" fill="none"/>
              <line x1="4" y1="20" x2="24" y2="24" stroke="#1a0a00" stroke-width="2" stroke-linecap="round"/>
              <line x1="4" y1="24" x2="24" y2="20" stroke="#1a0a00" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>

          <div class="crew-quote">"I'm going to be King of the Pirates!"</div>
          <div class="crew-author">— Monkey D. Luffy</div>

          <div class="crew-members">
            <div class="member" v-for="m in crew" :key="m.name" :title="m.name">
              <span class="member-icon">{{ m.icon }}</span>
              <span class="member-name">{{ m.name }}</span>
            </div>
          </div>
        </div>

        <div class="panel-rope" />
      </div>

      <!-- Right: Login Form -->
      <div class="form-panel">

        <div class="form-inner">

          <div class="form-header">
            <div class="form-jolly">⚓</div>
            <div class="form-title">Set Sail</div>
            <div class="form-sub">Log in to your crew's log pose</div>
          </div>

          <div class="form-divider" />

          <div class="field-wrap">
            <label class="field-label">✉ Email</label>
            <input
              v-model="email"
              class="op-input"
              type="email"
              placeholder="captain@strawhat.com"
            />
          </div>

          <div class="field-wrap">
            <label class="field-label">🔒 Password</label>
            <input
              v-model="password"
              class="op-input"
              type="password"
              placeholder="Enter your secret..."
            />
          </div>

          <button class="login-btn" @click="login">
            <span>⛵ Set Sail</span>
          </button>

          <div class="form-footer">
            <span class="footer-text">New to the crew?</span>
            <router-link to="/register" class="footer-link">Join the crew →</router-link>
          </div>

        </div>

      </div>

    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const auth = useAuthStore()
const router = useRouter()

const crew = [
  { name: 'Luffy',  icon: '🎩' },
  { name: 'Zoro',   icon: '⚔️' },
  { name: 'Nami',   icon: '🗺️' },
  { name: 'Usopp',  icon: '🎯' },
  { name: 'Sanji',  icon: '🔥' },
  { name: 'Chopper',icon: '🦌' },
  { name: 'Robin',  icon: '📖' },
  { name: 'Franky', icon: '🤖' },
  { name: 'Brook',  icon: '🎸' },
]

const login = async () => {
  try {
    await auth.login(email.value, password.value)
    await router.push('/')
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');

:root {
  --navy-deep:  #0B1826;
  --navy-mid:   #122236;
  --navy-soft:  #1C3550;
  --gold:       #D4A017;
  --gold-light: #F0C040;
  --gold-pale:  #F5E6C8;
  --red-flag:   #8B1A1A;
  --text-light: #F0EAD6;
  --text-muted: #A8C8D8;
  --rope:       #8B6914;
}

.op-login-page {
  background: var(--navy-deep) !important;
  min-height: 100vh;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-family: 'Crimson Pro', Georgia, serif;
  padding: 1.5rem;
  background-image:
    radial-gradient(ellipse 60% 50% at 20% 50%, rgba(139,26,26,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 80% 50%, rgba(212,160,23,0.05) 0%, transparent 60%);
}

/* ── Two-panel container ── */
.login-container {
  display: flex;
  width: 100%;
  max-width: 860px;
  min-height: 520px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(212,160,23,0.25);
  box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,160,23,0.06);
}

/* ── LEFT: Crew panel ── */
.crew-panel {
  flex: 1;
  position: relative;
  background:
    linear-gradient(160deg, #1a0a00 0%, #3D1F0A 40%, #0B1826 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ocean wave pattern overlay */
.crew-overlay {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(212,160,23,0.03) 28px,
      rgba(212,160,23,0.03) 29px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 28px,
      rgba(212,160,23,0.02) 28px,
      rgba(212,160,23,0.02) 29px
    );
  pointer-events: none;
}

.crew-content {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;
  text-align: center;
}

.crew-emblem {
  width: 80px;
  height: 80px;
  background: var(--red-flag);
  border: 2px solid var(--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 30px rgba(139,26,26,0.5), 0 0 60px rgba(212,160,23,0.15);
  animation: emblemGlow 3s ease-in-out infinite;
}

@keyframes emblemGlow {
  0%, 100% { box-shadow: 0 0 30px rgba(139,26,26,0.5), 0 0 60px rgba(212,160,23,0.15); }
  50%       { box-shadow: 0 0 40px rgba(139,26,26,0.7), 0 0 80px rgba(212,160,23,0.25); }
}

.crew-quote {
  font-family: 'Crimson Pro', serif;
  font-style: italic;
  font-size: 1.05rem;
  color: var(--gold-pale);
  line-height: 1.6;
  margin-bottom: 0.5rem;
  max-width: 220px;
}

.crew-author {
  font-family: 'Cinzel', serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--gold);
  margin-bottom: 2rem;
  opacity: 0.8;
}

.crew-members {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  max-width: 240px;
}

.member {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 6px;
  border-radius: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(212,160,23,0.1);
  transition: background 0.2s ease, border-color 0.2s ease;
  animation: memberIn 0.4s ease both;
}

.member:nth-child(1) { animation-delay: 0.05s; }
.member:nth-child(2) { animation-delay: 0.10s; }
.member:nth-child(3) { animation-delay: 0.15s; }
.member:nth-child(4) { animation-delay: 0.20s; }
.member:nth-child(5) { animation-delay: 0.25s; }
.member:nth-child(6) { animation-delay: 0.30s; }
.member:nth-child(7) { animation-delay: 0.35s; }
.member:nth-child(8) { animation-delay: 0.40s; }
.member:nth-child(9) { animation-delay: 0.45s; }

@keyframes memberIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.member:hover {
  background: rgba(212,160,23,0.08);
  border-color: rgba(212,160,23,0.3);
}

.member-icon { font-size: 1.2rem; }

.member-name {
  font-family: 'Cinzel', serif;
  font-size: 0.52rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  text-align: center;
}

.panel-rope {
  height: 5px;
  background: repeating-linear-gradient(
    90deg,
    var(--rope) 0px, #A0791E 3px,
    var(--rope) 6px, #7A5810 9px,
    var(--rope) 12px
  );
  opacity: 0.9;
  flex-shrink: 0;
}

/* ── RIGHT: Form panel ── */
.form-panel {
  width: 340px;
  flex-shrink: 0;
  background: var(--navy-mid);
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid rgba(212,160,23,0.2);
}

.form-inner {
  width: 100%;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}

.form-jolly {
  font-size: 2rem;
  filter: drop-shadow(0 0 10px rgba(212,160,23,0.5));
  margin-bottom: 4px;
}

.form-title {
  font-family: 'Cinzel', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold-light);
  letter-spacing: 0.08em;
  text-shadow: 0 0 20px rgba(212,160,23,0.35);
}

.form-sub {
  font-style: italic;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.form-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212,160,23,0.25), transparent);
}

.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-family: 'Cinzel', serif;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--gold);
  opacity: 0.8;
  text-transform: uppercase;
}

.op-input {
  width: 100%;
  background: rgba(11, 24, 38, 0.8);
  border: 1px solid rgba(212,160,23,0.2);
  border-radius: 7px;
  padding: 10px 14px;
  font-family: 'Crimson Pro', serif;
  font-size: 1rem;
  color: var(--text-light);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.op-input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
  font-style: italic;
}

.op-input:focus {
  border-color: rgba(212,160,23,0.55);
  box-shadow: 0 0 0 3px rgba(212,160,23,0.08), 0 0 12px rgba(212,160,23,0.1);
}

.login-btn {
  width: 100%;
  padding: 11px;
  background: var(--red-flag);
  border: 1px solid var(--gold);
  border-radius: 7px;
  font-family: 'Cinzel', serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--gold-pale);
  cursor: pointer;
  box-shadow: 0 2px 16px rgba(139,26,26,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
  transition: all 0.2s ease;
  margin-top: 0.25rem;
}

.login-btn:hover {
  background: #A52020;
  box-shadow: 0 4px 24px rgba(139,26,26,0.6), 0 0 12px rgba(212,160,23,0.2);
  transform: translateY(-1px);
}

.login-btn:active {
  transform: translateY(0);
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-top: 0.25rem;
}

.footer-text {
  font-style: italic;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer-link {
  font-family: 'Cinzel', serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--gold-light);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #fff;
}
</style>