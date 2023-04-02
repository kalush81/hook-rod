import React, { useRef, useEffect, useState, useCallback } from "react";
import MapCss from "../components/MapCss";
import styled from "styled-components";

function Wybierz() {
  const menuItemsObjects = [
    { id: "yellow", content: "item 1", isVisible: false },
    { id: "pink", content: "item 2", isVisible: false },
    { id: "green", content: "item 3", isVisible: false },
    { id: "blue", content: "item 4", isVisible: false },
  ];
  const firstDiv = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);
  const [menuItems, setMenuItems] = useState(menuItemsObjects);

  const [testValue, setTestValue] = useState("");

  const handleTestInputChange = (e) => {
    setTestValue(e.target.value);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const replaceIsVisible = (divOnScreenId) => {
    const newMenuItems = menuItemsObjects.map((item) => {
      if (item.id === divOnScreenId) {
        return {
          ...item,
          isVisible: true,
        };
      } else {
        return {
          ...item,
          isVisible: false,
        };
      }
    });
    setMenuItems(newMenuItems);
  };
  const handleScroll = () => {
    [firstDiv, secondRef, thirdRef, fourthRef].forEach((ref, idx) => {
      const { top, bottom } = ref.current.getBoundingClientRect();
      const halfHeight = window.innerHeight / 2;
      if (top < halfHeight + 1 && bottom > halfHeight) {
        console.log("ref.curr.id", ref.current.id);
        replaceIsVisible(ref.current.id);
      }
      if (idx === 0 && top > halfHeight) {
        setMenuItems(menuItemsObjects);
      }
    });
  };
  return (
    <>
      <MapCss />
      {/* <FixedDiv>
        <ul>
          {menuItems.map((li) => {
            return (
              <li id={li.id} className={li.isVisible ? "isVisible" : undefined}>
                {li.content}
              </li>
            );
          })}
        </ul>
      </FixedDiv>
      <LongDiv id="yellow" ref={firstDiv} style={{ background: "yellow" }}>
        <h3>hello 1</h3>
      </LongDiv>
      <LongDiv id="pink" ref={secondRef} style={{ background: "pink" }}>
        <h3>hello 2</h3>
      </LongDiv>
      <LongDiv id="green" ref={thirdRef} style={{ background: "green" }}>
        <h3>hello 3</h3>
      </LongDiv>
      <LongDiv id="blue" ref={fourthRef} style={{ background: "blue" }}>
        <h3>hello 4</h3>
      </LongDiv> */}
      <input value={testValue} onChange={handleTestInputChange} />
      <button onClick={() => console.log(testValue())}>check it test</button>
      {testValue}
    </>
  );
}

export const LongDiv = styled.div`
  min-height: 200vh;
  border: 4px solid red;
`;
export const FixedDiv = styled.div`
  padding-top: 100px;
  height: 100vh;
  width: 160px;
  position: fixed;
  top: 0;
  left: 0;
  background: brown;
  li {
    font-size: 24px;
    padding: 1rem;
    margin: 1rem;
    background: white;
  }
  li.isVisible {
    background: grey;
  }
`;
export default Wybierz;
