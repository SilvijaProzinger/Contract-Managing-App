import { create } from "zustand";
import { ItemState, Items } from "../types/types";

const useItemsStore = create<ItemState>((set) => ({
  items: [],
  setItems: (newItem: Items[]) => set({ items: newItem }),
}));

export { useItemsStore };
 