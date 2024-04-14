import React from "react";
import "./BulletPoints.scss";

export default function BulletPoints({ text }) {
  const points = text
    .trim()
    .split("•")
    .filter((point) => point.trim() !== "");

  return (
    <ul className="info">
      {points.map((point, index) => (
        <li className="info__text" key={index}>
          {point.trim()}
        </li>
      ))}
    </ul>
  );
}
