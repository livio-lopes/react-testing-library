import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o component Favorite Pokemon', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    render(<FavoritePokemon />);
    const noFavorites = screen.getByText(/no favorite pokémon found/i);
    expect(noFavorites).toBeInTheDocument();
  });
  it('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<App />);
    // Salvando os pokemons
    const moreDetailsPikachu = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsPikachu);
    const checkedPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkedPokemon);
    // Recuperando os pokemons
    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemon);
    const favoritePikachu = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoritePikachu).toBeInTheDocument();
  });
});
