import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

const SearchBarContainer = styled.div`
  .FaSearch {
    font-size: 1.5rem;
  }
  display: flex;
  margin: 2rem auto;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
`

const SearchBar = styled.div`
  background-color: white;
  margin-right: 10px;
`

const SearchBarInput = styled.input`
  padding: 12px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: none;
  width: 34rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    width: 14rem;
  }
`

export const Searchbar = ({ search }) => {
  const [text, setText] = useState('')
  const onSearch = (q) => {
    setText(q)
    search(q)
  }
  return (
    <SearchBarContainer>
      <SearchBar>
        <form>
          <SearchBarInput
            type="text"
            placeholder="Digite o nome de um herói"
            onChange={(e) => onSearch(e.target.value)}
            value={text}
          />
        </form>
      </SearchBar>
      <FaSearch className="FaSearch" />
    </SearchBarContainer>
  )
}
