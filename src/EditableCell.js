import React from 'react';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const EditableContext = React.createContext();

export const EditableRow = (props, others) => {
    const { form, index, ...otherprops } = props
    // console.log('EditableRow', props, others);
    return (
  <EditableContext.Provider value={form}>
    <tr {...otherprops} />
  </EditableContext.Provider>
)
    };

export const EditableFormRow = Form.create()(EditableRow);

export class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing && this.props.dataIndex!=='dependencies') {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
        console.log('this.form.validateFields', values)
        if (error) {
            return;
          }
        const newValues = {...values};
        if (values.dependencies) {
            const value = values.dependencies;
            console.log(value, typeof value);
            if ( typeof value === 'string') {
                let str = value;
                str.replace(/\s/g, '');
                const values = str.split(",");
              const valuesWithSpace = str.split(", ");
              let splitValues = values;
              if (values.length === valuesWithSpace.length) {
                splitValues = valuesWithSpace;
              }
                console.log('transformed real', values);
              if (splitValues) {
                // return values
                newValues.dependencies = splitValues
                } else {
                    newValues.dependencies = [str]
                }
              } else if ( Array.isArray(value)) {
                console.log('transformed real is array already', value);
                //   return value;
                  newValues.dependencies = value
              } else {
                newValues.dependencies = null;
              }
              
        }

      console.log('newValues', newValues)

      this.toggleEdit();
      handleSave({ ...record, ...newValues });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      isDependencies,
      ...restProps
    } = this.props;
    // console.log(this.props);
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                  editing && dataIndex==='dependencies' ? (
                    <FormItem>
                        {form.getFieldDecorator('dependencies', {
                            initialValue: record[dataIndex],
            rules: [
              {
                  required: false,
                  message: 'Please fill any dependency',
                  
                  transform: (value) => {
                      // console.log('transform', value);
                      if ( typeof value === 'string') {
                        let str = value;
                        str.replace(/\s/g, '');
                        const values = str.split(",");
                        // console.log('transformed', values);
                        return values
                      } 
                      if ( Array.isArray(value)) {
                        // console.log('transformed', value);
                          return value;
                      }
                      return null;
                  },
                  validator: (rule, value, callback) => {
                    // console.log('rule, value, callback')
                    // console.log(rule, value, callback);
                    callback()
                }
             
                //   type: 'array'
                },
            ],
          })(
            <Input
            ref={node => (this.input = node)}
            onPressEnter={() =>this.save}
          />
          )}
                    </FormItem>
                  ) :
                  editing && dataIndex === 'name' ? (
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(dataIndex, {
                        rules: [{
                          required: true,
                          message: `${title} is required and unique`,
                        },
                      ],
                        initialValue: record[dataIndex],
                      })(
                        <Input
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                        />
                      )}
                    </FormItem>
                  ):
                    editing && dataIndex === 'duration' ? (
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(dataIndex, {
                        rules: [{
                          required: true,
                          message: `${title} is required.`,
                        },
                      {
                        type: 'number',
                        message: `${title} must be number in hours.`,
                        transform: (value) => {
                          // console.log('transform', value);
                          return Number(value)

                        },
                      }],
                        initialValue: record[dataIndex],
                      })(
                        <Input
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                        />
                      )}
                    </FormItem>
                  ):
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      },
                    ],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}
