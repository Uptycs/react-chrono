import cls from 'classnames';
import React, { ReactNode, useContext, useMemo } from 'react';
import { TimelineHorizontalModel } from '../../models/TimelineHorizontalModel';
import { GlobalContext } from '../GlobalContext';
import TimelineCard from '../timeline-elements/timeline-card/timeline-horizontal-card';
import {
  TimelineHorizontalWrapper,
  TimelineItemWrapper,
} from './timeline-horizontal.styles';

const TimelineHorizontal: React.FunctionComponent<TimelineHorizontalModel> = ({
  items,
  handleItemClick,
  autoScroll,
  wrapperId,
  slideShowRunning,
  onElapsed,
  contentDetailsChildren: children,
  hasFocus,
  iconChildren,
  disableLeft,
  disableRight,
  onNext,
  onPrevious,
}: TimelineHorizontalModel) => {
  const {
    mode = 'HORIZONTAL',
    itemWidth = 200,
    cardHeight,
    flipLayout,
    showAllCardsHorizontal,
    theme,
    startEndPadding = 50,
  } = useContext(GlobalContext);

  const wrapperClass = useMemo(
    () =>
      cls(
        mode.toLowerCase(),
        'timeline-horizontal-container',
        showAllCardsHorizontal ? 'show-all-cards-horizontal' : '',
      ),
    [mode, showAllCardsHorizontal],
  );

  const iconChildColln = React.Children.toArray(iconChildren);

  return (
    <TimelineHorizontalWrapper
      className={wrapperClass}
      flipLayout={flipLayout}
      data-testid="timeline-collection"
      startEndPadding={startEndPadding}
    >
      {items.map((item, index) => {
        let customElement = null;
        if (
          children &&
          (children as any[])[index] &&
          React.isValidElement((children as ReactNode[])[index])
        ) {
          customElement = React.cloneElement((children as any[])[index], {
            disableLeft,
            disableRight,
            onNext,
            onPrevious,
          });
        }
        return (
          <TimelineItemWrapper
            key={item.id}
            width={itemWidth}
            className={cls(
              item.visible ? 'visible' : '',
              'timeline-horz-item-container',
            )}
          >
            <TimelineCard
              {...item}
              onClick={handleItemClick}
              autoScroll={autoScroll}
              mode={mode}
              wrapperId={wrapperId}
              theme={theme}
              slideShowRunning={slideShowRunning}
              cardHeight={cardHeight}
              onElapsed={onElapsed}
              customContent={customElement}
              hasFocus={hasFocus}
              iconChild={iconChildColln[index]}
              active={item.active}
              index={index}
              total={items.length}
            />
          </TimelineItemWrapper>
        );
      })}
    </TimelineHorizontalWrapper>
  );
};

export default TimelineHorizontal;
