import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import md5 from 'md5'
import axios from 'axios'

const Container = styled.div`
  padding: 2.5rem 0;
  h1 {
    text-align: center;
    margin: 3rem 0;
  }
  .heroe {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 300px;
    border-radius: 1rem;
  }
  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 4rem;
    max-width: 50%;
  }
  button {
    background-color: #8b0b00;
    border: none;
    cursor: pointer;
    border-radius: 1rem;
    color: white;
    padding: 0.8rem 2rem;
    margin-top: 1rem;
    font-size: 100%;
    transition: all 0.3s;
  }
  button:hover {
    background-color: #410702;
  }
  span {
    line-height: 130%;
    margin-bottom: 1rem;
    font-size: 110%;
  }
  .release-date {
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    .heroe {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      max-width: 100%;
    }
    .details {
      justify-content: center;
      align-items: center;
      max-width: 100%;
      margin-left: 0rem;
    }
    img {
      max-width: 100%;
    }
    span {
      text-align: center;
    }
  }
`

export const Details = () => {
  const { id } = useParams()
  const baseURL = `http://gateway.marvel.com/v1/public/characters/`
  const publicKey = '38267605957928ce8c7aa2296bb1a75c'
  const privateKey = 'b060cbafce86416f2a50c0fdc68b8b637f4f6e72'
  const time = Number(new Date())
  const hash = md5(time + privateKey + publicKey)
  const [heroes, setHeroes] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const result = await axios(
        `${baseURL}${id}?&ts=${time}&apikey=${publicKey}&hash=${hash}`
      )
      setHeroes(result.data.data.results)
    }
    fetch()
  }, [id])

  return (
    <>
      <Container>
        {heroes.map((heroe) => {
          return (
            <div className="heroe" key={heroe.id}>
              <img
                src={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`}
                alt={heroe.name}
              />
              <div className="details">
                <h1>{heroe.name}</h1>
                <span>
                  {heroe.description
                    ? heroe.description
                    : 'Descrição indisponível'}
                </span>
                <span className="release-date">
                  Aparece em: {heroe.comics.available} HQs e{' '}
                  {heroe.series.available} séries
                </span>

                <Link to={`/api-marvel`}>
                  <button>Voltar</button>
                </Link>
                <button>Adicionar aos favoritos</button>
              </div>
            </div>
          )
        })}
      </Container>
    </>
  )
}
