import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  TStatePictureNumbers,
  findClosestAngle,
  setStopFlag,
  setTransition,
} from "../wheel/wheelSlice";
import "./menu.scss";
export default function Menu() {
  const dispatch = useAppDispatch();
  const { baseTransition, slowTransition } = useAppSelector(
    (state) => state.wheel.defaultValues
  );

  const handleMouseEnter = (angle: TStatePictureNumbers) => {
    dispatch(findClosestAngle(angle));
    dispatch(setTransition(slowTransition));
    dispatch(setStopFlag(true));
  };

  const handleMouseLeave = () => {
    dispatch(setTransition(baseTransition));
    dispatch(setStopFlag(false));
  };

  return (
    <footer className="footer">
      <div
        className="footer--picture"
        onMouseEnter={() => handleMouseEnter(0)}
        onMouseLeave={() => handleMouseLeave()}
      >
        Picture 1
      </div>
      <div
        className="footer--picture"
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={() => handleMouseLeave()}
      >
        Picture 2
      </div>
      <div
        className="footer--picture"
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={() => handleMouseLeave()}
      >
        Picture 3
      </div>
    </footer>
  );
}
