import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import {MoonIcon,SunIcon} from "@chakra-ui/icons"

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    />
  );
};

export default ColorModeSwitch;