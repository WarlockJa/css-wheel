import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MakePanels from "./MakePanels";
import { setAngle } from "./wheelSlice";
import "./wheel.scss";

export default function Wheel() {
  const dispatch = useAppDispatch();
  const { angle, transition, stopFlag } = useAppSelector(
    (state) => state.wheel
  );
  const PANELS_NUMBER = useAppSelector(
    (state) => state.wheel.defaultValues.panelsNumber
  );

  // wheel inline style used for rotation
  const divStyle = {
    transform: `rotateY(${angle}deg)`,
    transition: `transform ${transition}ms linear`,
  };

  useEffect(() => {
    if (stopFlag) return;

    const interval = setTimeout(() => {
      dispatch(setAngle(angle >= 36000 ? angle - 35999 : angle + 1));
    }, transition);

    return () => clearTimeout(interval);
  }, [angle, transition, stopFlag]);

  return (
    <div className="projects-wheel" style={divStyle}>
      <MakePanels panelsNumber={PANELS_NUMBER} />
    </div>
  );
}
