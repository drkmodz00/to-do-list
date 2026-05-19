import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false
  }),

  actions: {
    async getUser() {
      const { data } = await supabase.auth.getUser()
      this.user = data.user
    },

    async register(email: string, password: string) {
      this.loading = true
      const { error } = await supabase.auth.signUp({
        email,
        password
      })
      this.loading = false
      if (error) throw error
    },

    async login(email: string, password: string) {
      this.loading = true
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      this.loading = false
      if (error) throw error
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
    }
  }
})