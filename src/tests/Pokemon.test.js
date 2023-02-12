import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
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

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um carc com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu).toHaveTextContent(PIKACHU.name);
    const eletric = screen.getByTestId('pokemon-type');
    expect(eletric).toHaveTextContent(PIKACHU.type);
    const { averageWeight: { value, measurementUnit } } = PIKACHU;
    const pokemoWeight = screen.getByTestId('pokemon-weight');
    expect(pokemoWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const imgPikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgPikachu).toBeInTheDocument();
    expect(imgPikachu.src).toBe(PIKACHU.image);
  });
  it('Testa se o card do Pokémon indidica na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
  });
  it('Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu).toBeInTheDocument();
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const titleLocation = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(titleLocation).toBeInTheDocument();
  });
  it('Testa também se a URL exibida no navegador muda para "/pokemon/<id>, onde <id> do Pokemon cujos detalhes se deseja ver"', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemon/${PIKACHU.id}`);
  });
  it('Testa se existe um ícone de estrela nos Pokemon favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const favoringPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoringPokemon);
    expect(favoringPokemon).toBeChecked();
    const pikachuFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(pikachuFavorite).toBeInTheDocument();
    expect(pikachuFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
