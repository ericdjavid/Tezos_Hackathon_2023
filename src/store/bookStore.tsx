import { create } from 'zustand'

interface IUser {
  balance: number | null,
  id: string | null,
  updateAmount: (newAmount: number) => void
}

export const useBookStore = create<IUser>((set, get) => ({
  balance: 0,
  id: "Alice's Adventures in Wonderland",
  // updateAmount: (newAmount: number) => set({ balance: newAmount }),
  // set can also receive a function as a parameter 
  // updateAmount: (newAmount: number) => set(state => ({ ...state, amount: state.amount + newAmount }))
  updateAmount: (newAmount: number) => {
    const amountState = get().balance
    set({ balance: newAmount + amountState })
  },
}));