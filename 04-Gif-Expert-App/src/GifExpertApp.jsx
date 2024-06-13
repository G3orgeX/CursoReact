import React,{useState} from "react";
import { AddCategory } from "./components/AddCategory";

export const GifExpertApp = () => {
    
    const [categories, setCategories] = useState(['One Punch','DragonBall']);
    
    const onAddCategory = ()=>{
        setCategories(["One Piece",... categories ])        
    }
  return (
    <>    
    {/* Titulo */}
      <h1>GifExpertApp</h1>
 {/* Input */}
 <AddCategory setCategories={setCategories}/>
 {/* Listado de Gif */}
 
      <ol>
        {categories.map( category =>{
            return <li key={category}>{category}</li>
        } )}
        {/* <li></li> */}
      </ol>
    </>
  );
};
