import React from "react";
import { System } from "./systems-data";

interface SystemCardProps {
  system: System;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}
//Display the system's image, title, description, and link to the system. 
//Additionally, display whether the system is favorited or not.
export class SystemCard extends React.Component<SystemCardProps> {
  render() {
      const { system, isFavorite, onToggleFavorite } = this.props;
      const favoriteIcon = isFavorite ? "❤️" : "🤍";
      return (
          <div className="system-card">
            <div className="system-card-image" style={{ backgroundImage: `url(${system.image})` }}>
              <div className="system-card-title">{system.name}</div>
              <div className="system-card-description">{system.description.slice(0, 100)}{system.description.length > 100 ? "..." : ""}</div>
            </div>
            <div className="system-card-footer">
      <a href={system.link} target="_blank">Go to {system.name}</a>
              <button className="system-card-favorite" onClick={onToggleFavorite}>{favoriteIcon}</button>
            </div>
          </div>
        );
  } 
}