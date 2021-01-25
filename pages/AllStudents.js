import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchStudents, deleteStudent} from '../store/actions/studentsAction';
console.disableYellowBox = true;

class AllStudents extends Component {
  static navigationOptions = {
    title: 'All Student',
    headerStyle: {
      backgroundColor: '#616161',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    getAllStudents: [],
  };

  async componentDidMount() {
    console.log('1');
    //  console.log('this.props===', this.props.fetchStudents());
    this.getStudentData();
  }

  async getStudentData() {
    console.log('1');
    let data = await this.props.fetchStudents();
    //console.log('data', await data.payload);
    let x = await data.payload;
    this.setState({
      getAllStudents: x,
    });
    //console.log('XXX =', x);
  }
  studentDelete = async student_id => {
    let data = await this.props.deleteStudent(student_id);
    console.log('data', data);
    this.getStudentData();
  };
  render() {
    //let {getAllStudents} = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={{backgroundColor: '#c1ccc7'}}>
          <FlatList
            data={this.state.getAllStudents}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: '#8d8d8d',
                  margin: 10,
                  padding: 3,
                  marginVertical: 5,
                  borderRadius: 8,
                }}>
                <Text style={styles.title}>{item.student_id}</Text>
                <Text style={styles.title}>RollNumber: {item.RollNumber}</Text>
                <Text style={styles.title}>
                  student_Name: {item.student_Name}
                </Text>
                <Text style={styles.title}>age: {item.age}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#f4fffa',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate('UpdateStudens', {
                        data: item,
                        function: this.getStudentData,
                      })
                    }
                    style={{marginLeft: 220}}>
                    <Text>Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.studentDelete(item.student_id)}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </ScrollView>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('AddStudents')}>
            <Text style={styles.btntext}>+</Text>
          </TouchableOpacity>
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
  btntext: {
    marginLeft: 280,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  //console.log('state====', await state.students.students);
  return {
    students: state.students.students,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchStudents, deleteStudent}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllStudents);
