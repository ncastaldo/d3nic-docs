import "./style.css";

import {
  brBars,
  brChart,
  bxLines,
  bxCircles,
  bxChart,
  baBars,
  baChart,
  byBars,
  byChart,
} from "d3nic";

import { randomInt } from "d3-random";
import { select } from "d3-selection";
import { interpolateViridis } from "d3-scale-chromatic";

(() => {
  // data

  const dataLength = 30;

  const fnRandom = randomInt(1, 15);

  const fnRandomMin = randomInt(0, dataLength / 2);
  const fnRandomMax = randomInt(dataLength / 2, dataLength);

  const data = [...Array(dataLength).keys()].map((d) => ({
    key: d,
    v: fnRandom(),
  }));

  const duration = 1500;
  const delay = 1000;
  const interval = 4000;

  // style

  const width = 400;
  const height = 400;

  const size = { width, height };
  const viewBox = `0 0 ${width} ${height}`;

  const transitionObject = { duration };

  const fnFill = (d) =>
    interpolateViridis(data.length ? 1 - d.key / data.length : 0);

  for (const i of [1, 2, 3, 4]) {
    select(`#chart-container-${i}`)
      .append("svg")
      .attr("id", `chart-${i}`)
      .attr("viewBox", viewBox)
      .style("width", "100%");
  }

  // chart 1

  const mybrBars = brBars()
    .fnLowValue(0)
    .fnHighValue((d) => d.v)
    .fnFill(fnFill);

  const mybrChart = brChart()
    .selector("#chart-1")
    .size(size)
    .transitionObject(transitionObject)
    .radiusExtent([0.1, 1])
    .angleExtent([-Math.PI, (1 / 2) * Math.PI])
    .fnKey((d) => d.key)
    .components([mybrBars]);

  // chart 2

  const mybxLines = bxLines()
    .fnLowValue(0)
    .fnHighValue((d) => d.v)
    .fnStroke(fnFill)
    .fnStrokeWidth(1);

  const mybxCircles = bxCircles()
    .fnValue((d) => d.v)
    .fnFill(fnFill);

  const mybxChart = bxChart()
    .selector("#chart-2")
    .size(size)
    .transitionObject(transitionObject)
    .fnKey((d) => d.key)
    .components([mybxLines, mybxCircles]);

  // chart 3

  const mybaBars = baBars()
    .fnLowValue(0)
    .fnHighValue((d) => d.v)
    .fnFill(fnFill);

  const mybaChart = baChart()
    .selector("#chart-3")
    .size(size)
    .transitionObject(transitionObject)
    .radiusExtent([0.1, 1])
    .fnKey((d) => d.key)
    .components([mybaBars]);

  // chart 4

  const mybyBars = byBars()
    .fnLowValue(0)
    .fnHighValue((d) => d.v)
    .fnFill(fnFill);

  const mybyChart = byChart()
    .selector("#chart-4")
    .size(size)
    .transitionObject(transitionObject)
    .fnKey((d) => d.key)
    .components([mybyBars]);

  // interaction

  const componentList = [mybrBars, mybxLines, mybxCircles, mybaBars, mybyBars];
  const chartList = [mybrChart, mybxChart, mybaChart, mybyChart];

  // const dispatch = (event, d) => {
  //   for (const component of componentList) {
  //     component.join().filter(f => f.key !== d.key).dispatch(`not-${event.type}`)
  //   }
  // }

  // for (const component of componentList) {
  //   component.fnOn('mouseover', dispatch)
  //   component.fnOn('not-mouseover', (event, d) => select(event.currentTarget).style('opacity', 0.5) )
  //   component.fnOn('mouseout', dispatch)
  //   component.fnOn('not-mouseout', (event, d) => select(event.currentTarget).style('opacity', 1) )
  // }

  const drawUpdate = () => {
    chartList.map((chart, i) => chart.draw({ delay: delay * i }));
  };

  const fnUpdate = () => {
    const min = fnRandomMin();
    const max = fnRandomMax();
    const newData = data.filter((d) => d.key >= min && d.key <= max);

    chartList.map((chart) => chart.data(newData));

    drawUpdate();
  };

  // start animation
  fnUpdate();
  setInterval(fnUpdate, interval);
})();
