import "./Folder.css";

import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";

/*        
        mainItems={mainItems}
        items={items}
        setMainItems={setMainItems}
        setItems={setItems}
        filterItems={filterItems}
*/
import Card from "../UI/Card";

const Folder = (props) => {
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    setSelected((prev) => !prev);
    props.onSelect(props.id);
  };

  return (
    // <Card
    //   className={`folder ${selected && "selected"}`}
    //   onClick={toggleSelected}
    // >
    //   <FolderIcon className="folderIcon" />
    // </Card>
    <div>folder</div>
  );
};

export default Folder;
