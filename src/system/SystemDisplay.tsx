import React from "react";
import { System } from "./systems-data";
import { SystemsList } from "./SystemsList";

interface SystemDisplayProps {
  systems: System[];
}

interface SystemDisplayState {
  scrollPosition: number;
}

//Display the list of the systems, and arrows to move right or left.
export class SystemDisplay extends React.Component<SystemDisplayProps, SystemDisplayState> {
  private listRef = React.createRef<HTMLDivElement>();

  constructor(props: SystemDisplayProps) {
    super(props);

    this.state = {
      scrollPosition: 0
    };
  }

  // The handleScroll function handles content scrolling left or right and checks if the new position is within the correct range. 
  // It takes two parameters: the direction of the scroll and the event object. 
  // The function retrieves the list reference, calculates the scroll amount and new position, 
  // sets the new position in the state, and checks if it is within the correct range. 
  // If it is, it updates the state with the new position. If not, it leaves the original position unchanged
  handleScroll(direction: "left" | "right", event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const list = this.listRef.current;

    if (list) {
      const scrollAmount = list.offsetWidth / 3;
      const newPosition = direction === "left" ? this.state.scrollPosition - scrollAmount : this.state.scrollPosition + scrollAmount;
      this.setState({ scrollPosition: newPosition });
      const maxPosition = (this.props.systems.length - 1) * scrollAmount / 4; //setting a limit on the maximum position
      if (newPosition >= 0 && newPosition <= maxPosition) { //verifying if the new location is within that limit
        this.setState({ scrollPosition: newPosition });
      }
      else {
        this.setState({ scrollPosition: this.state.scrollPosition });
      }
    }
  }

  render() {
    const { systems } = this.props;
    const { scrollPosition } = this.state;

    return (
      <div className="system-display">
        <button className="scroll-button left" onClick={(event) => this.handleScroll("left", event)}>
          {"<"}
        </button>
        <div className="systems-list-container" ref={this.listRef}>
          <div className="systems-list-inner" style={{ transform: `translateX(-${scrollPosition}px)` }}>
            <SystemsList systems={systems} />
          </div>
        </div>
        <button className="scroll-button right" onClick={(event) => this.handleScroll("right", event)}>
          {">"}
        </button>
      </div>
    );
  }
}
