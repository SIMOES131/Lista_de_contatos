import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './components/redux/store'
import styled from 'styled-components'

import {
  adicionarContato,
  removerContato,
  editarContato
} from './components/redux/contatosSlice'

interface Contato {
  id: number
  nome: string
  email: string
  telefone: string
}

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`

const Botao = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

const App: React.FC = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [editarId, setEditarId] = useState<number | null>(null)

  const contatos = useSelector((state: RootState) => state.contatos)
  const dispatch = useDispatch<AppDispatch>()

  const handleAdicionarContato = () => {
    if (editarId) {
      dispatch(editarContato({ id: editarId, nome, email, telefone }))
      setEditarId(null)
    } else {
      dispatch(adicionarContato({ id: Date.now(), nome, email, telefone }))
    }
    setNome('')
    setEmail('')
    setTelefone('')
  }

  const handleEditar = (contato: Contato) => {
    setEditarId(contato.id)
    setNome(contato.nome)
    setEmail(contato.email)
    setTelefone(contato.telefone)
  }

  return (
    <Container>
      <h1>Lista de Contatos</h1>
      <div>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <Botao onClick={handleAdicionarContato}>
          {editarId ? 'Editar Contato' : 'Adicionar Contato'}
        </Botao>
      </div>
      <div>
        {contatos.map((contato: Contato) => (
          <div key={contato.id}>
            <p>{contato.nome}</p>
            <p>{contato.email}</p>
            <p>{contato.telefone}</p>
            <Botao onClick={() => handleEditar(contato)}>Editar</Botao>
            <Botao onClick={() => dispatch(removerContato(contato.id))}>
              Remover
            </Botao>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default App
