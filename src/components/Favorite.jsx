import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import StarIcon from '@material-ui/icons/Star';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

const FavoriteStyled = styled.span`
    color: ${props => props.favorite && "gold"};
    cursor: pointer;
    transition: all 150ms ease-in-out;
`

export default function Favorite({instrument, path}) {
    const [favorite, setFavorite] = useState(checkLocalStorage)

    //check stored favorites
    function checkLocalStorage() {
        // if any favorites in storage
        if(localStorage.getItem("favorites")) {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
            // if this path is stored
            if (storedFavorites.hasOwnProperty(path)) { // kolla detta
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    // upon favorite change -> set updated local storage object
    useEffect(() => {
        // if any favorites have been stored
        if(localStorage.getItem("favorites") !== null) {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
            
            // if favorited and not stored
            if (favorite && !storedFavorites.hasOwnProperty(path)) {
                storedFavorites[path] = instrument
                localStorage.setItem("favorites", JSON.stringify(storedFavorites))
            // if un-favorited
            } else if (!favorite) {
                delete storedFavorites[path];
                localStorage.setItem("favorites", JSON.stringify(storedFavorites))
            }
        } else {
            // if favorited and no favorites have been stored
            if (favorite) {
                localStorage.setItem("favorites", JSON.stringify({[path]: instrument}))
            }
        }
    }, [favorite])


    //if favorited -> false , if not favorited -> true
    function handleOnClick() {
        setFavorite(!favorite)
    }

    return (
        <FavoriteStyled onClick={handleOnClick} favorite={favorite}>
            {favorite ? <StarIcon fontSize="large"/> : <StarBorderOutlinedIcon fontSize="large"/>}
        </FavoriteStyled>
    )
}
