import { Redirect } from 'react-router-dom';
import Header from '../commom/HeaderAdmin';
import Footer from '../commom/FooterAdmin';
import SideBar from '../commom/SidebarAdmin';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';
import { Row, Col, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, LikeOutlined } from '@ant-design/icons';
import './style.css'

function DashBoard() {


  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.id) {
    if (!userInfo.admin) {
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/dang-nhap" />;
  }
  function ChartsCol() {
    const data = [
      {
        name: 'Tháng 3',
        uv: 4000,
        pv: 2400,
      },
      {
        name: 'Tháng 4',
        uv: 3000,
        pv: 1398,
      },
      {
        name: 'Tháng 5',
        uv: 2000,
        pv: 9800,
      },
      {
        name: 'Tháng 6',
        uv: 2780,
        pv: 3908,
      }
    ];
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 25, right: 25 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar name='2020' dataKey="pv" fill="#8884d8" />
          <Bar name='2021' dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  function ChartsCil() {
    const data = [
      { name: 'Laptop', value: 32 },
      { name: 'SmartPhone', value: 30 },
      { name: 'Tivi', value: 16 },
      { name: 'Netword', value: 10 },
      { name: 'KeyMouse', value: 15 },
      { name: 'Another', value: 10 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#fa541c', '#a0d911'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={730} height={250}>
          <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))
            }
          </Pie>
          <Legend layout='vertical' verticalAlign='middle' align='right' />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <>
      <Header />
      <div className='dash-manager' style={{ width: '100%', padding: '10px 0px'  }}>
        <Row className='row' gutter={24} style={{ width: '100%'}}>
          <Col span={6}>
            <SideBar />
          </Col>
          <Col span={18} >
            <div><h2>Dash Board</h2></div>
            <div className='chart-container'>
              <div
                style={{ fontSize: '20px', fontWeight: '500' }}
              >Sơ đồ kinh doanh</div>
              <Row style={{ width: '100%', height: '300px', marginTop: '10px' }}>
                <Col span={12}>
                  {ChartsCol()}
                </Col>
                <Col span={12}>
                  {ChartsCil()}
                </Col>
              </Row>
            </div>
            <div className='parameter'>
              <div
                style={{ fontSize: '20px', fontWeight: '500' }}
              >Thông số</div>
              <div className='para-container'>
                <div className='para-1'>
                  <div className="site-statistic-demo-card">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Card>
                          <Statistic
                            title="Tăng trưởng tháng"
                            value={20.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                          />
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card>
                          <Statistic
                            title="Tăng trưởng năm"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                          />
                        </Card>
                      </Col>
                    </Row>
                  </div>

                </div>
                <div className='para'>
                <div className="site-statistic-demo-card">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Card>
                          <Statistic
                            title="Doanh thu theo ngày"
                            value="40.122.111"
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            suffix="VNĐ"
                          />
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card>
                          <Statistic
                            title="Doang thu tháng "
                            value="312.000.000"
                            valueStyle={{ color: '#3f8600' }}
                            suffix="VNĐ"
                          />
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  )
}


export default DashBoard;