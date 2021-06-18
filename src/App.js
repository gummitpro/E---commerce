import './App.css'
import { useEffect } from 'react';
import SwitchRoute from './SwitchRoute'
import { getUserInfoAction } from './redux/actions';
import { connect } from 'react-redux';
function App({getUserInfo}) {
  useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo && userInfo.id) {
		  getUserInfo({ id: userInfo.id });
		}
	 }, []);
  return (
    <>
     <SwitchRoute />
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
  };
}
export default connect(null, mapDispatchToProps)(App);
