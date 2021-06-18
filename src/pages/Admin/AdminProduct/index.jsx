import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../commom/HeaderAdmin';
import Footer from '../../commom/FooterAdmin';
import SideBar from '../../commom/SidebarAdmin';
import Specification from './Specification';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './style.css'
import {
  Row,
  Col,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  InputNumber,
  Checkbox,
  Card,
  Upload
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';

import ProductOptionItem from './ProductOptionItem'

import {
  getProductListAdminAction,
  getProductFilterAdminAction,
  getCategoryListAdminAction,
  createProductAdminAction,
  editProductAdminAction,
  deleteProductAdminAction,
  createOptionAdminAction,
  setProductSelectAction,
  getInventoryAdminAction,
} from '../../../redux/actions'

function ProductListPage({
  getCategoryListAdmin,
  getProductFilterAdmin,
  getProductListAdmin,
  createProductAdmin,
  editProductAdmin,
  deleteProductAdmin,
  productList,
  categoryList,
  createOptionAdmin,
  setProductSelect,
  productSelected,
  getInventory,
  inventoryList
}) {

  const [isShowModify, setIsShowModify] = useState(false);
  const [isOptionForm, setIsOptionForm] = useState(false);
  const [isShowCreateOption, setIsShowCreateOption] = useState(false);
  const [saveValue, setSaveValue] = useState();
  const [searchKey, setSearchKey] = useState('')
  const [desData, setDesData] = useState('')
  const [isShowModal, setIsShowModal] = useState(true);

  const [productForm] = Form.useForm();
  const [categoryForm] = Form.useForm();

  console.log("🚀 ~ file: index.jsx ~ line 68 ~ productSelected", productSelected)
  const imageArr = productSelected.id
    ? productSelected.image.split() : null
  console.log("🚀 ~ file: index.jsx ~ line 69 ~ imageArr", imageArr)
  const formImages = productSelected.id
    ? imageArr.map((image, index) => ({
      uid: index,
      name: `image-${index + 1}.jpg`,
      thumbUrl: image,
    }))
    : []

  const initialValues = productSelected.id
    ? {
      ...productSelected,
      image: formImages,
    }
    : {}

  useEffect(() => {
    getProductListAdmin();
    getCategoryListAdmin();
    getInventory()
  }, []);

  useEffect(() => {
    if (isShowModify) {
      setIsShowCreateOption(false)
    }
  }, [isShowModify]);


  useEffect(() => {
    productForm.resetFields();
    setIsOptionForm(productSelected.productOptions?.length > 0);
  }, [productSelected.id]);

  useEffect(() => {
    categoryForm.resetFields();
    setIsOptionForm(productSelected.productOptions?.length > 0);
  }, [productSelected.id])


  const handleDes = (e, editor) => {
    const data = editor.getData()
    setDesData(data)
  }

  function handleEditProduct(record) {
    setIsShowModify(true);
    setProductSelect(record);

  }

  function handleCreateProduct() {
    setIsShowModify(true);
    setProductSelect({});
  }

  function modalInventory() {
    return(

    <Modal
        title="Sản phẩm hiện đang hết hàng"
        centered
        visible={inventoryList.data.length === 0 ? false : isShowModal}
        onOk={() => (setIsShowModal(false))}
        onCancel={() => setIsShowModal(false)}
        width={600}
    >
        {inventoryList.data.map((item) => {
          return <Row style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
            <Col span={4}>
              <img src={item.image} alt="img-g" height='80px' width='auto' />
            </Col>
            <Col span={10}>
              <div>{item.name}</div>
            </Col>
            <Col span={6}>
              <Space direction='vertical'>
                {`Số lượng: ${item.inventory}`}
              </Space>
            </Col>
            <Col span={4}>
              <Button onClick={() => (setIsShowModify(true),setProductSelect(item))}>Bổ sung</Button>
            </Col>
          </Row>
        }
        )}
    </Modal>
    )
  }

  function handleSubmitForm() {
    const values = productForm.getFieldsValue();
    const specify = categoryForm.getFieldValue();
    const newImages = values.image ? values.image.map((file) => file.thumbUrl).toString() : ""

    const newValue = {
      ...values,
      des: desData,
      image: newImages,
    }
    console.log("🚀 ~ file: index.jsx ~ line 132 ~ handleSubmitForm ~ newValue", newValue)
    if (productSelected.id) {
      editProductAdmin({ id: productSelected.id, ...newValue, specifications: specify });
    } else {
      createProductAdmin({ ...newValue, specifications: specify })
    }
    setIsShowModify(false)
    setIsShowModal(false)
  }

  const { Search } = Input;
  const onSearch = value => setSearchKey(value)

  const filterProductList = productList.data.filter((item) => {
    return item.name.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
  });


  const tableColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '100px',
      render: (record) => <Space><img src={record} height='40px' width='auto'></img></Space>
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '150px'
    },
    {
      title: 'Giá',
      dataIndex: 'minMaxPrice',
      key: 'minMaxPrice',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" ghost onClick={() => (handleEditProduct(record), setSaveValue(record.categoryId))}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Bạn có chắc muốn xóa ${record.name}`}
              onConfirm={() => deleteProductAdmin({ id: record.id })}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger ><DeleteOutlined /></Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  const tableData = filterProductList.map((productItem) => {
    let minValue = 0;
    let maxValue = 0;
    productItem.productOptions.forEach((option) => {
      if (option.price > maxValue) maxValue = option.price;
      if (option.price < minValue) minValue = option.price;
    })
    return {
      ...productItem,
      key: productItem.id,
      categoryName: productItem.category.name,
      minMaxPrice: productItem.productOptions.length > 0
        ? productItem.productOptions.length === 1
          ? (productItem.price + maxValue).toLocaleString()
          : `${(productItem.price + minValue).toLocaleString()} - ${(productItem.price + maxValue).toLocaleString()}`
        : productItem.price.toLocaleString()
    }
  });

  function renderCategoryOptions() {
    return categoryList.data.map((categoryItem, categoryIndex) => {
      return (
        <Select.Option key={categoryIndex} value={categoryItem.id} >
          {categoryItem.name}
        </Select.Option>
      )
    })
  }

  function renderCategoryFilter() {
    return categoryList.data.map((categoryItem, categoryIndex) => {
      return (
        <Select.Option key={categoryIndex} value={categoryItem.id} >
          {categoryItem.name}
        </Select.Option>
      )
    })
  }

  function renderCreateOptionForm() {
    return (
      <Card size="small" title="Thêm mới">
        <Form
          name="createProductOption"
          onFinish={(values) => {

            createOptionAdmin({
              productId: productSelected.id,
              ...values,
              setProductSelect,
            })
            setIsShowCreateOption(false);
          }}
        >
          <Form.Item
            name="memory"
            label="Tùy chọn"
            rules={[{ required: true, message: 'Bạn chưa điền tên của tùy chọn' }]}
          >
            <Input placeholder="Tùy chọn" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá thêm"
            rules={[{ required: true, message: 'Bạn chưa điền giá của tùy chọn' }]}
          >
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá thêm"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={() => setIsShowCreateOption(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">Thêm</Button>
            </Space>
          </Row>
        </Form>
      </Card>
    )
  }

  function renderProductOptionItems() {
    return productSelected.productOptions.map((optionItem, optionIndex) => {
      return (
        <ProductOptionItem
          key={optionIndex}
          optionItem={optionItem}
          productId={productSelected.id}
        />
      )
    })
  }

  function renderProductOptionForm() {
    return (
      <div style={{ marginTop: 16 }}>
        <h4>Danh sách tùy chọn</h4>
        {
          productSelected.id &&
          productSelected.productOptions.length > 0 &&
          renderProductOptionItems()
        }
        {isShowCreateOption
          ? renderCreateOptionForm()
          : (
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => setIsShowCreateOption(true)}
            >
              Thên tùy chọn
            </Button>
          )
        }
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className='product-manager' style={{ padding: '10px 0px' }}>
        <Row className='row' gutter={24} style={{ width: '100%' }}>
          <Col span={6}>
            <SideBar />
          </Col>
          <Col span={18}>
            <div><h2>Quản lý sản phẩm</h2></div>
            <div className='action-bar'>
              <div style={{ display: 'flex' }}>Lọc theo:
                <div>
                  <Select placeholder="Loại sản phẩm" allowClear onChange={(value) => getProductFilterAdmin({ categoryId: value })}>
                    {renderCategoryFilter()}
                  </Select>
                </div>
              </div>
              <Search placeholder="Tìm kiếm ..." allowClear onSearch={onSearch} style={{ width: 200 }} />
              <Button
                icon={<PlusOutlined />}
                onClick={() => handleCreateProduct()}
                style={{ color: 'white', backgroundImage: 'linear-gradient(to right, rgb(219, 135, 8), rgb(165, 21, 76))' }}
              >
                Thêm sản phẩm</Button>
            </div>
            <Table
              style={{ marginTop: '10px' }}
              loading={productList.load}
              columns={tableColumns}
              dataSource={tableData}
              expandable={{
                expandedRowRender: (record) => {
                  const expandData = record.productOptions.map((item) => {
                    return {
                      ...item,
                      key: item.id
                    }
                  })
                  const columns = [
                    { title: 'Thêm', dataIndex: 'memory', key: 'memory' },
                    {
                      title: 'Giá thêm', dataIndex: 'price', key: 'price',
                      render: (record) => record.toLocaleString()
                    }
                  ];
                  return <Table columns={columns} dataSource={expandData} pagination={false} />;
                },
                rowExpandable: (record) => record.productOptions.length > 0
              }}
            />
            <Modal
              title={productSelected.id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
              width={500}
              visible={isShowModify}
              onCancel={() => (setIsShowModify(false), setSaveValue(), setDesData(''))}
              footer={(
                <Row justify="end">
                  <Space>
                    <Button onClick={() => (setIsShowModify(false), setSaveValue(), setDesData(''))}>Hủy</Button>
                    <Button type="primary"
                      onClick={() => productForm.validateFields().then(() => {
                        handleSubmitForm()
                      }).catch(info => {
                        console.log('Validate Failed:', info);
                      })}
                    >Lưu</Button>
                  </Space>
                </Row>
              )}
            >
              <Form
                form={productForm}
                layout="vertical"
                name="productForm"
                initialValues={initialValues}
              >
                <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Xin mời nhập tên sản phẩm' }]}>
                  <Input placeholder="Tên sản phẩm" />
                </Form.Item>
                <Form.Item
                  valuePropName="fileList"
                  label="Hình ảnh"
                  name="image"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e && e.fileList
                  }}
                  validateFirst
                  rules={[
                    { required: true, message: "Xin hãy thêm ảnh sản phẩm" },
                    // () => ({
                    //   validator(_, value) {
                    //     if (!['image/png', 'image/jpeg','image/jpg', 'image/webp'].includes(value.type)) {
                    //       return Promise.reject('File không đúng định dạng');
                    //     }
                    //     return Promise.resolve();
                    //   }
                    // })
                  ]}
                >
                  <Upload
                    listType="picture"
                    beforeUpload={() => false}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
                
                <Form.Item name="categoryId" label="Loại sản phẩm" rules={[{ required: true, message: 'Xin mời chọn loại sản phẩm' }]}>
                  <Select placeholder="Loại sản phẩm" onChange={(value) => setSaveValue(value)}>
                    {renderCategoryOptions()}
                  </Select>
                </Form.Item>
                <Form.Item name="price" label="Giá gốc" rules={[{ required: true, message: 'Xin mời nhập giá gốc sản phẩm' }]}>
                  <InputNumber
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="Giá gốc"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item name="inventory" label="Kho" rules={[{ required: true, message: 'Xin mời nhập số lượng sản phẩm' }]}>
                  <InputNumber
                    placeholder="Số lượng kho"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item label="Mô tả">

                  <CKEditor editor={ClassicEditor} data={productSelected.id ? initialValues.des : ""} onChange={handleDes} />
                </Form.Item>
                
                <Form
                  form={categoryForm}
                  layout="vertical"
                  name="categoryForm"
                  initialValues={productSelected.id ? { ...productSelected.specifications } : {}}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} >
                    {saveValue ? <Specification saveValue={saveValue} /> : null}
                  </div>
                </Form>

                {productSelected.id && (
                  <Checkbox checked={isOptionForm} onChange={(e) => setIsOptionForm(e.target.checked)}>Tuỳ chọn</Checkbox>
                )}
              </Form>
              {isOptionForm && productSelected.id && renderProductOptionForm()}
            </Modal>
          </Col>
        </Row>
          <div>
            {modalInventory()}
          </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  const { productList, categoryList, inventoryList } = state.adminProductReducer;
  const { productSelected } = state.adminCommonReducer;
  return {
    productList,
    categoryList,
    productSelected,
    inventoryList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductListAdmin: (params) => dispatch(getProductListAdminAction(params)),
    getProductFilterAdmin: (params) => dispatch(getProductFilterAdminAction(params)),
    getCategoryListAdmin: (params) => dispatch(getCategoryListAdminAction(params)),
    createProductAdmin: (params) => dispatch(createProductAdminAction(params)),
    editProductAdmin: (params) => dispatch(editProductAdminAction(params)),
    deleteProductAdmin: (params) => dispatch(deleteProductAdminAction(params)),
    createOptionAdmin: (params) => dispatch(createOptionAdminAction(params)),
    setProductSelect: (params) => dispatch(setProductSelectAction(params)),
    getInventory: (params) => dispatch(getInventoryAdminAction(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);