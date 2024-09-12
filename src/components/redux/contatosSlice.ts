import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Contato {
  id: number
  nome: string
  email: string
  telefone: string
}

const initialState: Contato[] = []

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    adicionarContato: (state, action: PayloadAction<Contato>) => {
      state.push(action.payload)
    },
    removerContato: (state, action: PayloadAction<number>) => {
      return state.filter((contato) => contato.id !== action.payload)
    },
    editarContato: (state, action: PayloadAction<Contato>) => {
      const index = state.findIndex(
        (contato) => contato.id === action.payload.id
      )
      if (index >= 0) {
        state[index] = action.payload
      }
    }
  }
})

export const { adicionarContato, removerContato, editarContato } =
  contatosSlice.actions

export default contatosSlice.reducer
