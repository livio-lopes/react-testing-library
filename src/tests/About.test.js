import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../pages/About';

describe('Teste o componente About', () => {
  it.todo('Teste se a página contém as informações sobre a Pokédex');
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const titleAbout = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(titleAbout).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragrathOne = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const paragrathTwo = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(paragrathOne.tagName).toBe('P');
    expect(paragrathTwo.tagName).toBe('P');
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    render(<About />);
    const imgAbout = screen.getByRole('img', { name: /pokédex/i });
    expect(imgAbout).toBeInTheDocument();
    expect(imgAbout.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
