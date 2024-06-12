// import { render } from "@testing-library/react";
// // Ajusta la ruta al componente según sea necesario
// import React from "react";
// import { FirstApp } from "../src/FirstApp";

// describe("Pruebas en FirstApp", () => {
//   test("debe de hacer match con el snapshot", () => {
//     const title1 = "Hola Soy Goku";
//     const { container } = render(<FirstApp title={title1} subtitle={21} />);
//     console.log(container);
//     expect(container).toMatchSnapshot();
//   });
// });

import {render} from "@testing-library/react"
import { FirstApp } from "../src/FirstApp";
describe('pruebas en <FirstApp/>', () => {
/*     test('debe hacer match con el snapshot', () => { 
        const title = 'Hola, soy Kakaroto';
        const {container} = render( <FirstApp title={title} /> );
        expect(container).toMatchSnapshot();
     }) */
     test('debe mostrar el titulo en un h1', () => { 
        const title = 'Hola, soy Kakaroto';
        const {container, getByText,getByTestId} = render( <FirstApp title={title} /> );
        expect(getByText(title)).toBeTruthy();
        expect(getByTestId('test-title').innerHTML).toContain(title);
/*         const h1 = container.querySelector('h1');
        expect(h1.innerHTML).toContain(title) */
      })
      // test('debe de mostrar el subtitulo mostrado por props ', () => {
      //   const title = "Hola, soy otro pj";
      //   const subTitle = "Soy un subtitulo";
      //   const {getAllByText} = render( <FirstApp title={title} subtitle={subTitle}/> );
      //   expect(getAllByText(subTitle)).toBeTruthy();
      //   expect(getAllByText(subTitle).length).toBe(2);
      //  })
    
});