import React, { useState, useEffect } from "react";
import { Editor, Frame, Element } from "@craftjs/core";
// import { Layers } from "@craftjs/layers";

import { Page } from "../components/user/Page";
import { Section } from "../components/user/Section";
import { Box } from "../components/user/Box";
import { Button } from "../components/user/Button";
// import { Card, CardTop, CardBottom } from "../components/user/Card";
import { Card, CardText, CardButtons } from "../components/user/Card";
import { Text } from "../components/user/Text";
import { Image } from "../components/user/Image";

import { Viewport } from "../components/interface";
import { RenderNode } from "../components/interface/RenderNode";
import { styled } from "../stitches.config";
// import fetchProjectData from "../components/utils/fetchProjectData";

// const texture = "/texture.png";

const ViewportOverlay = styled("div", {
  display: "none",
  width: "100%",
  height: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 9999,
  px: "$2",
  backgroundColor: "rgba(0, 0, 0, 0.87)",
  color: "$white",
  textAlign: "center",
  fontFamily: "$grifter",
  fontSize: "42px",
  "> span": {
    mt: "$2",
    fontFamily: "$ddin",
    fontSize: "24px",
  },
  "@media(max-width: 1365px)": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const ViewportWarning = () => (
  <ViewportOverlay>
    Your browser is too small
    <span>Resize your browser to be at least 1366px to use this demo.</span>
  </ViewportOverlay>
);

export default function Edit() {
  /* const [json, setJson] = useState(null);

  const data = FetchProjectData();

  useEffect(() => {
    setJson(data);
  }, [data]); */

  return (
    <Editor
      resolver={{
        Page,
        Card,
        CardText,
        CardButtons,
        Button,
        Text,
        Box,
        Image,
        Section,
      }}
      onRender={RenderNode}
    >
      <ViewportWarning />
      {/* {json ? ( */}
      <Viewport>
        <Frame>
          <Element is={Page} canvas>
            <Element
              is={Section}
              id="canvas__intro-section"
              canvas
              justify="spaceBetween"
              padding={10}
            >
              <Element
                is={Text}
                id="canvas__intro-section-title"
                text="Reactory is a single-page website builder with a drag and drop interface."
                activeFontFamily="Poppins"
                fontSize={50}
                fontWeight={700}
                lineHeight={60}
                width={62}
              />
              <Element
                is={Text}
                id="canvas__intro-section-paragraph"
                text={`Built in Next.js.
                  <br />
                Styled with Stitches and Radix-UI.`}
                activeFontFamily="Noto Serif"
                fontSize={18}
                fontWeight={400}
                lineHeight={36}
                width={32}
              />
            </Element>
            <Element
              is={Section}
              id="canvas__card-section"
              canvas
              justify="left"
              padding={0}
            >
              <Element is={Card} id="canvas__card" canvas />
            </Element>
          </Element>
        </Frame>
      </Viewport>
      {/* ) : null} */}
      {/* <Layers /> */}
    </Editor>
  );
}
