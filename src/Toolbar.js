import React, { Component } from 'react';
import DatePicker from './Datepicker';
 
// import './App.css'
export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.handleZoomChange = this.handleZoomChange.bind(this);
  }
 
  handleZoomChange(e) {
    if(this.props.onZoomChange){
      this.props.onZoomChange(e.target.value)
    }
  }
 
  render() {
    const { showChart, isWithSampleData, onChangeDate, defaultValue } = this.props;
    let zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
      let isActive = this.props.zoom === value;
      return (
        <label key={value} className={`radio-label ${isActive ? 'radio-label-active': ''}`}>
          <input type='radio'
             checked={isActive}
             onChange={this.handleZoomChange}
             value={value}/>
          {value}
        </label>
      );
    });


    const showHideButton = (
      <label
        key={showChart}
        className={`radio-label showchart ${showChart ? 'radio-label-active': ''}`}
      >
                  <input type='radio'
           
           onClick={this.props.onClickShowButton}
           value={showChart}/>
           {showChart? 'Hide Chart': 'Render Chart'}
        {/* <button type="button" onClick={this.props.onClickShowButton}>{showChart? 'Hide Chart': 'Show Chart'}</button> */}
      </label>
      )
    const showSampleButton = (
      <label
        key='isWithSampleData'
        className={`radio-label showchart ${isWithSampleData ? 'radio-label-active': ''}`}
      >
                  <input type='radio'
           
          onClick={this.props.onClickSampleData}
          value={isWithSampleData}/>
        {isWithSampleData? 'Clear Data': 'Fill Data'}
        {/* <button type="button" onClick={this.props.onClickShowButton}>{showChart? 'Hide Chart': 'Show Chart'}</button> */}
      </label>
      )
    const showRefreshButton = (
      <label
        key='showRefreshButton'
        className={`radio-label showchart ${showChart ? 'radio-label-active': ''}`}
      >
                  <input type='radio'
           
          onClick={() => { showChart && this.props.handleRefreshButton()}}
          value={showChart}/>
        Refresh
        {/* <button type="button" onClick={this.props.onClickShowButton}>{showChart? 'Hide Chart': 'Show Chart'}</button> */}
      </label>
      )
 
    return (
      <div className="zoom-bar">
        <b>Zooming: </b>
          {zoomRadios}
          <b> Show Gantt Chart</b>
          { showHideButton }
        {showRefreshButton }
          <b> Fill Form With Sample Data</b>
          { showSampleButton }
          <div className="datepickerform-container">
          <b> Start Date: </b>
          <DatePicker
          defaultValue={defaultValue}
            onChangeDate={onChangeDate}
          />
          </div>
          
      </div>
    );
  }
}