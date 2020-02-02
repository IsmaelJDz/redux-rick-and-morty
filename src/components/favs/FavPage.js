import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { connect } from "react-redux"

function FavPage({ characters = [0], deleteCharacter }) {
    function renderCharacter(char, i) {
        return (
            <Card hideFav {...char} key={i} id={char.id} />
        )
    }
    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {characters.map(renderCharacter)}
            {!characters.length && <h3>No hay personajes agregados</h3>}
            {deleteCharacter && <div className={styles.alert_success}>El personaje ha sido eliminado de favoritos.</div>} 
        </div>
    )
}

function mapState({charsReducer}) {
    return {
        characters: charsReducer.favorites,
        deleteCharacter: charsReducer.alert_delete
    }
}

export default connect(mapState, null)(FavPage);