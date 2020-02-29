import React, { Component } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Icon,
  Input,
  Modal,
  Radio,
  Row,
  Table,
  Tag
} from 'antd';
import CreateUserModal from './CreateUserModal';
import './styles.css';
import { userService } from '../../../services';
import EditUserModal from './EditUserModal';
import { connect } from 'react-redux';
import { loadingActions, notifyActions } from '../../../actions';

const { confirm } = Modal;

class UserList extends Component {
  state = {
    data: [],
    editingKey: '',
    selectedOption: 1,
    isCreateUserModal: false,
    isEditUserModal: false,
    rowData: {}
  };

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Họ tên',
        dataIndex: 'fullName',
        width: '15%',
        editable: true,
        sorter: (a, b) => a.fullName.length - b.fullName.length
      },
      {
        title: 'CMND',
        dataIndex: 'ID',
        width: '10%',
        editable: true,
        sorter: (a, b) => +a.ID.length - +b.ID.length
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        width: '20%',
        editable: true,
        sorter: (a, b) => a.address.length - b.address.length
      },
      {
        title: 'SĐT',
        dataIndex: 'phoneNumber',
        width: '10%',
        editable: true,
        sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: '15%',
        editable: true,
        sorter: (a, b) => a.email.length - b.email.length
      },
      {
        title: 'Chức danh',
        dataIndex: 'position',
        width: '10%',
        editable: true,
        sorter: (a, b) => a.position.length - b.position.length,
        render: tag => (
          <span>
            <Tag color="green" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          </span>
        )
      },
      {
        title: 'Action 1',
        dataIndex: 'action1',
        width: '5%',
        editable: true,
        render: (text, record) => (
          <Button
            size="small"
            type="primary"
            onClick={() => {
              this.openEditUserModal(record);
            }}
          >
            <Icon type="edit" />
            Sửa
          </Button>
        )
      },
      {
        title: 'Action 2',
        dataIndex: 'action2',
        width: '5%',
        editable: true,
        render: (text, record) => (
          <Button
            size="small"
            type="danger"
            style={{ marginLeft: 10 }}
            onClick={() => {
              this.showDeleteConfirm(
                record,
                this.props.notify_success,
                this.props.notify_failure,
                this.handleReload
              );
            }}
          >
            <Icon type="delete" />
            Xóa
          </Button>
        )
      }
    ];
  }

  componentDidMount = async () => {
    await this.getData();
  };

  getData = async () => {
    // start loading
    this.props.startLoading();
    // call api to get user list
    const result = await userService.getList({ limit: 10, page: 1 });

    // success request
    if (result.success) {
      const userList = [];
      const { data } = result;
      // eslint-disable-next-line array-callback-return
      data.docs.map((item, idx) => {
        userList.push({
          ...item,
          key: idx
        });
      });

      //end loading
      setTimeout(() => {
        this.props.endLoading();
        this.setState({ data: userList });
      }, 1000);
    } else {
      this.props.endLoading();
    }
  };

  handleReload = async () => {
    await this.getData();
  };

  onChangeSelectedOption = e => {
    this.setState({ selectedOption: e.target.value });
  };

  openCreateUserModal = () => {
    this.setState({
      isCreateUserModal: true
    });
  };

  closeCreateUserModal = () => {
    this.setState({
      isCreateUserModal: false
    });
  };

  openEditUserModal = record => {
    console.log("STRING")
    this.setState(
      {
        rowData: record
      },
      () => {
        this.setState({ isEditUserModal: true });
      }
    );
  };

  closeEditUserModal = () => {
    this.setState({
      isEditUserModal: false,
      rowData: {}
    });
  };

  showDeleteConfirm = (record, notifySuccess, notifyFailre, handleReload) => {
    confirm({
      title: 'Bạn có chắc chắn xóa user này?',
      content: 'Nhấn "Đồng ý" nếu bạn muốn xóa.',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        const result = await userService.deleteUser(record._id);

        if (result.success) {
          notifySuccess('Xóa thành công!'); // show success notification
          handleReload(); // reload page
        } else {
          notifyFailre('Xóa thất bại!'); // show failure notification
        }
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  expandedRowRender = record => {
    const columns = [
      {
        title: 'Hiệu lực CODE',
        dataIndex: 'codeDurationTime',
        key: 'codeDurationTime'
      },
      { title: 'CODE', dataIndex: 'code', key: 'code' },
      { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' }
    ];
    const data = [];
    // replace new key
    record.key = 'expand';
    data.push(record);

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  // this function use to generate a random key
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const { isCreateUserModal, isEditUserModal, rowData } = this.state;

    return (
      <div className="content-layout">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Card style={{ width: '100%', marginBottom: 10 }}>
            <Row gutter={16}>
              <Col span={3}>
                <Button ghost type="primary" onClick={this.openCreateUserModal}>
                  <Icon type="plus-circle" />
                  Tạo mới
                </Button>
              </Col>
              <Col span={8}>
                <Input
                  style={{ width: '100%' }}
                  placeholder="Nhập vào thông tin tìm kiếm!"
                />
              </Col>
              <Col span={12}>
                <Radio.Group
                  defaultValue={1}
                  onChange={this.onChangeSelectedOption}
                  value={this.state.selectedOption}
                >
                  <Radio value={1}>Tên người dùng</Radio>
                  <Radio value={2}>Email</Radio>
                  <Radio value={3}>Số điện thoại</Radio>
                  <Radio value={4}>CMND</Radio>
                </Radio.Group>
                <Button style={{ marginLeft: 20 }}>Tìm kiếm</Button>
              </Col>
            </Row>
          </Card>
        </Form>
        <Table
          bordered
          dataSource={this.state.data}
          columns={this.columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel
          }}
          expandedRowRender={record => this.expandedRowRender(record)}
        />
        <CreateUserModal
          key={this.getRndInteger(101, 200)}
          isOpen={isCreateUserModal}
          onClose={this.closeCreateUserModal}
          reload={this.handleReload}
        />
        <EditUserModal
          key={this.getRndInteger(1, 100)}
          isOpen={isEditUserModal}
          onClose={this.closeEditUserModal}
          data={rowData}
          reload={this.handleReload}
        />
      </div>
    );
  }
}

const UserManage = Form.create({ name: 'user_list' })(UserList);

const actionCreators = {
  startLoading: loadingActions.start,
  endLoading: loadingActions.end,
  notify_success: notifyActions.success,
  notify_failure: notifyActions.failure
};

export default connect(null, actionCreators)(UserManage);
