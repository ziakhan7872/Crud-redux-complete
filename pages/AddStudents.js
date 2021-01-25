import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import {registerStudent} from '../store/actions/studentsAction';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class AddStudents extends Component {
  static navigationOptions = {
    title: 'Add Students',
  };
  constructor(props) {
    super(props);
    state = {
      data: '',
      RollNumber: '',
      student_Name: '',
      age: '',
      student_id: '',
      getAllStudents: '',
    };
  }

  async componentDidMount() {
    console.log('this.props===', this.props);
  }

  async inserStudent() {
    this.props
      .registerStudent(
        this.state.RollNumber,
        this.state.student_Name,
        this.state.age,
      )
      .then(result => {
        console.log('result', result);
      });
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <Mytextinput
            placeholder="Enter Roll no"
            onChangeText={RollNumber => this.setState({RollNumber})}
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Name"
            onChangeText={student_Name => this.setState({student_Name})}
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Age"
            onChangeText={age => this.setState({age})}
            style={{padding: 10}}
          />

          <Mybutton title="Save" customClick={() => this.inserStudent()} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function mapStateToProps(state) {
  //console.log('state====', await state.students.students);
  return {
    students: state.students.students,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({registerStudent}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStudents);
