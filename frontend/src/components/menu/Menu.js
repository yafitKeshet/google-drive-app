import { Menu as MenuL, MenuItem, Slide, Button, Box } from "@mui/material";
import React, { useState } from "react";

const Menu = (props) => {
  const [anchor, setAnchor] = useState(null);

  const [selected, setSelected] = useState(-1);

  const onMenuItemClick = (event, index, onClick) => {
    setAnchor(null);
    setSelected(index);
    onClick();
  };

  const openMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  return (
    <Box>
      <Button onClick={openMenu} color="primary" variant="contained">
        ...
      </Button>
      <MenuL
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={closeMenu}
        keepMounted
        TransitionComponent={Slide}
        PaperProps={{
          style: {
            maxHeight: 40 * 4,
            width: "20ch",
          },
        }}
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={(event) => onMenuItemClick(event, index, option.onClick)}
            selected={index === selected}
          >
            {option.data}
          </MenuItem>
        ))}
      </MenuL>
    </Box>
  );
};

export default Menu;