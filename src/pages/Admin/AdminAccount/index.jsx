import Header from '../../commom/HeaderAdmin';
import Footer from '../../commom/FooterAdmin';
import SideBar from '../../commom/SidebarAdmin';
import { connect } from 'react-redux';
import { useState } from 'react';
import { editUserAdminAction } from '../../../redux/actions'
import { EditOutlined } from '@ant-design/icons'
import './style.css'
import { Row, Col, Button, Form, Input, message, DatePicker, Radio } from 'antd';
import moment from 'moment';

function AdminAccount({ editUser }) {

  const [isDis, setIsDis] = useState(true)
  const [isHidden, setIsHidden] = useState(true)
  const [changePass, setChangePass] = useState(false)

  var localUserInfo = JSON.parse(localStorage.getItem("userInfo"));

  function handleEditUser(values) {
    setIsDis(true)
    setChangePass(false)
    setIsHidden(true)
    const newValues = { ...values, date: values.date.format('DD/MM/YYYY') }
    editUser(newValues)
    message.success("Thay đổi thành công")
  }
  return (
    <>
      <Header />
      <div className='user-manager' style={{ width: '100%', padding: '10px 0px' }}>
        <Row gutter={24} style={{ width: '100%'}}>
          <Col span={6}>
            <SideBar />
          </Col>
          <Col span={18}>
            <div><h2>Quản lý tài khoản</h2></div>
            <div style={{ width: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px', paddingBottom: '20px' }}>
              <div className='img-profile-ac'>
                <img src="https://via.placeholder.com/200x200" alt="img-profile" />
                <div className='btn-edit'>
                  <Button shape='circle' size='middle' icon={<EditOutlined />}
                    onClick={() => (setIsDis(!isDis), setIsHidden(!isHidden))}
                  >
                  </Button>
                </div>
              </div>
              <div className='form-container'>
                <Form
                  layout='vertical'
                  initialValues={{
                    id: localUserInfo.id,
                    userName: localUserInfo.userName,
                    email: localUserInfo.email,
                    gender: localUserInfo.gender,
                    phone: localUserInfo.phone,
                    date: moment(localUserInfo.date)
                  }}
                  onFinish={(values) => {
                    changePass
                      ?
                      (values.oldPass === localUserInfo.password ? handleEditUser(values) : message.error("Mật khẩu cũ sai"))
                      : handleEditUser(values)
                  }
                  }
                >
                  <div className='form-pro'>
                    <Form.Item name='id' hidden>
                      <Input disabled />
                    </Form.Item>
                    <div className='info' >
                      <Form.Item label='Tên' name='userName' rules={[
                        {
                          required: true,
                          message: 'Hãy nhập thông tin',
                        }]}>
                        <Input disabled={isDis} />
                      </Form.Item>
                      <Form.Item label='Email' name='email' rules={[
                        {
                          required: true,
                          pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
                          message: "Sai định dạng!"
                        }]}>
                        <Input
                          
                          disabled={isDis} />
                      </Form.Item>
                      <Form.Item label="Ngày sinh" name='date'>
                        <DatePicker disabled={isDis} format="DD/MM/YYYY" />
                      </Form.Item>
                      {isHidden ?
                        null
                        :
                        <Form.Item label='Mật khẩu cũ' name='oldPass'
                          validateFirst
                          rules={[
                            {
                              required: changePass,
                              message: 'Hãy nhập mật khẩu cũ',
                            }
                          ]}
                        >
                          <Input.Password onChange={() => setChangePass(true)} />
                        </Form.Item>
                      }
                    </div>
                    <div className='info'>
                      <Form.Item
                       rules={[
                        {
                          pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                          message: "Sai định dạng!"
                        }
                      ]} 
                      label='Số điện thoại' name='phone' >
                        <Input disabled={isDis} />
                      </Form.Item>
                      <Form.Item label="Giới tính" name='gender'>
                        <Radio.Group disabled={isDis}>
                          <Radio value="Nữ">Nữ</Radio>
                          <Radio value="Nam">Nam</Radio>
                          <Radio value="Khác">Khác</Radio>
                        </Radio.Group>
                      </Form.Item>
                      {isHidden ? null
                        : <><Form.Item label='Mật khẩu mới' name='newPass'
                          rules={[
                            {
                              required: changePass,
                              pattern: new RegExp(/^(?=.*?[0-9]).{6,}$/g),
                              message: 'Mật khẩu ít nhất 6 ký tự',
                              
                            }]}
                        >
                          <Input.Password hidden={isHidden} onChange={() => setChangePass(true)}/>
                        </Form.Item>
                          <Form.Item
                            name="confirm"
                            label="Xác nhận mật khẩu mới"
                            dependencies={['newPass']}
                            validateFirst
                            rules={[
                              {
                                required: changePass,
                                message: 'Hãy xác nhận mật khẩu mới',
                                
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (getFieldValue('newPass') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('Mật khẩu xác nhận sai'));
                                },
                              }),
                            ]}
                          >
                            <Input.Password hidden={isHidden} />
                          </Form.Item>
                        </>}
                    </div>
                  </div>
                  <div className='btn-save'>
                    {isDis ? null : <Button htmlType='submit' size='large' >Lưu thay đổi</Button>}
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer
  return {
    userInfo,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (params) => dispatch(editUserAdminAction(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccount)