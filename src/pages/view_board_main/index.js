import React from "react";
import "./index.scss";
import img from "./06b1132c-f0d8-4f37-8d22-35d89e422800.png";

function View_board_main(props) {
  const [img_data, set_img_data] = React.useState("");
  const [pop_open, set_pop_open] = React.useState(false);
  const closeModal = () => set_pop_open(false);
  const [brush_color, set_brush_color] = React.useState("#ffc600");
  return (
    <div className="view_board_main">
        <img src={img} style={{
            top: "95%",
            left: "99%",
            position: "relative",
            width: "50px",
        }}/>
    </div>
  );
}

export default View_board_main;