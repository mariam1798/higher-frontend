import React from "react";

export default function BulletPoints({ text }) {
  const points = text
    .trim()
    .split("•")
    .filter((point) => point.trim() !== "");

  return (
    <ul>
      {points.map((point, index) => (
        <li key={index}>{point.trim()}</li>
      ))}
    </ul>
  );
}
