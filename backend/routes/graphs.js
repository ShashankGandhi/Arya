var express = require("express");
var router = express.Router();
const Auth = require("../middleware/auth");
const auth = Auth.auth;
var moment = require("moment");
let mockJSONData = require("./mock.json");
const _ = require("lodash");
const mockGraphResponse = require("./mockGraphResponse.json");

router.post("/getGraphData", auth, async (req, res) => {
  try {
    console.log("in POST /graphs/getGraphData/ =========", req.body);
    let { fromDate, toDate } = req.body;
    if (!(fromDate && toDate)) {
      res.status(400).json({
        status: "failure",
        reason: "Date range is incorrect",
      });
    } else {
      fromDate = moment(fromDate);
      toDate = moment(toDate);
      let dateDiff = toDate.diff(fromDate, "days");
      let monthDiff = toDate.diff(fromDate, 'months');
      let sevenDayDiff = Math.floor(dateDiff/7);
      fromDate = moment(fromDate).format("YYYY-MM-DD");
      toDate = moment(toDate).format("YYYY-MM-DD");
      let baseObject = generateBaseObject(fromDate, toDate);
      let response;
      let graphType = '';
      // console.log('dateDiff=========', dateDiff)
      console.log('sevenDayDiff=========', sevenDayDiff)
      // console.log('monthDiff=========', monthDiff)
      if (dateDiff < 7) {
        graphType = 'Daily';
        response = generateDaily(fromDate, toDate, dateDiff, baseObject);
      } else if ((7 < dateDiff) && (dateDiff < 90)) {
        graphType = 'Weekly';
        response = generateWeekly(fromDate, toDate, sevenDayDiff, baseObject);
      } else {
        graphType = 'Monthly';
        response = generateMonthly(fromDate, toDate, monthDiff, baseObject);
      }

      response = JSON.parse(JSON.stringify(response))
      response.totalNumber = response.series[response.series.length-1].data.reduce((a, b) => a + b);
      let acceptedIndex =  _.findIndex(response.series, { name: 'ACCEPT' });
      if (acceptedIndex > -1) {
        response.totalAccepted = response.series[acceptedIndex].data.reduce((a, b) => a + b);
      } else {
        response.totalAccepted = 0;
      }
      console.log('response.totalNumber ', response.totalNumber)
      console.log('response.totalAccepted ', response.totalAccepted)
      response.graphType = graphType;
      res.status(201).json({
        status: "success",
        data: response,
      });
    }
  } catch (error) {
    console.error("error occurred while getting Graph Data", error);
    res.status(500).json({
      status: "failure",
      reason: "Internal server error",
    });
  }
});

let generateBaseObject = (fromDate, toDate) => {
  let allDecisions = Object.keys(_.groupBy(mockJSONData, "Decision"));
  // Legend keys
  allDecisions.push("Total");
  // another key as total will also be a series
  mockGraphResponse.legend.data = allDecisions;
  mockGraphResponse.series = [];
  allDecisions.forEach((eachDecision, index) => {
    // append total object for sum of all
    if (eachDecision === 'Total') {
      mockGraphResponse.series.push({
        name: "Total",
        type: "line",
        stack: "counts",
        label: {
          normal: {
            show: true,
            position: "top",
          },
        },
        areaStyle: { normal: {} },
        data: [],
      });
    } else {
      // append empty object for each decision
      mockGraphResponse.series.push({
        name: eachDecision,
        type: "line",
        stack: "counts",
        areaStyle: { normal: {} },
        data: [],
      });
    }
  });
  // console.log("mockGraphResponse==", mockGraphResponse);
  return mockGraphResponse;
};

// use date as x-axis
let generateDaily = (fromDate, toDate, diff, baseObject) => {
  console.log("in generateDaily");
  let mockData = _.sortBy(mockJSONData, "Date");
  let data = [];
  // get all objects matching the date filter
  mockData.forEach((object) => {
    if (fromDate <= object.Date && object.Date <= toDate) {
      data.push(object);
    }
  });
  let decisionGroup = _.groupBy(data, "Decision");
  // console.log("decisionGroup", decisionGroup);
  let decisions = Object.keys(decisionGroup);
  // console.log("decisions", decisions);
  baseObject.xAxis[0].data = [];
  decisions.forEach((eachDecision) => {
    // find index of decision in baseObject.series
    let indexOfDecision = _.findIndex(baseObject.series, { name: eachDecision });
    for (let i = 0; i <= diff; i++) {
      let iterableDate = moment(fromDate).add(i, "d").format("YYYY-MM-DD");
      // add date in x axis object
      baseObject.xAxis[0].data.push(iterableDate);
      baseObject.xAxis[0].data = Array.from(new Set(baseObject.xAxis[0].data));
      // find count of object for that date and fill in series
      let filteredArray = decisionGroup[eachDecision].filter((value) => {
        return value.Date === iterableDate;
      });

      // if index found for decision
      if (indexOfDecision > -1) {        
        baseObject.series[indexOfDecision].data.push(filteredArray.length);
      }

      if (baseObject.series[baseObject.series.length-1].data.length >= (i+1)) {
        baseObject.series[baseObject.series.length - 1].data[i] =
          parseInt(baseObject.series[baseObject.series.length - 1].data[i]) +
          parseInt(filteredArray.length);
      } else {
        // the total object hasn't been filled till now so just push
        baseObject.series[baseObject.series.length-1].data.push(filteredArray.length)
      }
    }
  });

  // console.log("final baseObject==", baseObject);
  return baseObject;
};

