import React from 'react';
import { render, fireEvent, waitFor, waitForElement, wait, waitForDomChange } from '@testing-library/react';
import { getMetalGenres } from './services/music-genres';
import App from './App';

jest.mock('./services/music-genres');

describe("App component", () => {
  let utils;
  const genreList = [
    "Gothic Metal",
    "Thrash Metal",
    "Heavy Metal"
  ];

  beforeEach(() => {
    utils = render(<App />);
    getMetalGenres.mockResolvedValue(genreList);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("shows header for the metal genres", () => {
    const { getByText } = utils;
    expect(getByText(/Metal Music Genres/i)).toBeVisible();
  });

  it("shows button to fetch metal genres", () => {
    const { getByText } = utils;
    expect(getByText(/Fetch Some Metal Music/i)).toBeVisible();
  });

  it("can click on the fetch button and will show a loading text", async () => {
    const { getByText, findByText } = utils;
    fireEvent.click(getByText(/Fetch Some Metal Music/i));
    expect(await findByText(/loading/i)).toBeVisible();
  });

  it("will call the getMetalGenres function properly when fetch button is clicked", async () => {
    const { getByText } = utils;
    fireEvent.click(getByText(/Fetch Some Metal Music/i));
    expect(getMetalGenres).toHaveBeenCalledTimes(1);
  });

  it("will show a list of metal genres when fetch button was clicked", async () => {
    const { getByText, findByText, getAllByRole } = utils;
    fireEvent.click(getByText(/Fetch Some Metal Music/i));
    expect(await findByText(/Gothic Metal/i)).toBeVisible();
    const listElsText = getAllByRole('listitem').map(el => el.textContent.trim());
    expect(listElsText).toEqual(genreList);
  });

  it("will show an error message if failed to fetch a list of metal genres", async () => {
    getMetalGenres.mockRejectedValueOnce("Failed to fetch");
    const { getByText, findByText, getAllByRole } = utils;
    fireEvent.click(getByText(/Fetch Some Metal Music/i));

    expect(await findByText(/failed to fetch/i)).toBeVisible();
  });
});
