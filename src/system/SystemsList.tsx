import React from "react";
import { SystemCard } from "./SystemCard";
import { System } from "./systems-data";

interface SystemsListProps {
    systems: System[];
}

interface SystemsListState {
    favorites: number[];
}
//The list of the systems
export class SystemsList extends React.Component<SystemsListProps, SystemsListState> {
    constructor(props: SystemsListProps) {
      super(props);
  
      this.state = {
        favorites: JSON.parse(sessionStorage.getItem("favorites") || "[]")
      };
    }
    //This function toggles a favorite item by taking in a numeric code as input. 
    // It first checks if the item is already in the list of favorites. 
    // If it is, it removes the item from the list. If it isn't, it adds the item to the list. 
    // It then updates the state of the favorites list and stores it in the session storage.
    toggleFavorite(code: number) {
        const { favorites } = this.state;
        const index = favorites.indexOf(code);
        if (index === -1) {
          favorites.push(code);
        } else {
          favorites.splice(index, 1);
        }
        this.setState({ favorites });
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
    }
    render() {
        const { systems } = this.props;
        const { favorites } = this.state;

        return (
            <div className="systems-list">
            {systems.map(system => (
                <SystemCard
                key={system.code}
                system={system}
                isFavorite={favorites.includes(system.code)}
                onToggleFavorite={() => this.toggleFavorite(system.code)}
                />
            ))}
            </div>
        );
    }    
    
}  
  