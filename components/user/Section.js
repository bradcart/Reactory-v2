import { useNode } from "@craftjs/core";
import { StyledSection } from "../styled/StyledSection";
import { StyledLabel } from "../styled/settings/Label";
import { StyledSlider } from "../styled/settings/Slider";
import { StyledToggleGroup } from "../styled/settings/ToggleGroup";
import { ColorPicker } from "../styled/settings/ColorPicker";

export const Section = ({
  size,
  background,
  flex,
  direction,
  justify,
  align,
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  //VARIANTS: FLEX, FLEX DIRECTION, ALIGN ITEMS, JUSTIFY CONTENT, BORDER, BORDER RADIUS
  //STYLE PROP: WIDTH, HEIGHT, PADDING, BGCOLOR
  return (
    <StyledSection
      ref={(ref) => connect(drag(ref))}
      size={size}
      flex
      //   direction={direction}
      justify={justify}
      align={align}
      style={{
        backgroundColor: background,
      }}
    >
      {children}
    </StyledSection>
  );
};

export const SectionSettings = () => {
  const {
    size,
    justify,
    align,
    background,
    actions: { setProp },
  } = useNode((node) => ({
    size: node.data.props.size,
    justify: node.data.props.justify,
    align: node.data.props.align,
    background: node.data.props.background,
  }));

  return (
    <>
      <StyledLabel>Size</StyledLabel>
      <StyledToggleGroup
        currentValue={size}
        onValueChange={(value) => setProp((props) => (props.size = value))}
        valueOne="sm"
        labelOne="Small"
        valueTwo="md"
        labelTwo="Medium"
        valueThree="lg"
        labelThree="Large"
      />
      <StyledLabel>Justify</StyledLabel>
      <StyledToggleGroup
        currentValue={justify}
        onValueChange={(value) => setProp((props) => (props.justify = value))}
        valueOne="start"
        labelOne="Left"
        valueTwo="center"
        labelTwo="Center"
        valueThree="end"
        labelThree="Right"
      />
      <StyledLabel>Align</StyledLabel>
      <StyledToggleGroup
        currentValue={align}
        onValueChange={(value) => setProp((props) => (props.align = value))}
        valueOne="start"
        labelOne="Top"
        valueTwo="center"
        labelTwo="Center"
        valueThree="end"
        labelThree="Bottom"
      />
      <ColorPicker
        onClick={(e) => setProp((props) => (props.background = e.target.value))}
      />
    </>
  );
};

// We export this because we'll be using this in the Card component as well
export const SectionDefaultProps = {
  background: "#ffffff",
  size: "md",
  justify: "center",
  align: "center",
};

Section.craft = {
  displayName: "Section",
  props: SectionDefaultProps,
  related: {
    settings: SectionSettings,
  },
};