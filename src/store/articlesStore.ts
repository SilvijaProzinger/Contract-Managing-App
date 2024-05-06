import { create } from "zustand";
import { ItemState,Item } from "../types/types";

const useItemsStore = create<ItemState>((set) => ({
  items: [],
  setItems: (newItem: Item[]) => set({ items: newItem }),
}));

export { useItemsStore };
