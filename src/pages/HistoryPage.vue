<!-- src/pages/HistoryPage.vue -->

<template>
  <q-page class="op-page">

    <div class="page-header">
      <div class="page-title-wrap">
        <span class="page-icon">🏴‍☠️</span>
        <div>
          <div class="page-title">Conquered Seas</div>
          <div class="page-sub">{{ todos.length }} quest{{ todos.length !== 1 ? 's' : '' }} completed</div>
        </div>
      </div>
    </div>

    <div class="todo-list">

      <div v-if="todos.length === 0" class="empty-state">
        <div class="empty-icon">🗺️</div>
        <div class="empty-title">No conquests yet, Captain!</div>
        <div class="empty-sub">Complete a quest and it'll appear in the log.</div>
      </div>

      <div
        v-for="(todo, i) in todos"
        :key="todo.id"
        class="todo-card"
        :style="`--i: ${i}`"
      >

        <div class="card-left">
          <div class="victory-seal">✦</div>
          <div class="card-num">{{ String(i + 1).padStart(2, '0') }}</div>
        </div>

        <div class="card-body">
          <div class="card-title">{{ todo.title }}</div>
          <div class="card-meta">
            <span class="meta-tag completed-tag">
              <span class="meta-icon">⚔️</span> {{ formatDate(todo.completed_at || '') }}
            </span>
            <span class="meta-divider">·</span>
            <span class="meta-tag deadline-tag">
              <span class="meta-icon">⏳</span> {{ todo.deadline }}
            </span>
          </div>
        </div>

        <div class="card-badge">Cleared</div>

      </div>

    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from 'src/boot/supabase'

interface Todo {
  id: string
  title: string
  completed_at?: string
  deadline: string
}

const todos = ref<Todo[]>([])

onMounted(() => {
  void fetchHistory()
})

async function fetchHistory(): Promise<void> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('is_completed', true)
    .order('completed_at', { ascending: false })

  if (error) {
    console.log(error)
    return
  }

  todos.value = (data as Todo[]) || []
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');

:root {
  --navy-deep:  #0B1826;
  --gold:       #D4A017;
  --gold-light: #F0C040;
  --gold-pale:  #F5E6C8;
  --teal-light: #1ABC9C;
  --text-light: #F0EAD6;
  --text-muted: #B0C8D8;
  --rope:       #8B6914;
}

.op-page {
  background: var(--navy-deep);
  min-height: 100vh;
  padding: 2rem 1.5rem;
  font-family: 'Crimson Pro', Georgia, serif;
  background-image:
    radial-gradient(ellipse 50% 30% at 90% 10%, rgba(26,188,156,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 5% 80%, rgba(212,160,23,0.04) 0%, transparent 60%);
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(26,188,156,0.25);
  position: relative;
}

.page-header::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 2px;
  background: var(--teal-light);
  border-radius: 2px;
}

.page-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-icon {
  font-size: 1.6rem;
  filter: drop-shadow(0 0 8px rgba(26,188,156,0.4));
}

.page-title {
  font-family: 'Cinzel', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #5EFAD8;
  letter-spacing: 0.06em;
  text-shadow: 0 0 20px rgba(26,188,156,0.4);
  line-height: 1.1;
}

.page-sub {
  font-family: 'Crimson Pro', serif;
  font-style: italic;
  font-size: 0.85rem;
  color: #A8C8D8;
  letter-spacing: 0.04em;
  margin-top: 2px;
}

/* ── List ── */
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ── Empty state ── */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  border: 1px dashed rgba(26,188,156,0.25);
  border-radius: 12px;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-family: 'Cinzel', serif;
  font-size: 1.1rem;
  color: #5EFAD8;
  margin-bottom: 0.4rem;
}

.empty-sub {
  font-style: italic;
  color: #A8C8D8;
  font-size: 0.95rem;
}

/* ── Card ── */
.todo-card {
  display: flex;
  align-items: center;
  background: rgba(26, 188, 156, 0.07);
  border: 1px solid rgba(26,188,156,0.22);
  border-radius: 8px;
  overflow: hidden;
  animation: slideIn 0.3s ease both;
  animation-delay: calc(var(--i) * 0.06s);
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.todo-card:hover {
  border-color: rgba(26,188,156,0.55);
  transform: translateX(3px);
  box-shadow: -3px 0 0 var(--teal-light), 0 4px 24px rgba(0,0,0,0.3);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── Card left ── */
.card-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 1rem 0.75rem;
  border-right: 1px solid rgba(26,188,156,0.15);
  background: rgba(0,0,0,0.2);
  min-width: 56px;
}

.victory-seal {
  font-size: 1.1rem;
  color: #5EFAD8;
  text-shadow: 0 0 8px rgba(26,188,156,0.7);
  animation: sealPulse 3s ease-in-out infinite;
}

@keyframes sealPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

.card-num {
  font-family: 'Cinzel', serif;
  font-size: 0.62rem;
  font-weight: 600;
  color: #A8C8D8;
  letter-spacing: 0.05em;
}

/* ── Card body ── */
.card-body {
  flex: 1;
  padding: 0.9rem 1.1rem;
}

.card-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #F0EAD6;
  margin-bottom: 6px;
  line-height: 1.3;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.meta-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-style: italic;
}

.completed-tag { color: #5EFAD8; }
.deadline-tag  { color: #F0C040; }

.meta-icon { font-size: 0.72rem; }

.meta-divider {
  color: rgba(26,188,156,0.35);
  font-size: 0.9rem;
}

/* ── Badge ── */
.card-badge {
  margin-right: 1rem;
  padding: 4px 14px;
  font-family: 'Cinzel', serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5EFAD8;
  border: 1px solid rgba(26,188,156,0.45);
  border-radius: 20px;
  background: rgba(26,188,156,0.12);
  white-space: nowrap;
}
</style>