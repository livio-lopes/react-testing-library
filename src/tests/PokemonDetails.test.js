import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const PIKACHU = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

describe('Testa o componente PokemonDetails', () => {
  it('Testa se as informações do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const pikachuDetail = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(pikachuDetail).toBeInTheDocument();
    const noMoreDetails = screen.queryByText(/more details/i);
    expect(noMoreDetails).toBeNull();
    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
    const resume = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(resume).toBeInTheDocument();
  });
  it('Testa se existe na página uma seção com os maps contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const gameLocation = screen.getByRole('heading', { name: `Game Locations of ${PIKACHU.name}` });
    expect(gameLocation).toBeInTheDocument();
    const allLocations = screen.getAllByAltText(`${PIKACHU.name} location`);
    expect(allLocations.length).toBe(2);
    const { foundAt } = PIKACHU;
    allLocations.forEach((e, i) => {
      expect(e.src).toBe(foundAt[i].map);
    });
    foundAt.forEach((e) => {
      const locPokemon = screen.getByText(e.location);
      expect(locPokemon).toBeInTheDocument();
    });
  });
  it('Testa se o usuário pode favotirar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();
    userEvent.click(checkFavorite);
    expect(checkFavorite).not.toBeChecked();
    const favorite = screen.getByText(/pokémon favoritado\?/i);
    expect(favorite).toBeInTheDocument();
  });
});
