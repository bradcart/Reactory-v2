import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
// import styled from "styled-components";
import { styled } from "../../stitches.config";

const IndicatorDiv = styled("div", {
  height: 30,
  mt: -29,
  fontSize: "12px",
  lineHeight: "12px",
  p: "2px",
  color: "#f1f4f3",
  backgroundColor: "#1b1b1b",
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& svg": {
    fill: "$white",
    width: 15,
    height: 15,
  },
});

const Btn = styled("a", {
  p: 0,
  opacity: 0.9,
  display: "flex",
  alignItems: "center",
  "> div": {
    position: "relative",
    top: "-50%",
    left: "-50%",
  },
});

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((state) => ({
    isActive: state.nodes[id].events.selected,
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef(<HTMLDivElement />);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    document
      .querySelector(".craftjs-renderer")
      .addEventListener("scroll", scroll);

    return () => {
      document
        .querySelector(".craftjs-renderer")
        .removeEventListener("scroll", scroll);
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <IndicatorDiv
              ref={currentRef}
              //   className="px-2 py-2 text-white bg-primary fixed flex items-center"
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999,
              }}
            >
              <h2
                // className="flex-1 mr-4"
                style={{ flex: 1, marginRight: "4px" }}
              >
                {name}
              </h2>
              {moveable ? (
                <Btn
                  // className="mr-2 cursor-move"
                  style={{ marginRight: "2px", cursor: "move" }}
                  ref={drag}
                >
                  {/* <Move /> */}1
                </Btn>
              ) : null}
              {id !== ROOT_NODE && (
                <Btn
                  // className="mr-2 cursor-pointer"
                  style={{ marginRight: "2px", cursor: "pointer" }}
                  onClick={() => {
                    actions.selectNode(parent);
                  }}
                >
                  {/* <ArrowUp /> */}2
                </Btn>
              )}
              {deletable ? (
                <Btn
                  className="cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  {/* <Delete /> */}3
                </Btn>
              ) : null}
            </IndicatorDiv>,
            document.querySelector(".page-container")
          )
        : null}
      {render}
    </>
  );
};
