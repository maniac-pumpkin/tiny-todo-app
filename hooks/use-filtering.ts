"use client"

import { create } from "zustand/react"

type StateType = {
  search: string
  renderMode: "grid" | "list"
  sortBy: "Order added" | "Earlier first" | "Later first"
  updateSearch: (text: string) => void
  updateRenderMode: (mode: "grid" | "list") => void
  updateSortBy: (by: "Order added" | "Earlier first" | "Later first") => void
}

const useFiltering = create<StateType>((set) => ({
  search: "",
  renderMode: "grid",
  sortBy: "Order added",
  updateSearch: (text) => set((state) => ({ ...state, search: text })),
  updateRenderMode: (mode) => set((state) => ({ ...state, renderMode: mode })),
  updateSortBy: (by) => set((state) => ({ ...state, sortBy: by })),
}))

export default useFiltering
