import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper/Paper';
import Styles from './index.scss';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class DragBoard extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const { processItems, reorderProcess } = this.props;

    const items = reorder(
      processItems,
      result.source.index,
      result.destination.index
    );

    reorderProcess(items);
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { processItems = [] } = this.props;
    console.log(processItems);
    return (
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 48px)',
          overflowY: 'auto'
        }}
      >
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div className={Styles.board} ref={provided.innerRef}>
                {processItems.map((item, index) => (
                  <Draggable
                    key={item.stateId}
                    draggableId={item.stateId}
                    index={index}
                  >
                    {/* eslint-disable-next-line no-shadow */}
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={Styles.item}
                      >
                        <Paper className={Styles.itemPaper}>
                          {item.content}
                        </Paper>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
