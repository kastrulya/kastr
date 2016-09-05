var DropdownList = React.createClass({
    getDefaultProps: function () {
        return {items: []}
    },

    handleChange: function (e) {
        $(e.target).find(':selected').val();
        e.target.id = this.props.id;
        this.props.onChange(e);
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
                <label className="control-label" htmlFor="country">Select your country from the
                    list</label>
                <div className="input-group">
                    <span className="input-group-addon">
                         <span className="glyphicon glyphicon-globe"></span>
                    </span>
                    <select
                        id="country"
                        className="form-control"
                        aria-describedby="inputCountryStatus"
                        onChange={this.handleChange}
                        onBlur={this.props.validate}
                    > {listItems}</select>
                </div>
                <span className="glyphicon   form-control-feedback" aria-hidden="true"></span>
                <span id="inputCountryStatus" className="sr-only">Choose country!</span>
            </div>);
    }
});

var RegisterForm = React.createClass({
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

    handleChangeAgreement: function (e) {
        var newState = {};
        newState[e.target.id] = e.target.checked;
        this.setState(newState);
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var name = this.state.name.trim();

    },

    validateEmail: function (value) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },

    validateDate: function (value) {
        return (new Date(value) < Date.now());
    },

    commonValidate: function (value) {
        if (typeof value === 'undefined' || value === '') {
            return false;
        }
        return true;
    },

    markFieldInvalid: function (field) {
        var blockField = $(field).parent().parent();
        var iconStatus = blockField.find('.form-control-feedback');
        var mssgStatus = blockField.find('.sr-only');

        blockField.toggleClass('has-feedback', true);
        blockField.toggleClass('has-error', true);
        blockField.toggleClass('has-success', false);

        iconStatus.toggleClass('glyphicon-remove', true);
        iconStatus.toggleClass('glyphicon-ok', false);

        mssgStatus.toggleClass('help-block', true);
        mssgStatus.toggleClass('sr-only', false);

        $('.registerForm').find('.btn').prop('disabled', true);

    },

    isAllFieldValid: function(){
        var form = $('.registerForm');
        var isValid = true;
        $(form).find('.form-group').each(function(i,item){
            if(!$(item).hasClass('has-feedback') || $(item).hasClass('has-error')){
                isValid = false;
                return;
            }
        });
        return isValid;
    },

    markFieldValid: function (field) {
        var blockField = $(field).parent().parent();
        var iconStatus = blockField.find('.form-control-feedback');
        var mssgStatus = blockField.find('.help-block');

        blockField.toggleClass('has-feedback', true);
        blockField.toggleClass('has-success', true);
        blockField.toggleClass('has-error', false);

        iconStatus.toggleClass('glyphicon-ok', true);
        iconStatus.toggleClass('glyphicon-remove', false);

        mssgStatus.toggleClass('sr-only', true);
        mssgStatus.toggleClass('help-block', false);


        if(this.isAllFieldValid()) $('.registerForm').find('.btn').prop('disabled', false);
    },

    validate: function (e) {
        var validFunction;
        switch (e.target.id) {
        case 'email':
        validFunction = this.validateEmail;
        break;
        case 'birth':
        validFunction = this.validateDate;
        break;
        default:
        validFunction = this.commonValidate;
    }

        var valid = validFunction(e.target.value);

        if (valid) this.markFieldValid(e.target);
        else this.markFieldInvalid(e.target);
    },

    render: function () {
        return (
        <form
            className="registerForm col-md-3"
            onSubmit={this.handleSubmit}
            onBlur={this.validate}
        >
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
            <span className="glyphicon   form-control-feedback" aria-hidden="true"></span>
            <span id="inputNameStatus" className="sr-only">Invalid name!</span>
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
        <span className="glyphicon   form-control-feedback" aria-hidden="true"></span>
        <span id="inputEmailStatus" className="sr-only">Invalid email!</span>
        </div>

        {/*Date of birth*/}
        <div className="form-group">
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
        <span className="glyphicon   form-control-feedback" aria-hidden="true"></span>
        <span id="inputBirthStatus" className="sr-only">Invalid date!</span>
        </div>

        {/*Postal index*/}
        <div className="form-group">
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
        <span className="glyphicon   form-control-feedback" aria-hidden="true"></span>
        <span id="inputPostalStatus" className="sr-only">Invalid postal index!</span>
        </div>

        {/*Password*/}
        <div className="form-group">
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
        <span className="glyphicon   form-control-feedback" aria-hidden="true"></span>
        <span id="inputPasswordStatus" className="sr-only">The password must contain: Uppercase letters of European languages, Lowercase letters of European languages, numbers</span>
        </div>

        {/*Submit Password*/}
        <div className="form-group">
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
        <span className="glyphicon   form-control-feedback" aria-hidden="true"></span>
        <span id="inputSubmitPasswordStatus" className="sr-only">Passwords aren't matched</span>
        </div>

        {/*Countries*/}
        <DropdownList
            id="country"
            items={listCountries}
            aria-describedby="inputCountryStatus"
            onChange={this.handleChange}
            onBlur={this.validate}
        />

        {/*Agreement*/}
        <div className="checkbox form-group">
        <label><input
        id="agree"
        type="checkbox"
        onChange={this.handleChangeAgreement}
        required
        />I agree with terms </label>
        </div>

        <input className="btn btn-default" type="submit" value="Submit" disabled/>
        </form>
        );
    }
});

ReactDOM.render(<RegisterForm />, document.getElementById('content'));