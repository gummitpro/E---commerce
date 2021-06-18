import { Menu, Button } from 'antd';
import {
  PieChartOutlined,
  CodepenOutlined,
  AuditOutlined,
  ContactsOutlined,
  UsbOutlined
} from '@ant-design/icons';

import history from '../../../utils/history'
import { useState } from 'react';

function SideBar() {

  const [choose,setChoose] = useState("")
  console.log("🚀 ~ file: index.jsx ~ line 16 ~ SideBar ~ choose", choose)

  return (
    <Menu
      style={{
        width: '100%',
        minHeight: '100%',
        borderRadius: '8px',
        fontSize: '18px',
      }}
      onSelect={(key) => setChoose(key)}
      defaultSelectedKeys={['1']}
      selectedKeys={[choose.key]}
      mode="inline"
    >
      <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => history.push('/admin')}>
        DashBoard
        </Menu.Item>
      <Menu.Item key="2" icon={<AuditOutlined />} onClick={() => history.push('/admin-order')}>
        Quản lý đơn hàng
        </Menu.Item>
      <Menu.Item key="3" icon={<CodepenOutlined />} onClick={() => history.push('/admin-product')}>
        Quản lý sản phẩm
        </Menu.Item>
      <Menu.Item key="4" icon={<ContactsOutlined />} onClick={() => history.push('/admin-user')}>
        Quản lý thành viên
        </Menu.Item>
      <Menu.Item key="5" icon={<UsbOutlined />} onClick={() => history.push('/admin-account')}>
        Quản lý tài khoản
        </Menu.Item>
    </Menu>
  )
}
export default SideBar;