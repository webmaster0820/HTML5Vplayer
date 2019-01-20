import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectSegs,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import {  loadSeglist } from '../App/actions';
import { changeSegInfo } from './actions';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeSegInfo: (info) => dispatch(changeSegInfo(info)),
  onGetSeglist:(info) =>{
    dispatch(loadSeglist());
  }
});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  segs: makeSelectSegs(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
