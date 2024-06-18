import React, { useState, useEffect } from "react";
import { getGifs } from "../helpers/getGifs";
import { GifGridItem } from "./GifGridItem";
import { useFetchGifs } from "../hooks/useFetchGifs";

export const GifGrid = ({ category }) => {

  const {images,isLoading} = useFetchGifs(category);
  console.log({images,isLoading})
 

  return (
    <>
      <h3>{category}</h3>

      <div className="card-grid">
        {
        images.map((image) => (
          <GifGridItem key={image.id} {...image}/>
        ))
        }
      </div>
    </>
  );
};
