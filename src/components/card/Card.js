import React from 'react'
import styles from './card.module.css'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux";
import { deleteCharacterFav } from '../../redux/charsDuck'

let rick = "https://rickandmortyapi.com/api/character/avatar/1.jpeg"


export default function Card({
    name, image, rightClick, leftClick, hideFav, id, hide
}) {

    const dispatch = useDispatch();
    function onClick(side) {
    //return () => console.log(side)
    dispatch(deleteCharacterFav(side))
}

    return (
        <div className={styles.container} id={id}>
            <div className={styles.card}>
                <img alt="rick" src={image} />
                <p className={styles.name}>
                    {name}
                </p>
                <div className={styles.actions}> 
                    {!hide &&
                        <div
                            onClick={() => {onClick(id)}}
                            className={styles.left}>
                            <FontAwesome
                                name="thumbs-down"
                                size="2x"
                            />
                        </div>
                    }
                    {!hideFav &&
                        <div
                            onClick={() => {rightClick(id)}}
                            className={styles.right}>
                            <FontAwesome
                                name="heart"
                                size="2x"
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    leftClick: PropTypes.func,
    rightClick: PropTypes.func,
}

Card.defaultProps = {
    name: "Rick Sanches",
    image: rick,
}