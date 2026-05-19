<!-- src/components/TodoModal.vue -->

<template>
  <q-dialog v-model="dialog" backdrop-filter="blur(4px)">

    <q-card class="op-modal">

      <div class="modal-rope" />

      <q-card-section class="modal-header">
        <div class="modal-header-left">
          <div class="modal-jolly">
            {{ mode === 'add' ? '⚓' : '📜' }}
          </div>
          <div>
            <div class="modal-title">
              {{ mode === 'add' ? 'New Quest' : 'Edit Quest' }}
            </div>
            <div class="modal-sub">
              {{ mode === 'add' ? 'Chart a new mission' : 'Modify your orders' }}
            </div>
          </div>
        </div>
        <q-btn flat round dense icon="close" v-close-popup class="close-btn" />
      </q-card-section>

      <div class="modal-divider" />

      <q-card-section class="modal-body">

        <div class="field-wrap">
          <label class="field-label">⚔ Quest Title</label>
          <input
            v-model="form.title"
            class="op-input"
            placeholder="Enter your mission..."
          />
        </div>

        <div class="field-wrap">
          <label class="field-label">📅 Departure Date</label>
          <input
            v-model="form.created_at"
            class="op-input"
            type="date"
          />
        </div>

        <div class="field-wrap">
          <label class="field-label">⏳ Deadline</label>
          <input
            v-model="form.deadline"
            class="op-input"
            type="date"
          />
        </div>

      </q-card-section>

      <q-card-actions class="modal-actions">

        <q-btn flat label="Retreat" v-close-popup class="action-btn cancel-btn" :ripple="false" />

        <div class="actions-right">
          <q-btn
            v-if="mode === 'edit'"
            label="Abandon"
            class="action-btn delete-btn"
            @click="void deleteTodo()"
            :ripple="false"
          />
          <q-btn
            :label="mode === 'add' ? 'Set Sail' : 'Update Log'"
            class="action-btn submit-btn"
            @click="void submitTodo()"
            :ripple="false"
          />
        </div>

      </q-card-actions>

      <div class="modal-rope" />

    </q-card>

  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { supabase } from 'src/boot/supabase'

interface Todo {
  id?: string
  title: string
  created_at: string
  deadline: string
}

const props = defineProps<{
  modelValue: boolean
  todo: Todo | null
  mode: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'refresh'): void
}>()

const dialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const form = ref<Todo>({
  title: '',
  created_at: '',
  deadline: ''
})

watch(
  () => props.todo,
  (value) => {
    if (value) {
      form.value = {
        title: value.title,
        created_at: value.created_at
          ? value.created_at.split('T')[0] ?? ''
          : '',
        deadline: value.deadline
      }
    } else {
      form.value = {
        title: '',
        created_at:
          new Date().toISOString().split('T')[0] ?? '',
        deadline: ''
      }
    }
  },
  { immediate: true }
)

async function submitTodo() {
  if (props.mode === 'add') {
    await supabase.from('todos').insert([{
      title: form.value.title,
      created_at: form.value.created_at,
      deadline: form.value.deadline
    }])
  } else {
    await supabase.from('todos').update({
      title: form.value.title,
      deadline: form.value.deadline,
      updated_at: new Date()
    }).eq('id', props.todo?.id)
  }
  emit('refresh')
  dialog.value = false
}

async function deleteTodo() {
  await supabase.from('todos').delete().eq('id', props.todo?.id)
  emit('refresh')
  dialog.value = false
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
  --text-light: #F5E6C8;
  --text-muted: #7A96AF;
  --rope:       #8B6914;
}

/* ── Card ── */
.op-modal {
  width: 420px !important;
  max-width: 95vw !important;
  background: var(--navy-mid) !important;
  border: 1px solid rgba(212,160,23,0.3) !important;
  border-radius: 12px !important;
  box-shadow:
    0 24px 60px rgba(0,0,0,0.7),
    0 0 0 1px rgba(212,160,23,0.08),
    inset 0 1px 0 rgba(212,160,23,0.1) !important;
  overflow: hidden !important;
  font-family: 'Crimson Pro', Georgia, serif !important;
}

