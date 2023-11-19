import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IWheelData {
  angle: number;
  transition: number;
  stopFlag: boolean;
  defaultValues: {
    panelsNumber: number;
    baseTransition: number;
    slowTransition: number;
  };
}

export type TStatePictureNumbers = 0 | 1 | 2 | undefined;

const pictureAngles = [67, 187, 307];

const initialState: IWheelData = {
  angle: 0,
  transition: 50,
  stopFlag: false,
  defaultValues: {
    panelsNumber: 60,
    baseTransition: 50,
    slowTransition: 400,
  },
};

export const wheelSlice = createSlice({
  name: "wheelData",
  initialState,
  reducers: {
    setAngle: (state, action: PayloadAction<number>) => {
      state.angle = action.payload;
    },
    setTransition: (state, action: PayloadAction<number>) => {
      state.transition = action.payload;
    },
    setStopFlag: (state, action: PayloadAction<boolean>) => {
      state.stopFlag = action.payload;
    },
    findClosestAngle: (state, action: PayloadAction<TStatePictureNumbers>) => {
      const currentAngle = state.angle % 360;

      if (action.payload || action.payload === 0) {
        // menu hover
        const wantedAngle = pictureAngles[action.payload];
        Math.abs(wantedAngle - currentAngle) < 180
          ? wantedAngle > currentAngle
            ? (state.angle += Math.abs(wantedAngle - currentAngle))
            : (state.angle -= Math.abs(wantedAngle - currentAngle))
          : wantedAngle > currentAngle
          ? (state.angle -= 360 - Math.abs(wantedAngle - currentAngle))
          : (state.angle += 360 - Math.abs(wantedAngle - currentAngle));
      } else {
        // wheel hover
        const closestAngle = pictureAngles
          .map((angle, index) => {
            return {
              length: Math.abs(angle - currentAngle),
              index,
            };
          })
          .sort((a, b) => a.length - b.length)[0];

        pictureAngles[closestAngle.index] > currentAngle
          ? (state.angle += closestAngle.length)
          : (state.angle -= closestAngle.length);
      }
    },
  },
});

// reducers
export const { setAngle, setTransition, setStopFlag, findClosestAngle } =
  wheelSlice.actions;

export default wheelSlice.reducer;
