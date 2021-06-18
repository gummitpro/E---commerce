import { useEffect, useState } from 'react';
import {
  Form,
  Input,
} from 'antd';

function Specification({ saveValue }) {

  useEffect(() => {
    switch (saveValue) {
      case 1:
        setChoose(speLaptop);
        break;
      case 2:
        setChoose(spePhone);
        break;
      case 3:
        setChoose(speTivi);
        break;
      case 4:
        setChoose(speNetwork);
        break;
      case 5:
        setChoose(speMouserKey);
        break;
      case 6:
        setChoose(speAnother);
        break;
      default:
        break;
    }
  },[saveValue])
  const spePhone = {
    "Thương hiệu": "",
    "Nhóm sản phẩm": "",
    "Màu sắc": "",
    "Loại màn hình": "",
    "Độ phân giải": "",
    "Dung lượng (ROM)": "",
    "Hệ điều hành": "",
    "RAM": "",
    "Chip": "",
    "Pin": "",
    "Loại sim": "",
    "Camera sau": "",
    "Camera trước": "",
    "Khối lượng": ""
  }
  const speLaptop = {
    "Thương hiệu": "",
    "Thế hệ CPU": "",
    "CPU": "",
    "Chip đồ họa": "",
    "RAM": "",
    "Màn hình": "",
    "Lưu trữ": "",
    "Kết nối không dây": "",
    "Bàn phím": "",
    "Hệ điều hành": "",
    "Kích thước": "",
    "Pin": "",
    "Khối lượng": ""
  }
  const speTivi = {
    "Thương hiệu": "",
    "Kích thước": "",
    "Độ phân giải": "",
    "Loại Tivi": "",
    "Tần số quét": "",
    "Hệ điều hành": "",
    "Kết nối Internet": "",
    "Cổng USB": "",
    "Remote thông minh": "",
    "Điều khiển bằng điện thoại": "",
    "Kết nối bàn phím, chuột": "",
    "Công suất tiêu thụ": "",
    "Năm ra mắt": "",
    "Nơi sản xuất": ""
  }
  const speMouserKey = {
    "Thương hiệu": "",
    "Kiểu": "",
    "Kết nối": "",
    "Màu sắc": "",
    "Kiểu kết nối": "",
    "Đèn LED": "RGB",
    "Tần số phản hồi": "",
    "Khối lượng": ""
  }
  const speNetwork = {
    "Thương hiệu": "",
    "Băng tần hỗ trợ": "",
    "Chuẩn kết nối": "",
    "Cổng kết nối": "",
    "Ăng ten": "",
    "Tốc độ": "",
    "Nguồn điện cấp": "",
    "Kích thước sản phẩm": ""
  }
  const speAnother = {
    "Thương hiệu": "",
    "Công suất tối đa": "",
    "Cáp rời": "",
    "Số cổng cắm": "",
    "Quạt làm mát": ""
  }

  const [choose, setChoose] = useState({});

  return (
    Object.keys(choose).map((item, index) => {
      return <Form.Item key={index} label={item} name={item} style={{width: '220px'}}>
            <Input />
          </Form.Item>
       
    })
  )
}
export default Specification;