import { create } from 'zustand'

interface IUser {
  balance: number | null
  id: string | null
  mail: string | null
  privateKey: string | null
  token: string | null
  link: string | null
  updateAmount: (newAmount: number) => void
  updateId: (newId: string) => void
  updateMail: (newMail: string) => void
  updatePrivateKey: (newPK: string) => void
  updateToken: (newToken: string) => void
  setLink: (newLink: string) => void
}

export const useBookStore = create<IUser>((set, get) => ({
  balance: null,
  id: null,
  mail: null,
  privateKey: null,
  token: null,
  link: null,
  updateId: (newId: string) => set({ id: newId }),
  // set can also receive a function as a parameter
  updateAmount: (newAmount: number) => {
    set({ balance: newAmount })
  },
  updateMail: (newMail: string) => {
    set({ mail: newMail })
  },
  updatePrivateKey: (newPK: string) => {
    set({ privateKey: newPK })
  },
  updateToken: (newTok: string) => {
    set({ token: newTok })
  },

  setLink: (newLink: string) => {
    set({ link: newLink })
  },
}))
