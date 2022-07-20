import React, { useContext } from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  background-image: linear-gradient(#8b0b00, #94413e);
  height: 8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`
const HeroisFav = styled.span`
  color: #fff;
  font-weight: 600;
  font-family: 'Marvel';
  font-size: 1.5rem;
`
const NavBarImg = styled.img`
  width: 160px;
`

export const Navbar = () => {
  const logoImg =
    'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg'
  return (
    <Nav>
      <div>
        <NavBarImg alt="marvel-logo" src={logoImg} />
      </div>
      <HeroisFav>Heróis favoritos</HeroisFav>
    </Nav>
  )
}
