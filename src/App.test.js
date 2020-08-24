import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getMetalGenres } from './services/music-genres';
import App from './App';

jest.mock('./services/music-genres');

describe("App component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  test("user can click the fetch button and get a list of metal music genres", async () => {
    const genreList = [
      "Gothic Metal",
      "Thrash Metal",
      "Heavy Metal"
    ];
    getMetalGenres.mockResolvedValueOnce(genreList);

    const { getByText, findByText, getAllByRole } = render(<App />);
    expect(getByText(/Metal Music Genres/i)).toBeVisible();

    fireEvent.click(getByText(/Fetch Some Metal Music/i));
    expect(await findByText(/loading/i)).toBeVisible();
    expect(getMetalGenres).toHaveBeenCalledTimes(1);

    const genreElsText = getAllByRole('listitem').map(el => el.textContent.trim());
    expect(genreElsText).toEqual(genreList);
  });

  test("user can see an error message if failed to get a list of metal music genres", async () => {
    getMetalGenres.mockRejectedValueOnce("Failed to fetch");

    const { getByText, findByText } = render(<App />);

    fireEvent.click(getByText(/Fetch Some Metal Music/i));
    expect(await findByText(/loading/i)).toBeVisible();
    expect(getMetalGenres).toHaveBeenCalledTimes(1);

    expect(await findByText(/failed to fetch/i)).toBeVisible();
  });
});
