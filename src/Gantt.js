/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
 
export default class Gantt extends Component {

  setZoom(value){
    switch (value){
      case 'Hours':
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';
 
        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 30;
        gantt.config.subscales = [
          {unit:'hour', step:1, date:'%H'}
        ];
        break;
      case 'Days':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "week";
        gantt.config.date_scale = "#%W";
        gantt.config.subscales = [
          {unit: "day", step: 1, date: "%d %M"}
        ];
        gantt.config.scale_height = 60;
        break;
      case 'Months':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "month";
        gantt.config.date_scale = "%F";
        gantt.config.scale_height = 60;
        gantt.config.subscales = [
          {unit:"week", step:1, date:"#%W"}
        ];
        break;
      default:
        break;
    }
  }
 
  shouldComponentUpdate(nextProps ){
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidUpdate() {
    console.log('gantt, componentDidUpdate')
    gantt.render();
  }
  componentDidMount() {
    console.log('gantt, componentDidMount')
    console.log('gantt, props:', this.props.tasks)
    gantt.init(this.ganttContainer);
    gantt.clearAll();
    gantt.parse(this.props.tasks);
    // gantt.refreshData();
    gantt.render();
  }
  
  render() {
    
    this.setZoom(this.props.zoom);
    return (
        <div
            ref={(input) => { this.ganttContainer = input }}
            style={{width: '100%', height: '100%'}}
        ></div>
    );
  }
}