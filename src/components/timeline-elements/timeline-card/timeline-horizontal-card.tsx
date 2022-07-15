import cls from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import { TimelineCardModel } from '../../../models/TimelineItemModel';
import { GlobalContext } from '../../GlobalContext';
import TimelineCardContent from '../timeline-card-content/timeline-card-content';
import TimelineItemTitle from '../timeline-item-title/timeline-card-title';
import {
  Circle,
  CircleWrapper,
  TimelineContentContainer,
  TimelineTitleContainer,
  Wrapper,
  CircleDivider,
} from './timeline-horizontal-card.styles';

const TimelineCard: React.FunctionComponent<TimelineCardModel> = ({
  active,
  autoScroll,
  cardDetailedText,
  cardSubtitle,
  cardTitle,
  url,
  id,
  media,
  onClick,
  onElapsed,
  slideShowRunning,
  theme,
  title,
  wrapperId,
  customContent,
  hasFocus,
  iconChild,
  index,
  total,
}: TimelineCardModel) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    mode,
    cardPositionHorizontal: position,
    timelineCircleDimension,
    disableClickOnCircle,
    cardLess,
    showAllCardsHorizontal,
    TimelineTitleContainerStyle,
    CircleStyle,
    CircleDividerStyle,
    CircleStyleActive,
  } = useContext(GlobalContext);

  const handleClick = () => {
    if (!disableClickOnCircle && onClick && !slideShowRunning) {
      onClick(id);
    }
  };

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;
      const wrapper = wrapperRef.current;

      if (circle && wrapper) {
        const circleOffsetLeft = circle.offsetLeft;
        const wrapperOffsetLeft = wrapper.offsetLeft;

        autoScroll({
          pointOffset: circleOffsetLeft + wrapperOffsetLeft,
          pointWidth: circle.clientWidth,
        });
      }
    }
  }, [active, autoScroll, mode]);

  const handleOnShowMore = useCallback(() => {}, []);

  const modeLower = useMemo(() => mode?.toLowerCase(), [mode]);

  const containerClass = useMemo(
    () =>
      cls(
        'timeline-horz-card-wrapper',
        modeLower,
        position === 'TOP' ? 'bottom' : 'top',
        showAllCardsHorizontal ? 'show-all' : '',
      ),
    [mode, position],
  );

  const titleClass = useMemo(() => cls(modeLower, position), []);

  const circleClass = useMemo(
    () =>
      cls(
        'timeline-circle',
        { 'using-icon': !!iconChild },
        modeLower,
        active ? 'active' : 'in-active',
      ),
    [active],
  );

  const timelineContent = useMemo(() => {
    return (
      <TimelineContentContainer
        className={containerClass}
        ref={contentRef}
        id={`timeline-card-${id}`}
        theme={theme}
        active={active}
        highlight={showAllCardsHorizontal}
        tabIndex={0}
      >
        <TimelineCardContent
          content={cardSubtitle}
          active={active}
          title={cardTitle}
          url={url}
          detailedText={cardDetailedText}
          onShowMore={handleOnShowMore}
          theme={theme}
          slideShowActive={slideShowRunning}
          media={media}
          onElapsed={onElapsed}
          id={id}
          customContent={customContent}
          hasFocus={hasFocus}
          onClick={onClick}
        />
      </TimelineContentContainer>
    );
  }, [active, slideShowRunning]);

  const showTimelineContent = () => {
    const ele = document.getElementById(wrapperId);

    if (ele) {
      return ReactDOM.createPortal(timelineContent, ele);
    }
  };

  const canShowTimelineContent = useMemo(
    () => (active && !cardLess) || showAllCardsHorizontal,
    [active, cardLess, showAllCardsHorizontal],
  );

  return (
    <Wrapper ref={wrapperRef} className={modeLower} data-testid="timeline-item">
      {canShowTimelineContent && showTimelineContent()}

      <CircleWrapper>
        <CircleDivider
          type="left"
          style={CircleDividerStyle}
          hide={index == 0}
        />
        <Circle
          className={circleClass}
          onClick={handleClick}
          ref={circleRef}
          data-testid="timeline-circle"
          theme={theme}
          aria-label={title}
          dimension={timelineCircleDimension}
          style={
            active ? { ...CircleStyle, ...CircleStyleActive } : CircleStyle
          }
        >
          {iconChild ? iconChild : null}
        </Circle>
        <CircleDivider
          type="right"
          style={CircleDividerStyle}
          hide={index == total - 1}
        />
      </CircleWrapper>

      <TimelineTitleContainer
        className={titleClass}
        data-testid="timeline-title"
        style={TimelineTitleContainerStyle}
        onClick={handleClick}
      >
        <TimelineItemTitle title={title} active={active} theme={theme} />
      </TimelineTitleContainer>
    </Wrapper>
  );
};

export default TimelineCard;
