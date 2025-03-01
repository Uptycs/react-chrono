import { Theme } from './Theme';
import { TimelineItemModel } from './TimelineItemModel';

/**
 * model internally used by the component
 *
 * @export
 * @interface TimelineModel
 * @extends {TimelineProps}
 */
export type TimelineModel = Pick<
  TimelineProps,
  | 'items'
  | 'onItemSelected'
  | 'onRestartSlideshow'
  | 'theme'
  | 'slideShow'
  | 'onScrollEnd'
> & {
  activeTimelineItem: number;
  contentDetailsChildren?: React.ReactNode | React.ReactNode[];
  iconChildren?: React.ReactNode | React.ReactNode[];
  innerRef?: (e: HTMLDivElement) => void;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onOutlineSelection: (index: number) => void;
  onPrevious: () => void;
  onTimelineUpdated: (id: number) => void;
  slideItemDuration?: number;
  slideShowEnabled?: boolean;
  slideShowRunning?: boolean;
};

/**
 * Main props used by the host app.
 *
 * @export
 * @interface TimelineProps
 */
export type TimelineProps = {
  CircleDividerStyle?: React.CSSProperties;
  CircleStyle?: React.CSSProperties;
  CircleStyleActive?: React.CSSProperties;
  OutlineStyle?: React.CSSProperties;
  TimelineContentContainerStyle?: React.CSSProperties;
  TimelineContentDetailsWrapperStyle?: React.CSSProperties;
  TimelineMainWrapperStyle?: React.CSSProperties;
  TimelineTitleContainerStyle?: React.CSSProperties;
  activeItemIndex?: number;
  allowDynamicUpdate?: boolean;
  borderLessCards?: boolean;
  buttonTexts?: {
    first: string;
    last: string;
    next?: string;
    play?: string;
    previous?: string;
  };
  cardHeight?: number;
  cardLess?: boolean;
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
  cardWidth?: number;
  children?: React.ReactElement | React.ReactElement[];
  disableAutoScrollOnClick?: boolean;
  disableClickOnCircle?: boolean;
  disableNavOnKey?: boolean;
  enableOutline?: boolean;
  flipLayout?: boolean;
  fontSizes?: {
    cardSubtitle?: string;
    cardText?: string;
    cardTitle?: string;
    title?: string;
  };
  hideControls?: boolean;
  itemWidth?: number;
  items?: TimelineItemModel[];
  lineWidth?: number;
  mode?: TimelineMode;
  onItemSelected?: (data: TimelineItemModel) => void;
  onRestartSlideshow?: () => void;
  onScrollEnd?: () => void;
  scrollIntoView?: boolean;
  scrollable?: boolean | { scrollbar: boolean };
  showAllCardsHorizontal?: boolean;
  slideItemDuration?: number;
  slideShow?: boolean;
  startEndPadding?: number;
  theme?: Theme;
  timelineCircleDimension?: number;
  useReadMore?: boolean;
};

export type TimelineMode = 'VERTICAL' | 'HORIZONTAL' | 'VERTICAL_ALTERNATING';
