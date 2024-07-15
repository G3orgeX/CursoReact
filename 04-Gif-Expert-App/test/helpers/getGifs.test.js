import {getGifs} from '../../src/helpers/getGifs';
describe("Pruebas en getGifs ()", () => {
  test("should Retornar un arreglo de gif", async () => {
    const gifs = await getGifs('One Punch');
    // console.log(gifs);
    // controlo si el valor es mayor a 0
    expect(gifs.length).toBeGreaterThan(0);
    expect(gifs[0]).toEqual({
        id:expect.any(String),
        title:expect.any(String),
        url:expect.any(String),
    })
  });  
});