// use weekly date as x-axis
let generateWeekly = (fromDate, toDate, sevenDayDiff, baseObject) => {
  console.log("in generateWeekly");
  let mockData = _.sortBy(mockJSONData, "Date");
  let data = [];
  // get all objects matching the filter
  mockData.forEach((object) => {
    if ((fromDate <= object.Date) && (object.Date <= toDate)) {
      data.push(object);
    }
  });
  let decisionGroup = _.groupBy(data, "Decision");
  console.log("decisionGroup", decisionGroup);
  let decisions = Object.keys(decisionGroup);
  console.log("decisions", decisions);
  baseObject.xAxis[0].data = [];
  // console.log('sevenDayDiff=========', sevenDayDiff)
  decisions.forEach((eachDecision) => {
    // find index of decision in baseObject.series
    let indexOfDecision = _.findIndex(baseObject.series, { name: eachDecision });
    for (let i = 0; i <= sevenDayDiff; i++) {
      let previousWeekDate =
        (i == 0)
          ? moment(fromDate).format("YYYY-MM-DD")
          : moment(fromDate)
              .add((i-1) * 7, "d")
              .format("YYYY-MM-DD");
      let iterableDate = moment(fromDate).add(i*7, "d").format("YYYY-MM-DD");
      // add month in x axis object
      baseObject.xAxis[0].data.push(iterableDate);
      baseObject.xAxis[0].data = Array.from(new Set(baseObject.xAxis[0].data));
      // find count of object for that date and fill in series
      let filteredArray = decisionGroup[eachDecision].filter((value) => {
        return ((previousWeekDate <= value.Date) && ( value.Date <= iterableDate));
      });
      // if index found for decision
      if (indexOfDecision > -1) {        
        baseObject.series[indexOfDecision].data.push(filteredArray.length);
      }
      if (baseObject.series[baseObject.series.length-1].data.length >= (i+1)) {
        baseObject.series[baseObject.series.length - 1].data[i] =
          parseInt(baseObject.series[baseObject.series.length - 1].data[i]) +
          parseInt(filteredArray.length);
      } else {
        // the total object hasn't been filled till now so just push
        baseObject.series[baseObject.series.length-1].data.push(filteredArray.length)
      }
    }
  });
  console.log("final baseObject==", baseObject);
  return baseObject
};

// use month as x-axis
let generateMonthly = (fromDate, toDate, monthDiff, baseObject) => {
  console.log("in generateMonthly");
  let mockData = _.sortBy(mockJSONData, "Date");
  let data = [];
  // get all objects matching the filter
  mockData.forEach((object) => {
    if ((fromDate <= object.Date) && (object.Date <= toDate)) {
      data.push(object);
    }
  });
  let decisionGroup = _.groupBy(data, "Decision");
  // console.log("decisionGroup", decisionGroup);
  let decisions = Object.keys(decisionGroup);
  console.log("decisions", decisions);
  baseObject.xAxis[0].data = [];
  // console.log('monthDiff=========', monthDiff)
  decisions.forEach((eachDecision) => {
    // find index of decision in baseObject.series
    let indexOfDecision = _.findIndex(baseObject.series, { name: eachDecision });
    for (let i = 0; i <= monthDiff; i++) {
      // let iterableDate = moment(fromDate).add(i, "d").format("YYYY-MM-DD");
      let iterableMonth = moment(fromDate).add(i, "M").format("MMMM YYYY");
      // add month in x axis object
      baseObject.xAxis[0].data.push(iterableMonth);
      baseObject.xAxis[0].data = Array.from(new Set(baseObject.xAxis[0].data));
      // find count of object for that date and fill in series
      let filteredArray = decisionGroup[eachDecision].filter((value) => {
        return moment(value.Date).format("MMMM YYYY") === iterableMonth;
      });
      // if index found for decision
      if (indexOfDecision > -1) {        
        baseObject.series[indexOfDecision].data.push(filteredArray.length);
      }
      if (baseObject.series[baseObject.series.length-1].data.length >= (i+1)) {
        baseObject.series[baseObject.series.length - 1].data[i] =
          parseInt(baseObject.series[baseObject.series.length - 1].data[i]) +
          parseInt(filteredArray.length);
      } else {
        // the total object hasn't been filled till now so just push
        baseObject.series[baseObject.series.length-1].data.push(filteredArray.length)
      }
    }
  });
  console.log("final baseObject==", baseObject);
  return baseObject;
};

module.exports = router;
