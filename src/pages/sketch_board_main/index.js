import Home from "../home";
import Sketch_board from "../../components/sketch_board";
import Preview from "../preview";
import "./index.scss";
const Sketch_board_main = (props) => (
  <div className="main">
    <Home />
    <Sketch_board
      preview_count={props.preview_count}
      set_preview_count={props.set_preview_count}
    />
    <Preview
      preview_count={props.preview_count}
      set_preview_count={props.set_preview_count}
    />
  </div>
);

export default Sketch_board_main;