import { create } from 'zustand'

interface IUser {
  balance: number | null
  id: string | null
  mail: string | null
  // account: string | null,
  privateKey: string | null
  token: string | null
  // tezos: any | null,
  updateAmount: (newAmount: number) => void
  updateId: (newId: string) => void
  // updateAccount: (newAccount: string) => void
  updateMail: (newMail: string) => void
  updatePrivateKey: (newPK: string) => void

  updateToken: (newToken: string) => void

  // getId: () => string
}

export const useBookStore = create<IUser>((set, get) => ({
  balance: null,
  id: null,
  mail: null,
  // account: null,
  privateKey: null,
  token: null,
  updateId: (newId: string) => set({ id: newId }),
  // set can also receive a function as a parameter
  // updateAmount: (newAmount: number) => set(state => ({ ...state, amount: state.amount + newAmount }))
  updateAmount: (newAmount: number) => {
    set({ balance: newAmount })
  },
  // updateAccount: (newAccount: string) => {
  //   set({ account: newAccount})
  // },
  updateMail: (newMail: string) => {
    set({ mail: newMail })
  },
  updatePrivateKey: (newPK: string) => {
    set({ privateKey: newPK })
  },
  updateToken: (newTok: string) => {
    set({ token: newTok })
  },

  // getId: () => {
  //   get(id)
  // }
}))
