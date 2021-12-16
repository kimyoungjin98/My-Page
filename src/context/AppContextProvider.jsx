import React, { createContext, useContext, useRef, useState } from "react";

const appContext = createContext();
export const useAppContext = () => useContext(appContext);

const AppContextProvider = ({ children }) => {
  const [scrollY, setScrollY] = useState(0); // 기본 스크롤 저장 state
  const compList = ["home", "about", "project", "skill", "contact"];

  const comp_scroll = (e) => {
    let isScroll = false;
    if (!isScroll) {
      isScroll = true;
      requestAnimationFrame(() => {
        // 내비 아래에 닿는 div 찾아서 return하기
        const nav = document.querySelector("nav");
        const navBottom = nav.getBoundingClientRect().bottom;
        const comp = document.elementFromPoint(0, navBottom);

        const compName = compList.filter((compName) => {
          return compName == comp.id;
        });

        // 컴포넌트의 컨텐츠들이 처음 화면에 나타날 때 트랜지션을 주기 위한 코드
        const comp_div = document.querySelector("." + compName + "_div");
        comp_div.classList.add("fade");

        // 스크롤을 내릴 때 내비에 효과를 주기 위한 코드
        nav_style(compName);
        isScroll = false;
      });
    }
  };

  const window_scroll = () => {
    setScrollY(window.pageYOffset);
    const nav = document.querySelector("nav");
    if (scrollY > 100) {
      nav.classList.add("nav_active");
    } else if (scrollY < 100) {
      nav.classList.remove("nav_active");
    }

    comp_scroll();
  };

  const nav_style = (className) => {
    document.getElementById("li_hover").setAttribute("id", "");
    const target_li = document.querySelector("." + className);
    console.log(target_li);
    if (target_li) {
      target_li.setAttribute("id", "li_hover");
    }
  };

  const navClick = (e) => {
    const tagName = e.target.tagName;

    if (tagName === "LI") {
      // 여기서부터는 네비로 스크롤 움직이기
      const className = e.target.className;
      const comp = document.querySelector("#" + className);
      if (comp) {
        const compBound = comp.getBoundingClientRect();
        const compTop = compBound.top;

        window.scrollBy({
          top: compTop,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const props = {
    navClick,
    scrollY,
    setScrollY,
    window_scroll,
  };

  return <appContext.Provider value={props}>{children}</appContext.Provider>;
};

export default AppContextProvider;
