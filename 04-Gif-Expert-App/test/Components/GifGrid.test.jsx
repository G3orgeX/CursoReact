import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";


jest.mock("../../src/hooks/useFetchGifs")
describe("Prueba en el componente GifGrid", () => {
    const category = 'one punch';
  test("should debe de mostrar el loading inicialmente", () => {
    useFetchGifs.mockReturnValue({
        images:[],
        isLoading:true
    })
    render(<GifGrid category={category}/>) 
    screen.debug();
    // expect(screen.getByText('Cargando...'));
    expect(screen.getByText(category));
});
test('debe de mostrar items cuando se cargan las imagenes mediante el usefetch', () => { 
    const gifs = [{
        id:'ABC',
        title: 'saitama',
        url:"https://localhost/saitama.jpg"
    },
    {
        id:'123',
        title: 'goku',
        url:"https://localhost/goku.jpg"
    }
]
    useFetchGifs.mockReturnValue({
        images:gifs,
        isLoading:true
    })
    render(<GifGrid category={category}/>);
    expect(screen.getAllByRole('img').length).toBe(2)
    screen.debug()
     })
});
