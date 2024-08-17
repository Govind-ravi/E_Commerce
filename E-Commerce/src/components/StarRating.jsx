import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";

const StarRating = ({rating})=>{

    const stars = [];
    for(let i=1; i<=5; i++){
        if(i<=rating){
            stars.push(<IoStar key={i} color="gold" size={20}/>)
        }else if(i-rating<0.5){
            stars.push(<IoStarHalf key={i} color="gold" size={20}/>)
        }else {
            stars.push(<IoStarOutline key={i} color="gold" size={20}/>)
        }
    }

    return (
        <>
        {stars}
        </>
    )
}

export default StarRating;