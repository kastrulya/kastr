var DropdownLis = React.createClass({
    getDefaultProps: function () {
        return {items: []}
    },

    handleChange: function () {
        {/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
        var options = e.target.options;
        var value = '';
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value = options[i].value;
            }
        }
        this.props.onChange(value);
    },
    render: function () {
        var listItems = this.props.items.map(function (item) {
            return (
                <option key={item.name} value={item.name}>
                    {item.name}
                </option>
            );
        });

        return (
            <div className="form-group">
                <select
                    className="form-control"
                    onChange={this.handleChange}
                >{listItems}</select>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return {
            name: '',
            email: '',
            birth: '',
            postal: '',
            password: '',
            submit: '',
            country: '',
            agree: ''
        };
    },

    handleChange: function (e) {
        var newState = {};
        newState[e.target.id] = e.target.value;
        this.setState(newState);
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.validate();
        //this.setState({author: '', text: ''});
    },

    validate: function () {
        //
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>

                {/*Name*/}
                <div className="form-group">
                    <label className="control-label" htmlFor="name">Input your name</label>
                    <div className="input-group">
                    <span className="input-group-addon">
                         <span className="glyphicon glyphicon-user"></span>
                    </span>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={this.handleChange}
                            aria-describedby="inputNameStatus"
                            placeholder="Name"/>
                    </div>
                    <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="inputNameStatus" className="sr-only">(success)</span>
                </div>

                {/*Email*/}
                <div className="form-group">
                    <label className="control-label" htmlFor="email">Input your email</label>
                    <div className="input-group">
                        <span className="input-group-addon">@</span>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            onChange={this.handleChange}
                            aria-describedby="inputEmailStatus"
                            placeholder="email"/>
                    </div>
                    <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="inputEmailStatus" className="sr-only">(success)</span>
                </div>

                {/*Date of birth*/}
                <div className="form-group has-success has-feedback">
                    <label className="control-label" htmlFor="birth">Input date of your birth</label>
                    <div className="input-group">
                    <span className="input-group-addon">
                         <span className="glyphicon glyphicon-gift"></span>
                    </span>
                        <input
                            type="date"
                            className="form-control"
                            id="birth"
                            onChange={this.handleChange}
                            aria-describedby="inputBirthStatus"/>
                    </div>
                    <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="inputBirthStatus" className="sr-only">(success)</span>
                </div>

                {/*Postal index*/}
                <div className="form-group has-success has-feedback">
                    <label className="control-label" htmlFor="postal">Input postal index</label>
                    <div className="input-group">
                    <span className="input-group-addon">
                         <span className="glyphicon glyphicon-envelope"></span>
                    </span>
                        <input
                            type="text"
                            className="form-control"
                            id="postal"
                            onChange={this.handleChange}
                            aria-describedby="inputPostalStatus"/>
                    </div>
                    <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="inputPostalStatus" className="sr-only">(success)</span>
                </div>

                {/*Password*/}
                <div className="form-group has-success has-feedback">
                    <label className="control-label" htmlFor="password">Input your password</label>
                    <div className="input-group">
                    <span className="input-group-addon">
                         <span className="glyphicon glyphicon-lock"></span>
                    </span>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={this.handleChange}
                            aria-describedby="inputPasswordStatus"
                            placeholder="password"/>
                    </div>
                    <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="inputPasswordStatus" className="sr-only">(success)</span>
                </div>

                {/*Submit Password*/}
                <div className="form-group has-success has-feedback">
                    <label className="control-label" htmlFor="submit">Submit your password</label>
                    <div className="input-group">
                    <span className="input-group-addon">
                         <span className="glyphicon glyphicon-lock"></span>
                    </span>
                        <input type="password"
                               className="form-control"
                               id="submit"
                               onChange={this.handleChange}
                               aria-describedby="inputSubmitPasswordStatus"
                               placeholder="password once again"/>
                    </div>
                    <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="inputSubmitPasswordStatus" className="sr-only">(success)</span>
                </div>

                {/*Countries*/}
                <div className="form-group has-success has-feedback">
                    <label className="control-label" htmlFor="inputSubmitPassword">Select your country from the
                        list</label>
                    <div className="input-group">
                    <span className="input-group-addon">
                         <span className="glyphicon glyphicon-lock"></span>
                    </span>
                        <DropdownList
                            id="country"
                            items={listCountries}
                            onChange={this.handleChange}/>
                    </div>
                    <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="inputSubmitPasswordStatus" className="sr-only">(success)</span>
                </div>

                <div className="checkbox">
                    <label><input
                        id="agree"
                        type="checkbox"
                        onChange={this.handleChange}
                    />I agree with terms </label>
                </div>

                <input className="btn btn-default" type="submit" value="Submit"/>

                {/*
                 <input
                 type="text"
                 placeholder="Your name"
                 value={this.state.author}
                 onChange={this.handleAuthorChange}/>
                 <input
                 type="text"
                 placeholder="Say something..."
                 value={this.state.text}
                 id="text"
                 onChange={this.handleChange}/>
                */}

            </form>


        );
    }
});

ReactDOM.render(
    <CommentForm />
    ,
    document.getElementById('content')
);