/* ── Rope stripe ── */
.modal-rope {
  height: 5px;
  background: repeating-linear-gradient(
    90deg,
    var(--rope) 0px,
    #A0791E 3px,
    var(--rope) 6px,
    #7A5810 9px,
    var(--rope) 12px
  );
  opacity: 0.85;
}

/* ── Header ── */
.modal-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 1.25rem 1.5rem !important;
}

.modal-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-jolly {
  width: 42px;
  height: 42px;
  background: var(--red-flag);
  border: 1px solid var(--gold);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  box-shadow: 0 0 12px rgba(139,26,26,0.4);
}

.modal-title {
  font-family: 'Cinzel', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gold-light);
  letter-spacing: 0.06em;
  text-shadow: 0 0 16px rgba(212,160,23,0.3);
  line-height: 1.2;
}

.modal-sub {
  font-style: italic;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.close-btn {
  color: var(--text-muted) !important;
  transition: color 0.2s ease !important;
}

.close-btn:hover { color: var(--gold-light) !important; }

/* ── Divider ── */
.modal-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212,160,23,0.25) 30%, rgba(212,160,23,0.25) 70%, transparent);
  margin: 0 1.5rem;
}

/* ── Body ── */
.modal-body {
  padding: 1.5rem !important;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-family: 'Cinzel', serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--gold);
  opacity: 0.75;
  text-transform: uppercase;
}

.op-input {
  width: 100%;
  background: rgba(11, 24, 38, 0.7);
  border: 1px solid rgba(212,160,23,0.2);
  border-radius: 7px;
  padding: 10px 14px;
  font-family: 'Crimson Pro', serif;
  font-size: 1rem;
  color: var(--text-light);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  -webkit-appearance: none;
}

.op-input::placeholder { color: var(--text-muted); opacity: 0.6; font-style: italic; }

.op-input:focus {
  border-color: rgba(212,160,23,0.55);
  box-shadow: 0 0 0 3px rgba(212,160,23,0.08), 0 0 12px rgba(212,160,23,0.1);
}

/* date picker icon tint */
.op-input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.6) sepia(1) saturate(2) hue-rotate(5deg);
  opacity: 0.6;
  cursor: pointer;
}

/* ── Actions ── */
.modal-actions {
  padding: 1rem 1.5rem 1.25rem !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  border-top: 1px solid rgba(212,160,23,0.1) !important;
}

.actions-right {
  display: flex;
  gap: 8px;
  align-items: center;
}

.action-btn {
  font-family: 'Cinzel', serif !important;
  font-size: 0.68rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.08em !important;
  text-transform: none !important;
  border-radius: 6px !important;
  padding: 7px 18px !important;
  min-height: unset !important;
  transition: all 0.2s ease !important;
}

.cancel-btn {
  color: var(--text-muted) !important;
  background: transparent !important;
}
.cancel-btn:hover { color: var(--text-light) !important; }

.delete-btn {
  background: rgba(139,26,26,0.25) !important;
  color: #F08080 !important;
  border: 1px solid rgba(139,26,26,0.5) !important;
}
.delete-btn:hover {
  background: rgba(139,26,26,0.45) !important;
  border-color: #C0392B !important;
}

.submit-btn {
  background: var(--red-flag) !important;
  color: var(--gold-pale) !important;
  border: 1px solid var(--gold) !important;
  box-shadow: 0 2px 14px rgba(139,26,26,0.4) !important;
}
.submit-btn:hover {
  background: #A52020 !important;
  box-shadow: 0 4px 20px rgba(139,26,26,0.6), 0 0 10px rgba(212,160,23,0.15) !important;
  transform: translateY(-1px);
}
</style>