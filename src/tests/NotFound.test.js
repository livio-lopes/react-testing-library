import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste pagina NotFound', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/bode'); });
    const titleNotFound = screen.getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(titleNotFound).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/bode'); });
    const gifNotFound = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(gifNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
