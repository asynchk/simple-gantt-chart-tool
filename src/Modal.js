import React from 'react';

import { Modal, Button } from 'antd';

class ModalMessage extends React.PureComponent {
    render() {
        const { visable, handleOk } = this.props;
        return (
            <Modal
          title="Instructions"
          visible={visable}
          onOk={handleOk}
          onCancel={handleOk}
        >
          <p>To Start, Press <b>Add An Activity</b> button, and edit the activity.</p>
          <p>To render the Gantt Chart, Press <b>Render Chart Button</b> button.</p>
        </Modal>
        )
    }
}

export default ModalMessage;