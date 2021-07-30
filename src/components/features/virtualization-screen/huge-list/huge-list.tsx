import React, { useEffect, useRef, useState } from "react";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./huge-list.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
import { HugeListItem } from "../huge-list-item/huge-list-item";
// -------------------------------------------------------------------

const hugeDataList = Array.from({ length: 100000 }, (v, k) => `item-${k}`);

type HugeListProps = {
  height: number,
  itemHeight: number,
  rowBilder: (item: any, index: number) => JSX.Element
};
const HugeList: React.FC<HugeListProps> = (props) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const BUFFER_ITEMS_COUNT = 2;
  const itemsToShowCount = Math.floor(props.height / props.itemHeight);
  const initialItems = hugeDataList.filter((_, idx) => (idx >= 0 && idx < itemsToShowCount + BUFFER_ITEMS_COUNT));
  const [rebuildIndex, setRebuildIndex] = useState(0);
  const [renderStartIndex, setRenderStartIndex] = useState(0);

  const [itemsToShow, setItemsToShow] = useState(initialItems);

  useEffect(() => {
    const containerEl = containerRef.current;
    const listEl = listRef.current;
    if (containerEl === null || listEl === null) return;

    listEl.style.height = props.itemHeight * hugeDataList.length + "px";

    const handleScroll = () => {
      const currIndex = Math.floor(containerEl.scrollTop / props.itemHeight);

      console.log("currIndex", currIndex, "rebuildIndex", rebuildIndex, "renderStartIndex", renderStartIndex);
      const beginIdx = currIndex - BUFFER_ITEMS_COUNT;
      const endIdx = currIndex + BUFFER_ITEMS_COUNT + itemsToShowCount;

      if (currIndex >= rebuildIndex || currIndex < renderStartIndex) {
        const newList = hugeDataList.filter((_, idx) => (idx >= beginIdx) && (idx < endIdx));
        setItemsToShow(newList);
        setRenderStartIndex(currIndex - BUFFER_ITEMS_COUNT >= 0 ? currIndex - BUFFER_ITEMS_COUNT : 0);
        setRebuildIndex(currIndex + BUFFER_ITEMS_COUNT);
      }
    }

    console.log("ADDED");
    containerEl.addEventListener("scroll", handleScroll);
    return () => {
      console.log("REMOVED");
      containerEl.removeEventListener("scroll", handleScroll);
    }

  }, [rebuildIndex, renderStartIndex, itemsToShowCount, props.itemHeight]);

  return (
    <>{rebuildIndex} {renderStartIndex}
      <div ref={containerRef} style={{ height: props.height }} className="huge-list-wrapper">
        <ul ref={listRef} className="huge-list">{itemsToShow.map((item, idx) => {
          const itemStyle: React.CSSProperties = {
            top: props.itemHeight * (renderStartIndex + idx) + "px"
          }
          return (
            <div key={item} className="huge-list__item" style={itemStyle}>
              <HugeListItem height={props.itemHeight} text={item} />
            </div>
          );
        })}</ul>
      </div>
    </>
  );
}

// -----------------------------------------------------------------------

const scrolledToEnd = (el: HTMLElement) => {
  return el.scrollHeight - el.scrollTop === el.clientHeight
}

export { HugeList };