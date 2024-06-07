import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";
import heroes, { owners } from "../../src/data/heroes";

describe('Pruebas en 08-imp-exp', () => { 
    test('getHeroById debe de retornar un un heroe por ID', () => {
     const id = 1;
    const hero = getHeroeById(id);
    expect(hero).toEqual({id: 1, name:'Batman', owner:'DC'})
 });
    test('getHeroeById debe de retornar undefined si no existe',
    () => {
        const id = 100;
        const hero = getHeroeById(id);
        expect(hero).toBeFalsy();
    })

    test('getHeroeByOwner debe de retornar un arreglo con los heroes de DC', () => {
        const owner = 'DC';
        const heroe = getHeroesByOwner(owner);
        expect(heroe).toEqual([{id:1,name:'Batman',owner:'DC'},
                            {id:3,name:'Superman',owner:'DC'},
                            {id:4,name:'Flash',owner:'DC'}]);                 
        expect(heroe).toEqual(heroes.filter((heroe) => heroe.owner === owner))
    })
    test('getHeroeByOwner debe de retornar un arreglo con los heroes de marvel', () => { 
        const owner = 'Marvel';
        const heroes = getHeroesByOwner(owner);
        console.log(heroes)
        expect(heroes.length).toBe(2);
        expect(heroes).toEqual(heroes.filter((hero)=> hero.owner === owner))
     })
 })