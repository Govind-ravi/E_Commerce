import APIs from "../APIs";

export const fetchProductById = async (id)=>{
    try{    
        const response = await fetch(`${APIs.fetchProductById.url}/${id}`);
        
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error fetching product:", error);
        return null;
    }
}

