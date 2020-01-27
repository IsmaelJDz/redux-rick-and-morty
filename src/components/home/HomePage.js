import React, { useState, useEffect } from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import { removeCharacterAction, addToFavoritesAction } from "../../redux/charsDuck";

function Home({ chars, addToFavoritesAction ,removeCharacterAction }) {
  function renderCharacter() {
    let char = chars[0];
    return <Card rightClick={(id) => addFav(id)} leftClick={nextCharacter} {...char} />;
  }

  function nextCharacter() {
    removeCharacterAction();
  }

  function addFav(id) {
    addToFavoritesAction(id);
  }

  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  );
}

function mapState(state) {
  return {
    chars: state.charsReducer.array
  };
}

export default connect(mapState, { addToFavoritesAction, removeCharacterAction })(Home);
