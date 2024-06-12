import React,{useState} from "react";

export const GifExpertApp = () => {
   
    const [categories, setCategories] = useState(['One Punch','DragonBall']);
    
    const onAddCategory = ()=>{}
  return (
    <>    
    {/* Titulo */}
      <h1>GifExpertApp</h1>
 {/* Input */}
 {/* Listado de Gif */}
 <button>Agregar</button>
      <ol>
        {categories.map( category =>{
            return <li key={category}>{category}</li>
        } )}
        {/* <li></li> */}
      </ol>
    </>
  );
};
