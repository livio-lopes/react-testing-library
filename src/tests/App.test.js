import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste do componente App', () => {
  it('Teste se o topo da aplicação contém Home, About e Favorite Pokémon fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkPokemonFavorites = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkPokemonFavorites).toBeInTheDocument();
  });
  it('Teste se a aplicação é redirecionada para a página inicial, na URL "/" ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About. na URL "/about", ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkPokemonFavorites = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkPokemonFavorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/bode'); });
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
