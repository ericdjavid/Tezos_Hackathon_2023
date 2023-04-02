import { create } from 'zustand'

interface IUser {
  balance: number | null,
  id: string | null,
  updateAmount: (newAmount: number) => void
  updateId: (newId: string) => void
}

export const useBookStore = create<IUser>((set, get) => ({
  balance: null,
  id: null,
  updateId: (newId: string) => set({ id: newId }),
  // set can also receive a function as a parameter 
  // updateAmount: (newAmount: number) => set(state => ({ ...state, amount: state.amount + newAmount }))
  updateAmount: (newAmount: number) => {
    const amountState = get().balance
    set({ balance: newAmount + amountState })
  },
}));