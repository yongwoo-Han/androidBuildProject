import React, { Component } from "react";
import SideBar from "./SideBar";
import { createAppContainer, createDrawerNavigator } from "react-navigation";

import AreaPerformanceList from '../../component/AreaPerformanceList'; // 지역별 
import PeriodPerformanceList from '../../component/PeriodPerformanceList'; // 기간별 
import PublicPerformanceList from '../../component/PublicPerformanceList'; // 분야별 

const HomeScreenRouter = createDrawerNavigator(
  {
    지역: { screen: AreaPerformanceList },
    분류: { screen: PeriodPerformanceList },
    기간: { screen: PublicPerformanceList }
  },
  {
    contentComponent: ({props}) => <SideBar {...props} />
  }
);

export default createAppContainer(HomeScreenRouter);