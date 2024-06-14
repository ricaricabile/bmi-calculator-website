import React from 'react';
import classes from './App.css';
import axios from 'axios';
import {
  Badge,
  Group,
  Text,
  Card,
  SimpleGrid,
  Container,
  NumberInput,
  Select,
  Button 
} from '@mantine/core';
import Footer from './footer.component.jsx';
import { connect } from 'react-redux';
import { setWeight, setHeight, setLeft, setRight, setResultPounds, setResult } from './redux/app/app.actions.js';
class App extends React.Component {
  constructor() {
    super();
  }
  handleChangeright = (e) => {
    const right = parseInt(e);
    this.props.setRight(right);  
  }
  handleChangeleft = (e) => {
    const left = parseInt(e);
    this.props.setLeft(left);
  }
  handleChangeIncm = (e) => {
    this.props.setHeight(e);
  }
  handleInputWeight = (e) => {
    this.props.setWeight(parseFloat(e))
  }
  render (){
  return (
    <div>
    <Container size={700} py="xl" position="center" sx={{overflow: 'hidden'}}>
    <Group justify="center">
      <Badge variant="filled" size="lg">
      Adult BMI Calculator
      </Badge>
    </Group>
    <Text className={classes.description} ta="center" mt="md">
    Body mass index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. This calculator provides body mass index (BMI) and the corresponding BMI weight status category for adults.
    </Text>
    <Group mt={10}>
    <Text fs='italic'>BMI Categories:</Text>
    <Text c='red' fs='italic'>Underweight = &lt;18.5 </Text> 
    <Text c='green' fs='italic'>Normal weight = 18.5–24.9 </Text>
    <Text c='red' fs='italic'>Overweight = 25–29.9 </Text> 
    <Text c='red' fs='italic'>Obesity = BMI of 30 or greater </Text> 
    </Group>
    <SimpleGrid  cols={{ base: 2, xs: 2 }} spacing={50} mt={50}>
      <Group size={60} style={{backgroundColor:'#d0ebff', borderRadius:'5px'}} p={20}>
          <Group style={{display:'flex', gap: 2, alignContent: 'center', alignItems: 'flex-end'}} >
            <NumberInput
               label="Your Weight"
               placeholder='Ibs'
               hideControls
               onChange={this.handleInputWeight}
              />
              <Text fw="500" size={'sm'} pb={7.5}>(pounds)</Text>
              </Group>
              <Group wrap="nowrap">
            <Select
                w={'50%'}
                label="(feet)"
                searchValue={this.props.left} 
                onChange={this.handleChangeleft} 
                data={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                  { value: '5', label: '5' },
                  { value: '6', label: '6' },
                  { value: '7', label: '7' },
                  { value: '8', label: '8' },
                  { value: '9', label: '9' },
                ]}
                comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false } }}
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
            />
            <Select
                w={'50%'}
                label="(inches)"
                searchValue={this.props.right} 
                onChange={this.handleChangeright} 
                data={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                  { value: '5', label: '5' },
                  { value: '6', label: '6' },
                  { value: '7', label: '7' },
                  { value: '8', label: '8' },
                  { value: '9', label: '9' },
                  { value: '10', label: '10' },
                  { value: '11', label: '11' },
                  { value: '12', label: '12' },
                ]}
                comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false } }}
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
            />
            </Group>
            <Group w={'100%'}>
            <Button color="#228be6" onClick={() => axios({
                    url:'bmicalc',
                    method: 'post',
                    data: {
                        weight: this.props.weight,
                        height: this.props.left,
                        heightRemainder: this.props.right,
                        unitH:  'ft',
                        unitW: 'Ibs'
                    }
                }).then(response => {
                    this.props.setResultPounds(response.data.result)
                    
                })}
            >Compute</Button>
             <Text fw={360} fs="italic"> BMI: {this.props.result} </Text>
          </Group>
      </Group>
      
      <Group size={60} style={{backgroundColor:'#d0ebff', borderRadius:'5px'}} p={20}>
          <Group style={{display:'flex', gap: 2, alignContent: 'center', alignItems: 'flex-end'}} >
            <NumberInput
               label="Your Weight"
               placeholder='Kgs'
               hideControls
               onChange={this.handleInputWeight}
              />
              <Text fw="500" size={'sm'} pb={7.5}>(kgs)</Text>
              </Group>
              <NumberInput
               label="(centimeters)"
               hideControls
               onChange={this.handleChangeIncm} 
              />
            <Group w={'100%'}>
            <Button color="#228be6" onClick={
              () => axios({
                url:'bmicalc',
                method: 'post',
                data: {
                    weight: this.props.weight,
                    height: this.props.incm,
                    unitH: 'cm',
                    unitW: 'Kgs'
                }
            }).then(response => {
                this.props.setResult(response.data.result);
            })
            }>Compute</Button>
             <Text fw={360} fs="italic"> BMI: {this.props.resultKegs} </Text>
          </Group>
      </Group>
    </SimpleGrid>
  </Container>
    <Footer/>
  </div>
  );
  }
}
const mapStateToProps = state => ({
  weight: state.app.weight,
  result: state.app.result,
  incm: state.app.incm,
  left: state.app.left,
  right: state.app.right,
  resultKegs: state.app.resultKegs
});

const mapDispatchToProps = dispatch => ({
  setWeight: weight => dispatch(setWeight(weight)),
  setHeight: height => dispatch(setHeight(height)),
  setLeft: left => dispatch(setLeft(left)),
  setRight: right => dispatch(setRight(right)),
  setResultPounds: result => dispatch(setResultPounds(result)),
  setResult: resultKegs => dispatch(setResult(resultKegs)),
})
export default connect(mapStateToProps, mapDispatchToProps)(App);