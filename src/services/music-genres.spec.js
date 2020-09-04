import { getMetalGenres } from './music-genres';

/**
 * This is a very simple test which is out of the scope of RTL article in here : https://blog.bitsrc.io/react-testing-library-the-modern-way-to-test-react-components-778ef578d0d9
 * In a more realistic enviorenment this will be a service which wil use an http agent and hence there will be a mocking. 
 */
describe('getMetalGenres', () => {
    it('should return a list of metal music genres', async () => {
        const result = await getMetalGenres();
        expect(result).toEqual([
            "Thrash metal",
            "Glam metal",
            "Gothic metal",
            "Grindcore",
            "Power metal",
            "Blackened death metal",
            "Death metal",
            "Doom metal",
            "Celtic metal",
            "Folk metal",
            "Nu metal"
        ]);
    });
});