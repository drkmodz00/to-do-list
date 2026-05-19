<!-- src/pages/IndexPage.vue -->

<template>
  <q-page class="op-page">

    <div class="page-header">
      <div class="page-title-wrap">
        <span class="page-icon">📋</span>
        <div>
          <div class="page-title">Mission Log</div>
          <div class="page-sub">{{ todos.length }} quest{{ todos.length !== 1 ? 's' : '' }} remaining</div>
        </div>
      </div>
      <q-btn class="add-btn" icon="add" label="New Quest" @click="openAddModal" :ripple="false" />
    </div>

    <div class="todo-list">

      <div v-if="todos.length === 0" class="empty-state">
        <div class="empty-icon">⚓</div>
        <div class="empty-title">All seas are clear, Captain!</div>
        <div class="empty-sub">No quests on the log. Add one to set sail.</div>
      </div>

      <div
        v-for="(todo, i) in todos"
        :key="todo.id"
        class="todo-card"
        :style="`--i: ${i}`"
      >
        <div class="card-left">
          <q-checkbox
            v-model="todo.is_completed"
            @update:model-value="completeTodo(todo)"
            class="op-checkbox"
            color="amber-7"
          />
          <div class="card-num">{{ String(i + 1).padStart(2, '0') }}</div>
        </div>

        <div class="card-body" @click="openEditModal(todo)">
          <div class="card-title">{{ todo.title }}</div>
          <div class="card-meta">
            <span class="meta-tag">
              <span class="meta-icon">⚡</span> {{ formatDate(todo.created_at) }}
            </span>
            <span class="meta-divider">·</span>
            <span class="meta-tag deadline">
              <span class="meta-icon">⏳</span> {{ todo.deadline }}
            </span>
          </div>
        </div>

        <div class="card-arrow" @click="openEditModal(todo)">›</div>
      </div>

    </div>

    <TodoModal
      v-model="showModal"
      :todo="selectedTodo"
      :mode="modalMode"
      @refresh="fetchTodos"
    />

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from 'src/boot/supabase'
import TodoModal from 'src/components/TodoModal.vue'

interface Todo {
  id: string
  title: string
  created_at: string
  deadline: string
  is_completed: boolean
  completed_at?: string
}

const todos = ref<Todo[]>([])
const showModal = ref<boolean>(false)
const selectedTodo = ref<Todo | null>(null)
const modalMode = ref<string>('add')

onMounted(() => { 
  void fetchTodos() 
})

async function fetchTodos(): Promise<void> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('is_completed', false)
    .order('created_at', { ascending: false })
  if (error) { console.log(error); return }
  todos.value = (data as Todo[]) || []
}

function openAddModal(): void {
  selectedTodo.value = null
  modalMode.value = 'add'
  showModal.value = true
}

function openEditModal(todo: Todo): void {
  selectedTodo.value = todo
  modalMode.value = 'edit'
  showModal.value = true
}

async function completeTodo(todo: Todo): Promise<void> {
  await supabase
    .from('todos')
    .update({ is_completed: true, completed_at: new Date().toISOString() })
    .eq('id', todo.id)
  void fetchTodos()
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString()
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
  --rope:       #8B6914;
  --text-light: #F5E6C8;
  --text-muted: #7A96AF;
}

.op-page {
  background: var(--navy-deep);
  min-height: 100vh;
  padding: 2rem 1.5rem;
  font-family: 'Crimson Pro', Georgia, serif;
  background-image:
    radial-gradient(ellipse 60% 30% at 80% 0%, rgba(212,160,23,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 10% 90%, rgba(139,26,26,0.06) 0%, transparent 60%);
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(212,160,23,0.2);
  position: relative;
}

.page-header::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 2px;
  background: var(--gold);
  border-radius: 2px;
}

.page-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-icon {
  font-size: 1.6rem;
  filter: drop-shadow(0 0 8px rgba(212,160,23,0.4));
}

.page-title {
  font-family: 'Cinzel', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--gold-light);
  letter-spacing: 0.06em;
  text-shadow: 0 0 20px rgba(212,160,23,0.3);
  line-height: 1.1;
}

.page-sub {
  font-family: 'Crimson Pro', serif;
  font-style: italic;
  font-size: 0.82rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  margin-top: 2px;
}

.add-btn {
  font-family: 'Cinzel', serif !important;
  font-size: 0.72rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.08em !important;
  text-transform: none !important;
  background: var(--red-flag) !important;
  color: var(--gold-pale) !important;
  border: 1px solid var(--gold) !important;
  border-radius: 6px !important;
  padding: 8px 20px !important;
  box-shadow: 0 2px 16px rgba(139,26,26,0.45), inset 0 1px 0 rgba(255,255,255,0.06) !important;
  transition: all 0.2s ease !important;
}

.add-btn:hover {
  background: #A52020 !important;
  box-shadow: 0 4px 20px rgba(139,26,26,0.6), 0 0 12px rgba(212,160,23,0.2) !important;
  transform: translateY(-1px);
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
  border: 1px dashed rgba(212,160,23,0.2);
  border-radius: 12px;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-title {
  font-family: 'Cinzel', serif;
  font-size: 1.1rem;
  color: var(--gold-light);
  margin-bottom: 0.4rem;
  opacity: 0.7;
}

.empty-sub {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* ── Todo card ── */
.todo-card {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(18, 34, 54, 0.7);
  border: 1px solid rgba(212,160,23,0.15);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  animation: slideIn 0.3s ease both;
  animation-delay: calc(var(--i) * 0.06s);
  cursor: default;
}

.todo-card:hover {
  border-color: rgba(212,160,23,0.4);
  transform: translateX(3px);
  box-shadow: -3px 0 0 var(--gold), 0 4px 24px rgba(0,0,0,0.3);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

.card-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 1rem 0.75rem;
  border-right: 1px solid rgba(212,160,23,0.1);
  background: rgba(0,0,0,0.15);
  min-width: 56px;
}

.card-num {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.card-body {
  flex: 1;
  padding: 0.85rem 1.1rem;
  cursor: pointer;
}

.card-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-light);
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
  font-size: 0.75rem;
  color: var(--text-muted);
  font-style: italic;
}

.meta-tag.deadline { color: rgba(212,160,23,0.6); }

.meta-icon { font-size: 0.7rem; }

.meta-divider {
  color: rgba(212,160,23,0.2);
  font-size: 0.9rem;
}

.card-arrow {
  padding: 0 1rem;
  font-size: 1.4rem;
  color: rgba(212,160,23,0.25);
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
  line-height: 1;
  align-self: stretch;
  display: flex;
  align-items: center;
}

.todo-card:hover .card-arrow {
  color: var(--gold);
  transform: translateX(2px);
}

/* ── Checkbox override ── */
.op-checkbox :deep(.q-checkbox__inner) {
  color: var(--gold) !important;
}
</style>