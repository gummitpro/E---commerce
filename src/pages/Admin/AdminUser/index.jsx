import Header from '../../commom/HeaderAdmin';
import Footer from '../../commom/FooterAdmin';
import SideBar from '../../commom/SidebarAdmin';
import './style.css'

import { getUserListAction, removeUserAction, getUserFilterAdminAction, changeStatusUserAdminAction } from '../../../redux/actions'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { Table, Row, Col, Button, Input, Popconfirm, Badge, Space, Select, Form, Popover, message } from 'antd';
import { DeleteOutlined, DisconnectOutlined } from '@ant-design/icons';


function AdminUser({ userList, getUserList, removeUser, getUserFilter, changeUser }) {
  useEffect(() => {
    getUserList()
  }, [])
  const { Search } = Input;

  const { Option } = Select;

  const [isEdit, setIsEdit] = useState()
  const [searchKey, setSearchKey] = useState('')
  


  const onSearch = value => setSearchKey(value)
  var localUserInfo = JSON.parse(localStorage.getItem("userInfo"));

  const tableData = userList.data.map((item) => {
    return {
      ...item,
      key: item.id
    }
  })


  const filterUserList = tableData.filter((item) => {
    return item.userName.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
  });

  function handleChange(values) {

    changeUser({ id: isEdit.id, status: values.status, admin: values.admin })
    message.success("Thay đổi thành công")
  }

  function handleRemove(id) {
    removeUser(id)
  }


  function TableShow() {

    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Tên', dataIndex: 'userName', key: 'userName' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      {
        title: 'Trạng thái', dataIndex: 'status', key: 'status',
        render: (record) =>
          <Space>
            {record
              ? <span>
                <Badge status="success" />
                Đang sử dụng
              </span>
              : < span >
                <Badge status="error" />
                Tạm khoá
              </span>
            }
          </Space >
      },
      {
        title: 'Quyền hạn', dataIndex: 'admin', key: 'admin',
        render: (record) => record ? "Admin" : "User"
      },
      {
        title: '', key: 'delete', render: (record) =>
          <Space>
            <Popover placement="left"
              content={
                <Form layout="vertical" style={{ width: '150px' }}
                  initialValues={{ status: record.status, admin: record.admin }}
                  onFinish={(values) => handleChange(values)}
                >
                  <Form.Item name="id" hidden></Form.Item>
                  <Form.Item name="status" label="Trạng thái">
                    <Select>
                      <Option value={true}>Đang sử dụng</Option>
                      <Option value={false}>Tạm khoá</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="admin" label='Quyền'>
                    <Select>
                      <Option value={true}>Admin</Option>
                      <Option value={false}>User</Option>
                    </Select>
                  </Form.Item>
                  <Button style={{ marginTop: "5px", width: '100%' }} htmlType="submit">Lưu</Button>
                </Form>

              }
              trigger="click">
              <Button type='ghost' disabled={record.email === localUserInfo.email ? true : false} icon={<DisconnectOutlined />} onClick={() => setIsEdit(record)}></Button>
            </Popover>

            <Popconfirm
              title={`Bạn có chắc muốn xóa`}
              onConfirm={() => handleRemove({ id: record.id })}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger disabled={record.email === localUserInfo.email ? true : false} icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </Space>
      },
    ];

    return (

      <Table
        className="components-table"
        columns={columns}
        loading={userList.load}
        dataSource={filterUserList}
        expandable={{
          expandedRowRender: (record) => {
            const expandData = record.orders.map((item) => {
              return {
                ...item,
                key: item.id
              }
            })
            const columns = [
              {
                title: 'Sản phẩm', dataIndex: 'cart', key: 'cart',
                render: (record) => record.map((item) => {
                  return <div>
                    {item.quantity} x {item.name}
                  </div>
                })
              },
              {
                title: 'Thêm', dataIndex: 'cart', key: 'productOptions',
                render: (record) => record.map((item) => {
                  return <div>
                    {item.productOptions.title},{item.productOptions.memory}
                  </div>
                })
              },

              { title: 'Thời gian mua', dataIndex: 'currentTime', key: 'currentTime' },
              {
                title: 'Tổng giá', dataIndex: 'total', key: 'total',
                render: (record) => record.toLocaleString()
              },

            ];
            return <Table columns={columns} dataSource={expandData} pagination={false} />;
          },

        }}
      />

    );
  }

  return (
    <>
      <Header />
      <div className='user-manager' style={{ padding: '10px 0px' }}>
        <Row className='row' gutter={24} style={{ width: '100%' }}>
          <Col span={6}>
            <SideBar />
          </Col>
          <Col span={18}>
            <div><h2>Quản lý tài khoản</h2></div>
            <div className='action-bar'>
              <div>Lọc theo:
                <Select placeholder="Trạng thái" allowClear onChange={(value) => getUserFilter({ status: value })}>
                  <Select.Option value={true}>Đang sử dụng</Select.Option>
                  <Select.Option value={false}>Tạm khoá</Select.Option>
                </Select>
              </div>
              <Search placeholder="Tìm kiếm ..." allowClear onSearch={onSearch} style={{ width: 200 }} />
            </div>
            {TableShow()}
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => {

  const { userList } = state.userReducer
  return {
    userList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (params) => dispatch(getUserListAction(params)),
    removeUser: (params) => dispatch(removeUserAction(params)),
    getUserFilter: (params) => dispatch(getUserFilterAdminAction(params)),
    changeUser: (params) => dispatch(changeStatusUserAdminAction(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);