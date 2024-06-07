
import { render } from '@testing-library/react';
 // Ajusta la ruta al componente según sea necesario
import React from 'react';
import { FirstApp } from '../src/FirstApp';

describe('Pruebas en FirstApp', () => {
  test('debe de hacer match con el snapshot', () => {
    const title1 = 'Hola Soy Goku';
    const {container} =  render(<FirstApp title = {title1} subtitle={21}/>);
    console.log(container)
    expect(container).toMatchSnapshot();
  });
});