import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import data from "../data"
import "../components/Product.css";


export default function Product(props){
    
    let mapeo = data.products.filter(ele => ele.id == props.match.params.id)
    // console.log(props.match.params.id)
    //console.log(mapeo)
    
    
    return( 
        <div>
            {
                console.log(mapeo)
               
            }
            {/* <div className="Name">
             <h1>{mapeo.name}</h1>
             </div>
             <div className="image">
             <img src={mapeo[0].image}></img>
             </div>
             <div className="Propiedades">
             <h5>{mapeo[0].description}</h5>
             <h7>{mapeo[0].price}</h7> 
             <h7>{mapeo[0].stock}</h7> 
             </div>

              */}
            
        </div>
    )
}