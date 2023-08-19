import type { Identifier, XYCoord } from 'dnd-core';
import update from 'immutability-helper';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
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

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Card: FC<CardProps> = ({ id, card, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'CARD',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <CardItem card={''} {...card} />
    </div>
  );
};

const CreateJourneyPage: NextPage = () => {
  const { cards, hasAuthError } = useInventory();

  const [draftCards, setDraftCards] = useState<InventoryCard[]>([]);

  useEffect(() => {
    if (cards.length > 0) {
      setDraftCards(cards);
    }
  }, [cards]);

  const [stage, setStage] = useState<Stage>(Stage.SELECT_DATE);

  const handlePrev = useCallback(() => {
    setStage((prev) => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setStage((prev) => prev + 1);
  }, []);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setDraftCards((prevCards: InventoryCard[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as InventoryCard],
        ],
      }),
    );
  }, []);

  const renderCard = useCallback(
    (card: InventoryCard, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          card={card}
          moveCard={moveCard}
        />
      );
    },
    [moveCard],
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
            <div className="flex flex-col">
              <h2>New Journey</h2>
              {draftCards.map((card, i) => renderCard(card, i))}

              <h2>Inventory Cards</h2>
              {cards.map((card, i) => renderCard(card, i))}
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
