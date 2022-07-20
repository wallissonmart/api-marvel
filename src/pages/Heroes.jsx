import styled from 'styled-components'
import { useState, useEffect } from 'react'
import md5 from 'md5'
import { Searchbar } from '../components/Searchbar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Container = styled.div`
  margin-top: 2rem;
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: ${(p) =>
      `repeat(auto-fit, minmax(${p.minWidth || '200px'}, 2fr))`};
    column-gap: 3rem;
    row-gap: 1rem;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 180px;
    border-radius: 1rem;
    margin-bottom: 2rem;
  }

  span {
    font-weight: bold;
    font-size: 120%;
    text-align: center;
    padding: 0.2rem;
  }

  a {
    transition: all 0.3s;
  }

  a:hover {
    transform: scale(1.1);
  }
`

export const Heroes = () => {
  const baseURL = 'https://gateway.marvel.com/v1/public/characters?'
  const publicKey = '38267605957928ce8c7aa2296bb1a75c'
  const privateKey = 'b060cbafce86416f2a50c0fdc68b8b637f4f6e72'
  const time = Number(new Date())
  const hash = md5(time + privateKey + publicKey)
  const [heroes, setHeroes] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetch = async () => {
      if (query === '') {
        const result = await axios(
          `${baseURL}ts=${time}&apikey=${publicKey}&hash=${hash}`
        )
        setHeroes(result.data.data.results)
      } else {
        const result = await axios(
          `${baseURL}nameStartsWith=${query}&ts=${time}&apikey=${publicKey}&hash=${hash}`
        )
        setHeroes(result.data.data.results)
      }
    }
    fetch()
  }, [query])

  return (
    <>
      <Searchbar search={(q) => setQuery(q)} />

      <Container>
        <ul>
          {heroes.map((heroe) => {
            return (
              <li key={heroe.id}>
                <Link to={`/heroes/details/${heroe.id}`}>
                  <img
                    src={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`}
                    alt={heroe.name}
                  />
                </Link>
                <span>{heroe.name}</span>
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
