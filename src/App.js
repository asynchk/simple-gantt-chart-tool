/*global gantt*/
import React, { Component } from 'react';

import Button from 'antd/lib/button'; 
import { Table, Popconfirm } from 'antd'
import Gantt from './Gantt';
import Toolbar from './Toolbar';
import './App.css';
import moment from 'moment';

import transformInputData from './util';
import { inputData }  from './dataSource';

import { EditableRow, EditableFormRow, EditableCell } from './EditableCell';

import Modal from './Modal';

// import DatePicker from './Datepicker';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

 
class App extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   editable: false,
    // },
    {
      title: 'Task',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      render: text => <a href="javascript:;">{text}</a>
    }, {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      editable: true,
    },
    {
      title: 'Dependencies (please use comma (,) to separate dependencies e.g. T1,T2,T3',
      dataIndex: 'dependencies',
      key: 'dependencies',
      editable: true,
      isDependencies: true,
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        // console.log('record', record);
            if (this.state.dataSource.find(
              data => {
                if (data.dependencies && data.dependencies.length) {
                  // console.log('checking', record.id, 'and its dependencies', data.dependencies)
                return data.dependencies.includes(record.name);
                } return false;
              }
            )) {
              return(
                this.state.dataSource.length >= 1
                  ? (
                    <Popconfirm title="It is a dependency of others">
                      <p href="javascript:;">Can't Delete</p>
                    </Popconfirm>
                  ) : null
              );
            }
            return (
          this.state.dataSource.length >= 1
            ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => {
                this.handleDelete(record.id)
                }}>
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            ) : null
        );
              
      },
    }
    ];
    this.state = {
      isLoading: false,
      currentZoom: 'Days',
      showChart: false,
      isWithSampleData: false,
      startData: moment().subtract(3, 'months'),
      endDate: moment(),
      // dataSource: inputData.data,
      dataSource: [],
      showModal: false,
    };
    this.handleZoomChange = this.handleZoomChange.bind(this);
    this.handleShowButton = this.handleShowButton.bind(this);
    this.onClickSampleData = this.onClickSampleData.bind(this);
    this.handleRefreshButton = this.handleRefreshButton.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onClickModalButton = this.onClickModalButton.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  handleZoomChange(zoom) {
    this.setState({
      currentZoom: zoom
    });
  }

  handleShowButton() {
    console.log('handleShowButton');
    this.setState({
      showChart: !this.state.showChart,
    })
  }
  onChangeDate(date, dateString) {
    console.log(date, dateString);
    this.setState({ startData: date})
    this.handleRefreshButton()
  }
  handleRefreshButton() {
    console.log('handleRefreshButton');
    this.setState({
      isLoading: true,
    })
    setTimeout(() => {
      this.setState({
        showChart: true,
        isLoading: false,
      })
    }, 200);

  }

  handleModalClick() {
    this.setState({
      showModal: false,
    })
  }
  onClickModalButton() {
    this.setState({
      showModal: true,
    })
  }
  onClickSampleData() {
    const isGoingToShowSamnpleData = !this.state.isWithSampleData
    console.log('handleShowButton');
    if (isGoingToShowSamnpleData) {
      this.setState({
        showChaisWithSampleDatart: true,
        dataSource: inputData.data,
      })
    } else {
      this.setState({
        showChaisWithSampleDatart: !this.state.showChart,
      })
    }
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    let newCount = count;
    if (typeof count !== 'number'){
      newCount = Math.max(...dataSource.map(activity => activity.id)) + 1
    }
    if (newCount === -Infinity) {
      newCount = 1;
    }
    // console.log('newCount', typeof newCount, !!newCount)
    // const reverseData = [...dataSource].reverse()[0]['id'];
    const newData = {
      id: newCount,
      name: `T${newCount}`,
      duration: 1,
      dependencies: null,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: newCount + 1,
    });
  }

  handleSave = (row) => {
    console.log('row', row);
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log(newData)
    // debugger;
    this.setState({ dataSource: newData });
  }

  handleDelete = (key) => {

    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== key) });
  }

  componentDidUpdate() {
    // const { showChart, startData } = this.state;
    // const result = transformInputData(this.state.dataSource, startData)()
    // const data = { data: result } ;
    // debugger;
    // gantt.parse(data);
    // gantt.render();
  }

  render() {
    const {
      showChart,
      startData,
      isWithSampleData,
      isLoading,
     } = this.state;

    const result = transformInputData(this.state.dataSource, startData)()

    console.log('dataSource', this.state.dataSource, 'result', result)
    const data = { data: [...result] } ;
    
    const editableColumns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    return (
      <div>
        <Toolbar
          zoom={this.state.currentZoom}
          onZoomChange={this.handleZoomChange}
          showChart={showChart}
          onClickShowButton={this.handleShowButton}
          onClickSampleData={this.onClickSampleData}
          isWithSampleData={isWithSampleData}
          handleRefreshButton={this.handleRefreshButton}
          onChangeDate={this.onChangeDate}
          defaultValue={this.state.startData}
        />
        <Modal
        
        />
        {
          showChart && !isLoading &&
          <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={this.state.currentZoom}
          />
        </div>
        }
        {/* <Button type="primary">Button</Button> */}
        <div className="activity-table-container">
        <Table
          dataSource={this.state.dataSource}
          columns={editableColumns}
          components={components}
          rowClassName={() => 'editable-row'}


          pagination={false}
          rowSelection={rowSelection}
          bordered
          />
          <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add an activity
        </Button>
        </div>
        
        


      </div>
    );
    
  }
}
export default App;
