import React from 'react';
import logo from './logo.svg';
import './App.css';


import Form, {
  FormThemeProvider,
  Input,
  Select,
  FormButton,Checkboxes,Radio
} from 'react-standalone-form'




export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 2,formValues:[]};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  async getData(event) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/getData", requestOptions)
      .then(response => response.json())
      .then(formValues => {
        console.log(formValues)
        this.setState({formValues});
      })
      .catch(error => console.log('error', error));


  }

  handleSubmit(event) {

    event.preventDefault();
  }

  getFormByType(type){
     if(type == 1){

        return(
        <FormThemeProvider>
          <div className='my-app'>
            <Form fields={['name', 'email', 'type']}>
              <Input
                name='name'
                label='Name'
              />
              <Input
                name='email'
                type='email'
                label='E-mail'
              />
              <Select
                name='type'
                label='Type of a user'
                options={['Viewer', 'Moderator', 'Admin']}
              />
              <FormButton
                callback={fields => this.submitForm(fields)}
              >Save</FormButton>
            </Form>
          </div>
        </FormThemeProvider>
           )
     }
     else if(type == 2){


        return(
        <FormThemeProvider>
          <div className='my-app'>
            <Form fields={['name', 'interest', 'type']}>
              <Input
                name='name'
                label='Title'
              />
              <Radio
                name="interest"
                label="Interested In"
                options={["Hiking", "Cycling", "Skiing"]}
              />

              <Select
                name='type'
                label='Category'
                options={['P', 'Q', 'R']}
              />
              <FormButton
                callback={fields => this.submitForm(fields)}
              >Save</FormButton>
            </Form>
          </div>
        </FormThemeProvider>
           )

     }
  }

  submitForm(fields){
    fields.formNum = this.state.value;
    console.log("fields",fields);
    fetch('http://localhost:8080/saveData', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields)
    })

  }

  render() {
    return (
      <div style={{marginLeft:"20%"}}>
        <form style={{marginBottom:"50px",marginTop:"50px"}} onSubmit={this.handleSubmit}>
          <label>
            Select an option:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
        </form>
        <div style={{width:"60%"}}>
            Form {this.state.value}
           {this.getFormByType(this.state.value)}
        </div>
        <div style={{marginTop:"100px"}} >
          <button style={{height:"30px"}} onClick={this.getData}>Get results</button>
        </div>


        <div>
          {
            this.state.formValues.length > 0 &&
            this.state.formValues.map((item,index)=>{
              return(
                <div>


                  { item.formNum==1 &&
                    <p>{"Form: "+item.formNum+", "+"Id: "+item.id+", Name: "+item.name+", Type: "+item.type}</p>
                  }
                  { item.formNum==2 &&
                    <p>{"Form: "+item.formNum+", "+"Id: "+item.id+", Title: "+item.name+", Interested In: "+item.interest+", Category: "+item.type}</p>

                  }
                </div>
              )
            })
          }
        </div>
      </div>


    );
  }
}
