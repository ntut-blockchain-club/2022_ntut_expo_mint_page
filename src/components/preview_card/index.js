import mint from "../mint/index.js";
import "./index.scss";
import { useState } from "react";
function Preview_card(props) {
  let minted = "";
  if (props.minted) {
    minted = "minted";
  } else {
    minted = "";
  }
  return (
    <div className={"preview_card " + minted}>
      <img src={props.img_data} />
      <div className="detail">
        <h2>{props.name}</h2>
        <h3>{props.uuid}</h3>
      </div>
      {props.minted ? (
        <div />
      ) : (
        <button
          onClick={() => {
            props.set_finish(mint(props.uuid, props.set_finish, props.finish));
          }}
        >
          Mint
        </button>
      )}
    </div>
  );
}

export default Preview_card;
