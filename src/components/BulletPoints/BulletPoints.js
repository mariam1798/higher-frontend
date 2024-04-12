import React from "react";

export default function BulletPoints({ text }) {
  const points = text
    .trim()
    .split("•")
    .filter((point) => point.trim() !== "");

  return (
    <ul className="details__description">
      {points.map((point, index) => (
        <li className="details__text" key={index}>
          {point.trim()}
        </li>
      ))}
    </ul>
  );
}
