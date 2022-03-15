import React from "react";
import Api from "./Api";
import moment from "moment";

class createUserForm extends React.Component {
  state = {
    superUserID: "",
    designation: "",
    name: "",
    profileDescription: "",
    profileTags: "",
    tagCount: "",
    email: "",
    journeyStartedFrom: "",
    image: null,
    video: null,
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("superUserID", this.state.superUserID);
    fd.append("designation", this.state.designation);
    fd.append("name", this.state.name);
    fd.append("profileDescription", this.state.profileDescription);
    fd.append("profileTags", this.state.profileTags);
    fd.append("email", this.state.email);
    fd.append("journeyStartedFrom", this.state.journeyStartedFrom);
    fd.append("image", this.state.image);
    fd.append("video", this.state.video);

    if (
      this.state.superUserID === "" ||
      this.state.designation === "" ||
      this.state.name === "" ||
      this.state.profileDescription === "" ||
      this.state.profileTags === "" ||
      this.state.email === "" ||
      this.state.journeyStartedFrom === ""
    ) {
      alert("Please enter all the details");
    } else {
      if (this.state.image != null && this.state.video != null) {
        const val = this.state.tagCount;
        console.log(val);
        if (
          window.confirm(
            `You have added only ${this.state.tagCount} profile tags, do you want to continue `
          )
        ) {
          Api.post("/testingform/senddata", fd)
            .then((newval) => {
              console.log(newval.data.message);
            })
            .catch((err) => console.log(err));

          this.setState({
            superUserID: "",
            designation: "",
            name: "",
            profileDescription: "",
            profileTags: "",
            tagCount: "",
            email: "",
            journeyStartedFrom: "",
            image: null,
            video: null,
          });

          document.getElementById("imagefile").value = "";

          document.getElementById("videofile").value = "";
        }
      } else {
        alert("Image or video is missing");
      }
    }
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];

      console.log(image.type.split("/")[0]);

      if (image.type.split("/")[0] !== "image") {
        alert("Please use image format only");
        event.target.value = null;
      } else {
        if (image.size / 1000000 > 1024) {
          alert("Image size greater than 1024");
          event.target.value = null;
        } else {
          this.setState({
            image: event.target.files[0],
          });
        }
      }
    }
  };

  onVideoChange = (event) => {
    const video = event.target.files[0];
    console.log(video.type);

    if (video.type.split("/")[0] !== "video") {
      alert("Please use video format only");
      event.target.value = null;
    } else {
      this.setState({
        video: event.target.files[0],
      });
    }
  };

  render() {
    return (
      <div className="ui container" style={{ paddingTop: 3 }}>
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Super User ID</label>
            <input
              type="text"
              placeholder="Enter Super User ID"
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
              placeholder="Enter your designation"
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
              placeholder="Enter your name"
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
              placeholder="Enter Profile Description"
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
              placeholder="Enter tags related to your profile (separate tags by comma)"
              onChange={(e) => {
                console.log(e.target.value.split(",").length);
                this.setState({ tagCount: e.target.value.split(",").length });
                this.setState({ profileTags: e.target.value });
              }}
              value={this.state.profileTags}
            ></input>
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email id"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              value={this.state.email}
            ></input>
          </div>

          <div className="field">
            <label>Journey Started From</label>
            <input
              type="date"
              max={moment().format("YYYY-MM-DD")}
              min={"1900-01-12"}
              onChange={(e) => {
                this.setState({ journeyStartedFrom: e.target.value });
              }}
              value={this.state.journeyStartedFrom}
            ></input>
          </div>

          <label>
            Upload Image{" "}
            <span style={{ fontSize: 10 }}>(Max Allowed Size : 2MB)</span>
          </label>
          <input
            type="file"
            onChange={this.onImageChange}
            id="imagefile"
            accept="image/*"
          />

          <label>
            Upload Video{" "}
            <span style={{ fontSize: 10 }}>(Max Allowed Size : 11MB)</span>{" "}
          </label>
          <input
            type="file"
            onChange={this.onVideoChange}
            id="videofile"
            accept="video/*"
          />

          <div style={{ paddingTop: 10 }}>
            <button className="ui button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default createUserForm;
