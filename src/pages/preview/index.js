import Preview_card from "../../components/preview_card";
import Metamask_connect from "../../components/Connect";
import React from "react";
function Preview() {
  const [finish, set_finish] = React.useState(false);
  const local_data = JSON.parse(window.localStorage.getItem("local_data"));
  console.log(finish)
  return (
    <div>
      <Metamask_connect />
      {local_data ? (
        local_data.map((data, index) => {
          data = JSON.parse(data);
          return (
            <Preview_card
              key={index}
              img_data={data.image_dataUri}
              name={data.name}
              uuid={data.uuid}
              minted={data.minted}
              set_finish={set_finish}
              finish={finish}
            />
          );
        })
      ) : (
        <div />
      )}
      {/* </div>
            local_data.map((data) => {
                data = JSON.parse(data);
                console.log(data.uuid)
                return <Preview_card img_data={data.image_dataUri} name={data.name} uuid={data.uuid} />
            
            }
            )} */}
    </div>
  );
}

export default Preview;
