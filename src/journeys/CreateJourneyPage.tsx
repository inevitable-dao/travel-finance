import { NextPage } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';

import { Button } from '@/components/Button';
import { CardItem } from '@/components/CardItem';
import { CardsEmpty } from '@/components/CardsEmpty';
import { DatePicker } from '@/components/DatePicker';
import { LoginRequired } from '@/components/LoginRequired';
import { PageTitle } from '@/components/PageTitle';
import {
  type CardItem as InventoryCard,
  useInventory,
} from '@/inventory/hooks/useInventory';

enum Stage {
  SELECT_DATE,
  SELECT_ORDER,
}

type DropContainerProps = {
  id: number | string;
  title: string;
  cards: InventoryCard[];
};
const DropContainer: React.FC<DropContainerProps> = ({ id, title, cards }) => (
  <div className="h-fit bg-zinc-900 min-h-[120px]">
    <span style={{ marginBottom: 5 }}>{title}</span>
    {/*
    // @ts-ignore */}
    <Droppable
      // @ts-ignore
      className="flex flex-1 w-full h-full"
      droppableId={id.toString()}
    >
      {({ innerRef, placeholder }, { isDraggingOver }) => (
        <div
          ref={innerRef}
          // isDraggingOver={isDraggingOver}
        >
          {!(cards.length === 0)
            ? cards.map((card, index) => (
                // @ts-ignore
                <Draggable
                  key={card.id}
                  draggableId={card.id.toString()}
                  index={index}
                >
                  {(
                    {
                      draggableProps,
                      dragHandleProps: eventHandlers,
                      innerRef,
                    },
                    { isDragging },
                  ) => (
                    <div
                      ref={innerRef}
                      {...draggableProps}
                      {...eventHandlers}
                      // isDragging={isDragging}
                    >
                      <CardItem card="" {...card} />
                    </div>
                  )}
                </Draggable>
              ))
            : null}
          {/* {placeholder}
          <Footer /> */}
        </div>
      )}
    </Droppable>
  </div>
);

const CreateJourneyPage: NextPage = () => {
  const { cards, hasAuthError } = useInventory();

  const [stage, setStage] = useState<Stage>(Stage.SELECT_DATE);

  const handlePrev = useCallback(() => {
    setStage((prev) => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setStage((prev) => prev + 1);
  }, []);

  const [columns, setColumns] = useState<
    {
      _id: string;
      cardIds: string[];
    }[]
  >([
    { _id: 'draft', cardIds: [] },
    { _id: 'inventory', cardIds: [] },
  ]);

  const hasUpdatedRef = useRef<boolean>(false);
  useEffect(() => {
    if (hasUpdatedRef.current) {
      return;
    }
    hasUpdatedRef.current = true;
    setColumns((prev) =>
      prev.map((column) =>
        column._id === 'inventory'
          ? {
              ...column,
              cardIds: cards.map((card) => card.id),
            }
          : column,
      ),
    );
  }, [cards]);

  const onDragEnd = useCallback<OnDragEndResponder>(
    ({ source, destination, draggableId }) => {
      // dropped inside of the list
      if (source && destination) {
        // this.setState((prevState) => {
        // source container index and id
        const { index: sourceIndex, droppableId: sourceId } = source;

        // destination container index and id
        const { index: destinationIndex, droppableId: destinationId } =
          destination;

        // source container object
        const sourceContainer = columns.find(
          (column) => column._id.toString() === sourceId.toString(),
        );

        // desination container object
        const destinationContainer = columns.find(
          (column) => column._id.toString() === destinationId.toString(),
        );

        console.log({ sourceContainer, destinationContainer });
        if (!sourceContainer || !destinationContainer) {
          return;
        }

        // source container "cardIds" array
        const sourceIds = Array.from(sourceContainer.cardIds);

        // destination container "cardIds" array
        const destinationIds = Array.from(destinationContainer.cardIds);

        // check if source and destination container are the same
        const isSameContainer =
          sourceContainer._id.toString() ===
          destinationContainer._id.toString();

        //  remove a userId from the source "cardIds" array via the sourceIndex
        sourceIds.splice(sourceIndex, 1);

        // add a userId (draggableId) to the source or destination "cardIds" array
        if (isSameContainer) {
          sourceIds.splice(destinationIndex, 0, draggableId);
        } else {
          destinationIds.splice(destinationIndex, 0, draggableId);
        }

        // update the source container with changed sourceIds
        const newSourceContainer = {
          ...sourceContainer,
          cardIds: sourceIds,
        };

        // update the destination container with changed destinationIds
        const newDestinationContainer = {
          ...destinationContainer,
          cardIds: destinationIds,
        };

        // loop through current columns and update the source
        // and destination containers
        const _columns = columns.map((column) => {
          if (column._id.toString() === newSourceContainer._id.toString()) {
            return newSourceContainer;
          } else if (
            column._id.toString() === newDestinationContainer._id.toString() &&
            !isSameContainer
          ) {
            return newDestinationContainer;
          } else {
            return column;
          }
        });

        setColumns(_columns);
      }
    },
    [columns],
  );

  if (hasAuthError) {
    return (
      <div className="flex flex-col items-center mt-[64px]">
        <PageTitle description="Use your cards to plan your special journey">
          Create a new Journey
        </PageTitle>

        <LoginRequired />
      </div>
    );
  }

  return (
    // <SortableProvider>
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="Use your cards to plan your special journey">
        Create a new Journey
      </PageTitle>

      {stage === Stage.SELECT_DATE && (
        <div>
          <DatePicker />
          <DatePicker />
        </div>
      )}

      {stage === Stage.SELECT_ORDER && (
        <div className="flex flex-col w-full">
          {hasAuthError ? (
            <LoginRequired />
          ) : cards.length === 0 ? (
            <CardsEmpty />
          ) : (
            <div className="flex flex-col gap-4">
              {/* @ts-ignore */}
              <DragDropContext onDragEnd={onDragEnd}>
                {columns.map(({ _id, cardIds }, index) => (
                  <DropContainer
                    id={_id}
                    key={_id}
                    title={index === 0 ? 'Draft' : 'Inventory'}
                    cards={
                      cardIds
                        .map((id) =>
                          cards.find(
                            (card) => card.id.toString() === id.toString(),
                          ),
                        )
                        .filter((v) => !!v) as InventoryCard[]
                    }
                  />
                ))}
              </DragDropContext>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center w-full gap-2 mt-2">
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={stage === Stage.SELECT_DATE}
          style={{ opacity: stage === Stage.SELECT_DATE ? 0.5 : 1 }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={stage === Stage.SELECT_ORDER}
          style={{ opacity: stage === Stage.SELECT_ORDER ? 0.5 : 1 }}
        >
          Next
        </Button>
      </div>
    </div>
    // </SortableProvider>
  );
};

export default CreateJourneyPage;
