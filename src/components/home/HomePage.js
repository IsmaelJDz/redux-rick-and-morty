import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import { removeCharacterAction, addToFavoritesAction, deleteCharacterFav } from "../../redux/charsDuck";

function Home({ chars, addToFavoritesAction ,removeCharacterAction, alert, alert_success }) {
  function renderCharacter() {
    let char = chars[0];
    return <Card hide rightClick={(id) => addFav(id)} leftClick={nextCharacter} {...char} />;
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
      {alert && <div className={styles.alert_warning}>El Personaje ya esta en tu lista de favoritos.</div>}
      {alert_success && <div className={styles.alert_success}>El Personaje se ha agregado a tu lista de favoritos.</div>}
    </div>
  );
}

function mapState(state) {
  return {
    chars: state.charsReducer.array,
    alert: state.charsReducer.alert,
    alert_success: state.charsReducer.alert_success,
  };
}

export default connect(mapState, { addToFavoritesAction, removeCharacterAction, deleteCharacterFav })(Home);
