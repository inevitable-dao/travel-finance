import type { Identifier, XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { OnDragEndResponder } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
// import React from "react";
// import isEmpty from "lodash/isEmpty";
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDrag, useDrop } from 'react-dnd';

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

interface CardProps {
  id: any;
  card: InventoryCard;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

// import {
//   Column,
//   Footer,
//   NoData,
//   ShowBadge,
//   Title,
//   User,
//   UserContainer
// } from "../index";

const DropContainer = ({ id, title, users }: any) => (
  // <Column>
  //   <Title style={{ marginBottom: 5 }}>{title}</Title>
  // @ts-ignore
  <Droppable droppableId={id}>
    {
      ({ innerRef, placeholder }, { isDraggingOver }) =>
        // <UserContainer ref={innerRef} isDraggingOver={isDraggingOver}>
        !(users.length === 0)
          ? (users as any).map((user: any, index: number) => (
              // @ts-ignore
              <Draggable key={_id} draggableId={_id} index={index}>
                {(
                  { draggableProps, dragHandleProps: eventHandlers, innerRef },
                  { isDragging },
                ) => (
                  // {...draggableProps}
                  <div ref={innerRef} {...draggableProps} {...eventHandlers}>
                    {JSON.stringify(user)}
                  </div>
                  // <User
                  //   ref={innerRef}
                  //   {...draggableProps}
                  //   {...eventHandlers}
                  //   isDragging={isDragging}
                  // >
                  //   {/* <ShowBadge response={response} style={{ margin: 0 }}>
                  //     {firstName} {lastName}
                  //   </ShowBadge> */}
                  //   <span />
                  //   {notes && (
                  //     <p
                  //       style={{
                  //         margin: 0,
                  //         paddingLeft: 25,
                  //         fontStyle: 'italic',
                  //       }}
                  //     >
                  //       ({notes})
                  //     </p>
                  //   )}
                  // </User>
                )}
              </Draggable>
            ))
          : // <NoData />
            null
      // {placeholder}
      // <Footer />
      // </UserContainer>
    }
  </Droppable>
);

const CreateJourneyPage: NextPage = () => {
  const { cards, hasAuthError } = useInventory();

  // const [draftCards, setDraftCards] = useState<InventoryCard[]>([]);

  // useEffect(() => {
  //   if (cards.length > 0) {
  //     setDraftCards(cards);
  //   }
  // }, [cards]);

  const [stage, setStage] = useState<Stage>(Stage.SELECT_DATE);

  const handlePrev = useCallback(() => {
    setStage((prev) => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setStage((prev) => prev + 1);
  }, []);

  // const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
  //   setDraftCards((prevCards: InventoryCard[]) =>
  //     update(prevCards, {
  //       $splice: [
  //         [dragIndex, 1],
  //         [hoverIndex, 0, prevCards[dragIndex] as InventoryCard],
  //       ],
  //     }),
  //   );
  // }, []);

  // const renderCard = useCallback(
  //   (card: InventoryCard, index: number) => {
  //     return (
  //       <Card
  //         key={card.id}
  //         index={index}
  //         id={card.id}
  //         card={card}
  //         moveCard={moveCard}
  //       />
  //     );
  //   },
  //   [moveCard],
  // );

  // columns: [
  //   {
  //     _id: "employees",
  //     title: "Employees",
  //     cardIds: [...seasonData.members.map(({ _id }) => _id)]
  //   },
  //   ...eventData.callTimes.map(callTime => ({
  //     _id: callTime,
  //     title: moment(callTime).format("hh:ss a"),
  //     cardIds: []
  //   }))
  // ]

  // const [draftCardIds, setDraftCardIds] = useState<string[]>([]);
  // const [allCardIds, setAllCardIds] = useState<string[]>([]);
  const [columns, setColumns] = useState<
    {
      _id: string;
      cardIds: string[];
    }[]
  >([
    { _id: 'draft', cardIds: [] },
    { _id: 'inventory', cardIds: [] },
  ]);

  useEffect(() => {
    // draftCards = []
    // allCards = cards

    // setColumns(cards.map((v) => v.id));

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
          (column) => column._id === sourceId,
        );

        // desination container object
        const destinationContainer = columns.find(
          (column) => column._id === destinationId,
        );

        if (!sourceContainer || !destinationContainer) {
          return;
        }

        // source container "cardIds" array
        const sourceIds = Array.from(sourceContainer.cardIds);

        // destination container "cardIds" array
        const destinationIds = Array.from(destinationContainer.cardIds);

        // check if source and destination container are the same
        const isSameContainer =
          sourceContainer._id === destinationContainer._id;

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
          if (column._id === newSourceContainer._id) {
            return newSourceContainer;
          } else if (
            column._id === newDestinationContainer._id &&
            !isSameContainer
          ) {
            return newDestinationContainer;
          } else {
            return column;
          }
        });

        // return {
        //   ...prevState,
        //   columns,
        // };
        // });
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

      {/* {stage === Stage.SELECT_ORDER && (
        <div className="flex flex-col w-full">
          {draftCards.map((card, i) => renderCard(card, i))}
        </div>
      )} */}

      {stage === Stage.SELECT_ORDER && (
        <div className="flex flex-col w-full">
          {hasAuthError ? (
            <LoginRequired />
          ) : cards.length === 0 ? (
            <CardsEmpty />
          ) : (
            // <div className="flex flex-col">
            //   <h2>New Journey</h2>
            //   {draftCards.map((card, i) => renderCard(card, i))}

            //   <h2>Inventory Cards</h2>
            //   {cards.map((card, i) => renderCard(card, i))}
            // </div>
            <div className="flex flex-col">
              <DragDropContext onDragEnd={onDragEnd}>
                {/* <Legend>
                  <Title style={{ marginBottom: 5 }}>Legend</Title>
                  {responses.map((response) => (
                    <ShowBadge
                      key={response}
                      response={response}
                      style={{ fontSize: 17 }}
                    >
                      {response}
                    </ShowBadge>
                  ))}
                </Legend> */}
                {columns.map(({ _id, title, userIds }) => (
                  <DropContainer
                    id={_id}
                    key={_id}
                    title={title}
                    users={userIds.map((id) =>
                      users.find((user) => user._id === id),
                    )}
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
