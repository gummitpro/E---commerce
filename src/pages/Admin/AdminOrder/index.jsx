import Header from '../../commom/HeaderAdmin';
import Footer from '../../commom/FooterAdmin';
import SideBar from '../../commom/SidebarAdmin';
import { Table, Badge, Row, Col, Space, Select, Button, Modal, Input, message, Popconfirm } from 'antd';
import { getOrderAdminAction, getUserListAction, changeStatusAction, getOrderFilterAdminAction, removeOrderAdminAction } from '../../../redux/actions'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function AdminOrder({ getOrder, orderList, getUserList, changeStatus, getOrderFilter, removeOrder }) {

  useEffect(() => {
    getOrder()
    getUserList()
  }, [])

  const { Search } = Input;
  const [searchKey, setSearchKey] = useState('')
  const onSearch = value => setSearchKey(value)

  const filterOrderList = orderList.data.filter((item) => {
    return item.user.email.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
  });

  const [isShowModal, setIsShowModal] = useState(false);
  const [isRecord, setRecord] = useState();


  function handleEdit(value) {
    changeStatus({
      id: isRecord.id,
      status: value
    })
  }
  function editModal() {
    return (
      <Modal
        title="Chi tiết đơn hàng"
        centered
        visible={isShowModal}
        onOk={() => (setIsShowModal(false), message.success("Thay đổi thành công"))}
        onCancel={() => setIsShowModal(false)}
        width={1000}
      >
        <div className='info-buy'>
          <div>
            <h2>Thông tin mua hàng</h2>
            <Row style={{ marginTop: '15px' }}>
              <Col span={8}>
                <div className='user-buy'>
                  <Space direction='vertical'>
                    <h3>Tài khoản thanh toán:</h3>
                    <div>{`Tài khoản: ${isRecord.user.email}`}</div>
                    <div>{`Tên: ${isRecord.user.userName}`}</div>
                    <div>{`Giới tính: ${isRecord.user.gender ? isRecord.user.gender : ""}`}</div>
                    <div>{`Điện thoại: ${isRecord.user.phone ? isRecord.user.phone : ""}`}</div>
                    <div>{`Ngày sinh: ${isRecord.user.date ? isRecord.user.date : ""}`}</div>
                    <div>{`Thời gian mua: ${isRecord.currentTime}`}</div>
                  </Space>
                </div>
              </Col>
              <Col span={16}>
                <div className='product-buy'>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <h3>Sản phẩm mua:</h3>
                    <div className='info-product-container' style={{ width: '100%' }}>
                      {isRecord.cart.map((item) => {
                        return <Row style={{ width: '100%' }}>
                          <Col span={4}>
                            <img src={item.image} alt="img-g" height='80px' width='auto' />
                          </Col>
                          <Col span={6}>
                            <div>{item.name}</div>
                          </Col>
                          <Col span={8}>
                            <Space direction='vertical'>
                              {`Số lượng: ${item.quantity}`}
                              {item.productOptions.memory ? `Memory:   ${item.productOptions.memory}`
                                : null
                              }
                            </Space>
                          </Col>
                          <Col span={6}>
                            {item.productOptions.price ? (item.price + item.productOptions.price).toLocaleString()
                              : item.price.toLocaleString()
                            }
                          </Col>
                        </Row>
                      }
                      )}
                    </div>
                  </Space>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <h2>Thông tin nhận hàng</h2>
            <Row style={{ marginTop: '15px' }}>
              <Col span={8}>
                <div>{`Tên người nhận: ${isRecord.consigneeInfor.name}`}</div>
                <div>{`Số điện thoại: ${isRecord.consigneeInfor.phone}`}</div>
              </Col>
              <Col span={8}>
                <div>{`Địa chỉ: ${isRecord.consigneeInfor.village}, ${isRecord.consigneeInfor.wards}, ${isRecord.consigneeInfor.district}, ${isRecord.consigneeInfor.city}`}</div>
                <div>{`Ghi chú: ${isRecord.consigneeInfor.noteOrder}`}</div>
              </Col>
              <Col span={8}>
                <div>Trạng thái:
                  <Select defaultValue={isRecord.status} style={{ width: '200px' }} onChange={handleEdit}>
                    <Select.Option value={1}>Chờ hàng</Select.Option>
                    <Select.Option value={2}>Đang vận chuyển</Select.Option>
                    <Select.Option value={3}>Đã nhận</Select.Option>
                  </Select>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    )
  }

  function TableShow() {

    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      {
        title: 'Tên tài khoản', key: 'userId',
        render: (record) => record.user.email
      },
      {
        title: 'Trạng thái', dataIndex: 'status', key: 'status',
        render: (record) => <Space>{record === 1
          ?
          <span>
            <Badge status="warning" />
          Chờ hàng
        </span> : record === 2
            ? <span>
              <Badge status="processing" />
          Đang vận chuyển
        </span> : <span>
              <Badge status="success" />
         Đã nhận
        </span>
        }</Space>
      },
      {
        title: 'Thời gian đặt', dataIndex: 'currentTime', key: 'currentTime',
      },
      {
        title: 'Sản phẩm', dataIndex: 'cart', key: 'cart',
        render: (record) => record.map((item) => {
          return <div style={{ display: 'flex', flexDirection: 'column' }}>
            {item.quantity} x {item.name}</div>
        })
      },
      {
        title: 'Tổng tiền', dataIndex: 'totalOrder', key: 'totalOrder',
        render: (record) => record.toLocaleString()
      },
      {
        title: 'Chú thích', dataIndex: 'consigneeInfor', key: 'consigneeInfor',
        render: (record) => record.noteOrder
      },
      {
        title: '', key: 'edit',
        render: (record) => 
        <Space>
          <Button
            icon={< EditOutlined />}
            onClick={() => (setIsShowModal(true), setRecord(record))}
          >

          </Button>
          <Popconfirm
          title={`Bạn có chắc muốn xóa`}
          onConfirm={() => (removeOrder({ id: record.id }), message.success("Xoá thành công"))}
          okText="Xóa"
          cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined/>}
              >
            </Button>
          </Popconfirm>
        </Space>
      }
    ];

    return (

      <Table
        className="components-table"
        columns={columns}
        dataSource={filterOrderList}
      />

    );
  }

  return (
    <>
      <Header />
      <div className='user-manager' style={{ width: '100%', padding: '10px 0px' }}>
        <Row className='row' gutter={24} style={{ width: '100%', margin: '10px 0px !important' }}>
          <Col span={6}>
            <SideBar />
          </Col>
          <Col span={18}>
            <div><h2>Quản lý đơn hàng</h2></div>
            <div className='action-bar'>
              <div style={{display: 'flex'}}>Lọc theo:
                <div>
                  <Select placeholder="Trạng thái" allowClear onChange={(value) => getOrderFilter({status: value})}>
                    <Select.Option value={1}>Chờ hàng</Select.Option>
                    <Select.Option value={2}>Đang vận chuyển</Select.Option>
                    <Select.Option value={3}>Đã nhận</Select.Option>
                  </Select>
                </div>
              </div>
              <Search placeholder="Tìm kiếm ..." allowClear onSearch={onSearch} style={{ width: 200 }} />
            </div>
            {TableShow()}
            {isShowModal ? editModal() : null}
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  )
}
const mapStateToProps = (state) => {
  const { orderList } = state.adminOrderReducer
  return {
    orderList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (params) => dispatch(getOrderAdminAction(params)),
    getOrderFilter: (params) => dispatch(getOrderFilterAdminAction(params)),
    getUserList: (params) => dispatch(getUserListAction(params)),
    changeStatus: (params) => dispatch(changeStatusAction(params)),
    removeOrder: (params) => dispatch(removeOrderAdminAction(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminOrder);