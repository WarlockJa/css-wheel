import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { findClosestAngle, setStopFlag, setTransition } from "./wheelSlice";

export default function MakePanels({ panelsNumber }: { panelsNumber: number }) {
  const dispatch = useAppDispatch();
  const { baseTransition, slowTransition } = useAppSelector(
    (state) => state.wheel.defaultValues
  );

  const handleMouseEnter = () => {
    dispatch(setStopFlag(true));
    dispatch(setTransition(slowTransition));
    dispatch(findClosestAngle(undefined));
  };

  const handleMouseLeave = () => {
    dispatch(setTransition(baseTransition));
    dispatch(setStopFlag(false));
  };

  return [...Array(panelsNumber)].map((_item, index) => (
    <div
      key={index}
      className="projects-panel"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    ></div>
  ));
}
