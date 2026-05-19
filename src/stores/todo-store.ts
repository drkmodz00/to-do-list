import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'
import { useAuthStore } from './auth-store'
import type { Todo } from 'src/types/todos'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    loading: false
  }),

  actions: {
    async fetchTodos() {
      const auth = useAuthStore()

      const user = auth.user
      if (!user) return

      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      this.todos = data || []
    },

    async addTodo(title: string) {
      const auth = useAuthStore()

      const user = auth.user
      if (!user) return

      const { data, error } = await supabase
        .from('todos')
        .insert([
          {
            title,
            is_complete: false,
            user_id: user.id
          }
        ])
        .select()

      if (error) throw error
      this.todos.unshift(data[0])
    },

    async toggleTodo(todo: Todo) {
      const { error } = await supabase
        .from('todos')
        .update({ is_complete: !todo.is_complete })
        .eq('id', todo.id)

      if (error) throw error

      todo.is_complete = !todo.is_complete
    },

    async deleteTodo(id: number) {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error

      this.todos = this.todos.filter(t => t.id !== id)
    }
  }
})