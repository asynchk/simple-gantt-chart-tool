import React from 'react';
// import './App.css';
import { Form, DatePicker, TimePicker, Button } from 'antd';
const FormItem = Form.Item;


class DatePickerForm extends React.PureComponent {
    render() {
        const { defaultValue, onChangeDate }  = this.props;

        return (<DatePicker defaultValue={defaultValue} onChange={(date, dateString) => onChangeDate(date, dateString)}/>);
        // return (
        // // <FormItem
        // //         className="datepickerform"
        // //     // {...formItemLayout}
        // //     label="DatePicker"
        // // >
        //     {/* {getFieldDecorator('date-picker', config)( */}
        //         <DatePicker></DatePicker>
        //     {/* )} */}
        // // </FormItem>
        // );
    }
}

export default DatePickerForm;