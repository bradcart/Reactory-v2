import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import copy from "copy-to-clipboard";
import { styled } from "../../../stitches.config";
import { StyledBox } from "../../styled/StyledBox";
import { StyledHeading } from "../../styled/StyledHeading";

const TopbarButton = styled("button", {
  px: "$3",
  py: "$2",
  mx: "$2",
  backgroundColor: "$black100",
  color: "$white",
  fontFamily: "$oskari",
  fontSize: "$4",
  textTransform: "uppercase",
  borderWidth: "2px",
  borderColor: "$gray700",
  borderStyle: "outset",
  borderRadius: "$1",
  transition: "$default",
  "&:hover": {
    backgroundColor: "$white",
    color: "$black100",
  },
});

export const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [stateToLoad, setStateToLoad] = useState("");

  return (
    <StyledBox
      flex
      align="center"
      css={{
        py: "2.5%",
        px: 40,
        height: "5vh",
        backgroundColor: "$black100",
        borderBottom: "1px solid $black200",
        // display: "flex",
        // alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* <FormControl display="flex" alignItems="center">
          <Switch
            id="editor-enabled"
            colorScheme="brand"
            isChecked={enabled}
            onChange={() =>
              actions.setOptions((options) => (options.enabled = !enabled))
            }
          />
          <FormLabel htmlFor="editor-enabled" mb={0} ml={1} color="white">
            Enabled
          </FormLabel>
        </FormControl> */}
      <StyledHeading
        css={{
          mx: "$2",
          color: "$white",
          fontFamily: "$hki",
          fontSize: "$8",
          transform: "rotate(0.75deg)",
          userSelect: "none",
          WebkitTapHighlightColor: "rgba(0,0,0,0)",
        }}
      >
        REACTORY
      </StyledHeading>
      <StyledBox css={{ display: "flex" }}>
        <TopbarButton
          onClick={() => {
            const json = query.serialize();
            copy(lz.encodeBase64(lz.compress(json)));
            // toggleAlert(true);
          }}
        >
          Copy current state
        </TopbarButton>
        <TopbarButton onClick={() => setDialogOpen(true)}>Load</TopbarButton>
      </StyledBox>
      {dialogOpen ? (
        <StyledBox
          // px={3}
          // py={3}
          // bg="black"
          // flexDirection="column"
          css={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <h2>Load state</h2>

          <div>
            <input
              placeholder='Paste the contents that was copied from the "Copy Current State" button'
              value={stateToLoad}
              onChange={(e) => setStateToLoad(e.target.value)}
            />
          </div>

          <div>
            <StyledBox css={{ display: "flex" }}>
              <TopbarButton onClick={() => setDialogOpen(false)}>
                Cancel
              </TopbarButton>
              <TopbarButton
                onClick={() => {
                  setDialogOpen(false);
                  const json = lz.decompress(lz.decodeBase64(stateToLoad));
                  actions.deserialize(json);
                }}
              >
                Load
              </TopbarButton>
            </StyledBox>
          </div>
        </StyledBox>
      ) : null}
    </StyledBox>
  );
};
