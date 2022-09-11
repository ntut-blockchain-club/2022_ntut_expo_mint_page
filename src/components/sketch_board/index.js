import React, { Component } from "react";
import { render } from "react-dom";
import "./index.scss";
import CanvasDraw from "react-canvas-draw";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ReactLoading from "react-loading";
import ntut_logo from "./logo.png";

// function add_logo(props) {
//   document.querySelectorAll("canvas").forEach((canvas) => {
//     let ctx = canvas.getContext('2d');
//     const image = new Image();
//     image.src = ntut_logo;
//     image.onload = () => {
//       ctx.drawImage(image, 0, 0);
//       props.set_canvas(!props.canvas);
//       console.log()
//     };
//   });
// }
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function submit(img_dataUri, name, set_preview_count) {

  fetch("https://ntut-expo-api.ntutblockchain.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      image_dataUri: img_dataUri,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      let uuid = data.uuid;
      let data_total = [];
      let new_data = JSON.stringify({
        uuid: uuid,
        name: name,
        image_dataUri: img_dataUri,
        minted: false,
      });
      data_total.push(new_data);

      let old_data = window.localStorage.getItem("local_data");
      if (old_data) {
        old_data = JSON.parse(old_data);
        old_data.push(new_data);
        window.localStorage.setItem("local_data", JSON.stringify(old_data));
      } else {
        window.localStorage.setItem("local_data", JSON.stringify(data_total));
      }
      set_preview_count((prev) => prev + 1);
    });
}

function submit_with_uuid(uuid, name, set_preview_count) {
  let data_total = [];
  let img_dataUri =
    "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/images/" +
    uuid +
    ".png";
  let new_data = JSON.stringify({
    uuid: uuid,
    name: name,
    image_dataUri: img_dataUri,
    minted: false,
  });

  let old_data = window.localStorage.getItem("local_data");
  if (old_data) {
    old_data = JSON.parse(old_data);
    old_data.push(new_data);
    window.localStorage.setItem("local_data", JSON.stringify(old_data));
  } else {
    window.localStorage.setItem("local_data", JSON.stringify(data_total));
  }
  set_preview_count((prev) => prev + 1);
}

const Popup_Modal = (props) => {

  const [name, set_name] = React.useState("");
  return (
    <Popup
      open={props.open}
      onClose={props.onClose}
      closeOnDocumentClick={false}
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> 提交 </div>
          <div className="content">
            <img src={props.img_data} />
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            className="name_input"
            onChange={(e) => {
              set_name(e.target.value);
            }}
          />
          <h1>{name}</h1>
          <div className="actions">
            <button
              className="submit"
              onClick={() => {
                submit(props.img_data, name, props.set_preview_count);
                close();
                set_name("");
                console.log("modal closed ");
              }}
            >
              submit
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

const Submit_with_uuid_Popup = (props) => {
  const [name, set_name] = React.useState("");
  const [uuid, set_uuid] = React.useState("");
  return (
    <Popup
      trigger={(open) => <button className="button">新增 uuid</button>}
      modal
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> 提交 </div>

          <input
            type="text"
            placeholder="Enter your uuid"
            className="uuid_input"
            onChange={(e) => {
              set_uuid(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Enter your name"
            className="name_input"
            onChange={(e) => {
              set_name(e.target.value);
            }}
          />
          <h1>{name}</h1>
          <div className="actions">
            <button
              className="submit"
              onClick={() => {
                submit_with_uuid(uuid, name, props.set_preview_count);
                close();
                set_name("");
                console.log("modal closed ");
              }}
            >
              submit
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

class Board extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 5,
    lazyRadius: 0,
    background_img:
      "https://ntut-blockchain-expo-storage.sgp1.digitaloceanspaces.com/background/background_1.png",
    imgs: [
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_10.png",
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_9.png",
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_8.png",
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_7.png",
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_6.png",
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_5.png",
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_4.png",
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_3.png",
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_2.png",
      "https://ntut-blockchain-expo-storage.sgp1.cdn.digitaloceanspaces.com/background/background_1.png",
    ],
    img_num: 0,
    canvas: false,
  };
  
  render() {
    return (
      <div>
        <Popup_Modal
          canvas={this.saveableCanvas}
          set_img_data={this.props.set_img_data}
          img_data={this.props.img_data}
        />
        <CanvasDraw
          ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
          brushColor={this.props.brush_color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
          clampLinesToDocument
          imgSrc={this.state.background_img}
        />
        <div className="action">
          <div>
            <button onClick={() => this.saveableCanvas.undo()}>重做</button>

            <button
              onClick={() => {
                if (this.state.img_num === 10) {
                  this.state.img_num = 0;
                }

                let img = "";
                let imgs = this.state.imgs;
                // for (let i = 0; i < imgs.length; i++) {
                //   if (this.state.background_img !== imgs[i]) {
                //     img = imgs[i];
                //   }
                // }

                this.state.img_num += 1;
                img = imgs[this.state.img_num];

                this.setState({ background_img: img });

                this.setState({
                  backgroundImg: img,
                });
              }}
            >
              背景圖變更
            </button>

            <Popup
              trigger={(open) => <button className="button">筆刷設定</button>}
              position="bottom center"
            >
              <input
                type="color"
                name="strokeColor"
                className="form-control"
                id="strokeColorInput"
                value={this.props.brush_color}
                title="Choose stroke color"
                onChange={(e) => {
                  this.props.set_brush_color(e.target.value);
                }}
              ></input>
              <input
                type="range"
                min={0.5}
                max={10}
                step={0.5}
                value={this.state.brushRadius}
                onChange={(e) => {
                  this.setState({ brushRadius: e.target.value });
                }}
              />
            </Popup>
          </div>
          <div className="submit">
            <button
              onClick={() => {
                document.querySelectorAll("canvas").forEach((canvas) => {
                  let ctx = canvas.getContext('2d');
                  const image = new Image();
                  image.src = ntut_logo;
                  image.onload = () => {
                    ctx.drawImage(image, 0, 0, 133, 57);
                  };
                });

                sleep(100).then(() => {
                   
                this.props.set_img_data(this.saveableCanvas.getDataURL());
                this.props.set_pop_open(true);
                console.log(this.props.pop_open);
                });
              }}
            >
              提交
            </button>
            <Submit_with_uuid_Popup
              set_preview_count={this.props.set_preview_count}
            />
          </div>
        </div>
      </div>
    );
  }
}

function Sketch_board(props) {
  const [img_data, set_img_data] = React.useState("");
  const [pop_open, set_pop_open] = React.useState(false);
  const closeModal = () => set_pop_open(false);
  const [brush_color, set_brush_color] = React.useState("#ffc600");

  return (
    <div className="sketch_board">
      <Board
        set_img_data={set_img_data}
        img_data={img_data}
        set_pop_open={set_pop_open}
        pop_open={pop_open}
        brush_color={brush_color}
        set_brush_color={set_brush_color}
        set_preview_count={props.set_preview_count}
      />

      {/* <input type="submit" value="Submit" onClick={() => submit(img_data)} /> */}
      <Popup_Modal
        open={pop_open}
        onClose={closeModal}
        img_data={img_data}
        set_preview_count={props.set_preview_count}
      />
    </div>
  );
}

export default Sketch_board;
