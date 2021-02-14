import React, { useState } from "react";
import { Box , Stack, Text } from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
const StaticRating = React.forwardRef(
  ({ size, scale, fillColor, strokeColor, initialRating }, ref) => {
    const [rating, setRating] = useState(initialRating);
    const buttons = [];

    const RatingIcon = ({ fill }) => {
      return (
        <StarIcon
          
          size={`${size}px`}
          color={fillColor}
          stroke={strokeColor}
          fillOpacity={fill ? "100%" : "0"}
        />
      );
    };

    const RatingButton = ({ idx, fill }) => {
      return (
        <Box
          as="button"
          aria-label={`Rate ${idx}`}
          height={`${size}px`}
          width={`${size}px`}
          variant="unstyled"
          mx={1}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} />
        </Box>
      );
    };

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }

    return (
      <Stack mb='8' isInline mt={8} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
      </Stack>
    );
  }
);

StaticRating.displayName = "StaticRating";

export default StaticRating;