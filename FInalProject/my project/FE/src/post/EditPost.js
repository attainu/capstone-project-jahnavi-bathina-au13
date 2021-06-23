import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import DefaultPost from "../images/mountains.jpg";

class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            body: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false
        };
    }

    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data.postedBy._id,
                    title: data.title,
                    body: data.body,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    editPostForm = (title, body) => (
        <form>
            <div className="form-group pmd-textfield row">
                <label className="col-sm-2 col-form-label">Post Photo</label>
                <div className="col-sm-10">
                    <input
                        onChange={this.handleChange("photo")}
                        type="file"
                        accept="image/*"
                        className="form-control"
                    />
                </div>    

            </div><br/>
            <div className="form-group pmd-textfield row">
                <label className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                <input 
                    onChange={this.handleChange("title")} 
                    type="text" 
                    className="form-control"
                    value={title} 
                />
            </div><br/>
            </div>

            <div className="form-group pmd-textfield row">
                <label className="col-sm-2 col-form-label">Body</label>
                <div className="col-sm-10">
                <textarea 
                    onChange={this.handleChange("body")} 
                    type="text" 
                    className="form-control"
                    value={body} 
                        
                />
            </div><br/>
            </div>

            <div className="form-group row">
                <div className="col-sm-10">
                <center>
                <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={this.clickSubmit}
                    > Update Post
                    </button>
                </center>
                   
                </div>
            </div>
        </form>
    );

    render() {
        const {
            id,
            title,
            body,
            redirectToProfile,
            error,
            loading
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={`${
                        process.env.REACT_APP_API_URL
                    }/post/photo/${id}?${new Date().getTime()}`}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    alt={title}
                />

                {isAuthenticated().user.role === "admin" &&
                    this.editPostForm(title, body)}

                {isAuthenticated().user._id === id &&
                    this.editPostForm(title, body)}
            </div>
        );
    }
}

export default EditPost;
