import React from 'react';
import { shallow, mount, render, act } from 'enzyme';
import { getMetalGenres } from './services/music-genres';
import App from './App';

jest.mock('./services/music-genres');

describe("App component", () => {
  const genreList = [
    "Gothic Metal",
    "Thrash Metal",
    "Heavy Metal"
  ];

  beforeEach(() => {
    getMetalGenres.mockResolvedValue(genreList);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render without throwing an error', () => {
    expect(shallow(<App />).contains(<h1> Metal Music Genres </h1>)).toBe(true);
  });

  it('calls the getMetalGenres properly', async () => {
    const wrapper = mount(<App/>);
    wrapper.find('.btn-container button').simulate('click');
    expect(getMetalGenres).toHaveBeenCalledTimes(1);
  });
});