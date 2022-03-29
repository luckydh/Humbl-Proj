import React from "react";

export interface CategoryHeaderProps {
  title: string;
}

export const CategoryHeader = ({ title }: CategoryHeaderProps) => (
  <li className="px-6 py-2 background-white-1" key={title}>
    <span className="text-dark-blue-1 font-bold">{title}</span>
  </li>
);
