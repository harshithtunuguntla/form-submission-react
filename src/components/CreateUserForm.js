import React from "react";
import Api from "./Api";

class createUserForm extends React.Component {
  state = {
    superUserID: "",
    designation: "",
    name: "",
    profileDescription: "",
    profileTags: "",
    email: "",
    journeyStartedFrom: "",
    image: null,
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    //   api.get('/',{
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'Accept' : '*/*'
    //       },
    //       params : {
    //           type : "/"
    //           },
    //       body:{'userid':'6f7d42a3e1ea68482a566e17eabe7630'}
    //   }).then(
    //       res=>{
    //           console.log(res.data);
    //       }
    //   ).catch(error => {
    //     console.error('There was an error!', error);
    // });

    // const data = {superUserID : this.state.superUserID}
    const data = {
      superUserID: this.state.superUserID,
      designation: this.state.designation,
      name: this.state.name,
      profileDescription: this.state.profileDescription,
      profileTags: this.state.profileTags,
      email: this.state.email,
      journeyStartedFrom: this.state.journeyStartedFrom,
      image: this.state.image,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    // fetch("http://127.0.0.1:8000/testingform/receivedata", requestOptions)
    // .then((result)=>result.json())
    // .then((newval)=>{console.log(newval.message)})

    // const response = await Api.post("/testingform/receivedata", requestOptions);
    // console.log(response);

    // console.log(`${this.state.img}`)

    // Api.post("/testingform/receivedata", requestOptions).then((newval) => {
    //   console.log(newval.data.message);
    // });

    const fd = new FormData();
    fd.append('superUserID',this.state.superUserID);
    fd.append('designation',this.state.designation);
    fd.append('name',this.state.name);
    fd.append('profileDescription',this.state.profileDescription);
    fd.append('profileTags',this.state.profileTags);
    fd.append('email',this.state.email);
    fd.append('journeyStartedFrom',this.state.journeyStartedFrom)
    fd.append('image', this.state.image); 
    

    Api.post("/testingform/receiveimage", fd).then((newval) => {
      console.log(newval.data.message);
    }).catch(err=>console.log(err))
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log("inside");
      this.setState({
        image: event.target.files[0]
      });
    }
    console.log(event.target.files[0]);
  };

  render() {
    return (
      <div className="ui container">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Super User ID</label>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ superUserID: e.target.value });
              }}
              value={this.state.superUserID}
            ></input>
          </div>

          <div className="field">
            <label>Designation</label>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ designation: e.target.value });
              }}
              value={this.state.designation}
            ></input>
          </div>

          <div className="field">
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              value={this.state.name}
            ></input>
          </div>

          <div className="field">
            <label>Profile Description</label>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ profileDescription: e.target.value });
              }}
              value={this.state.profileDescription}
            ></input>
          </div>

          <div className="field">
            <label>Profile Tags</label>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ profileTags: e.target.value });
              }}
              value={this.state.profileTags}
            ></input>
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              value={this.state.email}
            ></input>
          </div>

          <div className="field">
            <label>Journey Started From</label>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ journeyStartedFrom: e.target.value });
              }}
              value={this.state.journeyStartedFrom}
            ></input>
          </div>

          <label>Upload Image</label>
          <input type="file" onChange={this.onImageChange} />

          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default createUserForm;
