import styled from 'styled-components';

export const SearchBar = styled.form`
  display: flex;
  border: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  background-color: white;
  color: black;
  width: 30%;
  justify-content: space-between;
`;

export const LargeLogo = styled.img`
  display: none;

  @media screen and (min-width: 1000px) {
    display: block;
  }
`;

export const SmallLogo = styled.img`
  display: none;

  @media screen and (max-width: 999px) {
    display: block;
  }
`;
