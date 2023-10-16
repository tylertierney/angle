import { FC } from "react";

const RADIUS = 48;
const ARC_RADIUS = 12;

const describeArc = (radians: number, radius: number, endAngle: number) => {
  const start = {
    x: radius * Math.cos(radians),
    y: radius * Math.sin(radians),
  };
  const end = {
    x: ARC_RADIUS,
    y: 0,
  };

  const largeArcFlag = endAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
};

interface AngleProps {
  angle: number;
  rotation: number;
}

const Angle: FC<AngleProps> = ({ angle, rotation }) => {
  const radians = (angle * Math.PI) / 180;

  const line1 = {
    x1: 0,
    y1: 0,
    x2: RADIUS,
    y2: 0,
  };

  const line2 = {
    x1: 0,
    y1: 0,
    x2: Math.cos(radians) * RADIUS,
    y2: Math.sin(radians) * RADIUS,
  };

  return (
    <svg
      viewBox="-50 -50 100 100"
      width="48.682"
      height="48.463"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style={{ rotate: rotation + "deg" }}>
        <path className="arc" d={describeArc(radians, ARC_RADIUS, angle)} />
        <line x1={line1.x1} y1={line1.y1} x2={line1.x2} y2={line1.y2} />
        <line x1={line2.x1} y1={line2.y1} x2={line2.x2} y2={line2.y2} />
        <circle cx="0" cy="0" r="2" />
      </g>
    </svg>
  );
};

export default Angle;
