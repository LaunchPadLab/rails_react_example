class AccountsEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isDirty: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    const isDirty =
      this.refs.displayName.value      !== this.props.preference.display_name ||
      this.refs.notifyOnAnswer.checked !== this.props.preference.notify_on_answer ||
      this.refs.dailyDigest.checked    !== this.props.preference.daily_digest;

    this.setState({isDirty: isDirty});
  }

  handleSubmit() {
    const payload = {
      preference: {
        display_name:     this.refs.displayName.value,
        notify_on_answer: this.refs.notifyOnAnswer.value,
        daily_digest:     this.refs.dailyDigest.value
      }
    };

    patch('/account', payload)
      .then(json=>{
        console.log(json);
        this.refs.displayName.value    = '';
        this.refs.notifyOnAnswer.value = '';
        this.refs.dailyDigest.value    = '';
      });
  }

  render() {

    const { preference } = this.state;

    const button = this.state.isDirty ?
      <button
        type="submit"
        className="btn btn-primary pull-right"
        onClick={this.handleSubmit}>Submit
      </button> : '';

    return (
      <div className="row">
        <React.addons.CSSTransitionGroup>
          <Alert/>
        <React.addons.CSSTransitionGroup>
        <div className="col-md-6 col-md-offset-3">
          <h3>Preferences</h3>
          <br/>
          <form>
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Display Name"
                ref="displayName"
                onChange={this.handleChange}
                defaultValue={this.props.preference.display_name} />
            </div>
            <br/>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  ref="notifyOnAnswer"
                  onChange={this.handleChange}
                  defaultChecked={this.props.preference.notify_on_answer}/> Notify on Answer
              </label>
            </div>
            <br/>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  ref="dailyDigest"
                  onChange={this.handleChange}
                  defaultChecked={this.props.preference.daily_digest}/> Daily Digest
              </label>
            </div>
            {button}
          </form>
        </div>
      </div>
    );
  }
};

AccountsEdit.propTypes = {
  preference: React.PropTypes.object.isRequired
};

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      position: 'absolute',
      top: '100px',
      left: '300px',
      fontSize: '128px',
      textAlign: 'center',
      color: '#29F514'
    }
  }

  render() {
    return (
      <div style={this.styles}>
        You did it!!!
      </div>
    );
  }
}

