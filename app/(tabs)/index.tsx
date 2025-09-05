import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import ColorPicker, {
  ColorFormatsObject,
  HueSlider,
  OpacitySlider,
  Panel1,
  Swatches,
} from "reanimated-color-picker";

const LEDModes: string[] = ["solid", "off"];
const customSwatches: string[] = [
  "#ff00ff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffffff",
  "#ffff00",
];

export default function HomeScreen() {
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [resultColor, setResultColor] = useState(customSwatches[0]);
  const currentColor = useSharedValue(customSwatches[0]);

  const onColorChange = (color: ColorFormatsObject) => {
    "worklet";
    currentColor.value = color.hex;
  };

  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
  };

  const handleModeChange = (value: string) => {
    console.log(value);
    setSelectedMode(value);
  };

  const handleAPIcall = () => {};

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: currentColor,
        dark: currentColor,
      }}>
      {/* TITLE */}
      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">LED control</ThemedText>
      </ThemedView> */}

      <View>
        <Picker selectedValue={selectedMode} onValueChange={handleModeChange}>
          {LEDModes.map((mode) => (
            <Picker.Item label={mode} value={mode} key={mode} />
          ))}
        </Picker>
      </View>
      <View>
        {/* <ThemedText>Selected Color: {currentColor}</ThemedText> */}

        <ColorPicker
          value={resultColor}
          sliderThickness={25}
          thumbSize={24}
          thumbShape="circle"
          onChange={onColorChange}
          onCompleteJS={onColorPick}
          style={styles.picker}
          boundedThumb>
          <Panel1 style={styles.panelStyle} />
          <HueSlider style={styles.sliderStyle} />
          <OpacitySlider style={styles.sliderStyle} />

          <Swatches
            style={styles.swatchesContainer}
            swatchStyle={styles.swatchStyle}
            colors={customSwatches}
          />

          {/* <PreviewText style={styles.previewTxt} colorFormat="hwba" /> */}
        </ColorPicker>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: "Quicksand",
    fontWeight: "bold",
    marginVertical: 20,
  },
  picker: {
    gap: 20,
  },
  panelStyle: {
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  previewTxt: {
    color: "#707070",
    fontFamily: "Quicksand",
  },
  swatchesContainer: {
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
