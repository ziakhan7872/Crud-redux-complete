import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import {updateStudent} from '../store/actions/studentsAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class UpdateStudens extends Component {
  static navigationOptions = {
    title: 'Update Students',
  };
  constructor(props) {
    super(props);
    state = {
      data: '',
      RollNumber: '',
      student_Name: '',
      age: '',
      student_id: '',
    };
  }

  componentDidMount() {
    console.log('this.props', this.props.navigation.state.params.data);
    console.log('this.getData', this.props.navigation.state.params.function);
  }

  async studentUpdateRecord() {
    console.log('this.props', await this.props.students);
    let data = await this.props.updateStudent(
      (this.state.student_id = this.props.navigation.state.params.data.student_id),
      this.state.RollNumber,
      this.state.student_Name,
      this.state.age,
    );
    console.log('data===', data);
    if (data.type === 'UPDATE_STUDENTS_SUCCESS') {
      this.props.navigation.navigate('AllStudents');
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <Mytextinput
            placeholder={
              this.props.navigation.state.params.data.RollNumber
                ? this.props.navigation.state.params.data.RollNumber
                : 'Enter RollNumber'
            }
            onChangeText={RollNumber => this.setState({RollNumber})}
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder={
              this.props.navigation.state.params.data.student_Name
                ? this.props.navigation.state.params.data.student_Name
                : 'Enter Name'
            }
            onChangeText={student_Name => this.setState({student_Name})}
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder={
              this.props.navigation.state.params.data.age
                ? this.props.navigation.state.params.data.age.toString()
                : 'Enter age'
            }
            onChangeText={age => this.setState({age})}
            style={{padding: 10}}
          />

          <Mybutton
            title="Update"
            customClick={() => this.studentUpdateRecord()}
          />
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
  return bindActionCreators({updateStudent}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateStudens);
