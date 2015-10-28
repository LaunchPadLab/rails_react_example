class AccountsEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isDirty: false,
      alerts: []
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

  handleSubmit(e) {
    e.preventDefault();

    const payload = {
      preference: {
        display_name:     this.refs.displayName.value,
        notify_on_answer: this.refs.notifyOnAnswer.checked,
        daily_digest:     this.refs.dailyDigest.checked
      }
    };

    patch('/account', payload)
      .then(json=>{
        this.setState({alerts: this.state.alerts.concat(json.data)});
      })
      .catch(err=>{
        this.setState({alerts: this.state.alerts.concat(json.data)});
      });
  }

  render() {

    const { preference } = this.props;

    const button = this.state.isDirty ?
      <button
        type="submit"
        className="btn btn-primary pull-right"
        onClick={this.handleSubmit}>Submit
      </button> : '';

    const alerts = this.state.alerts.map((text,idx)=>{ return <Alert key={idx} text={text}/>; });

    return (
      <div className="row">
        <React.addons.CSSTransitionGroup transitionName="alert" transitionEnterTimeout={2000} transitionLeaveTimeout={300}>
          {alerts}
        </React.addons.CSSTransitionGroup>
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
                defaultValue={preference.display_name} />
            </div>
            <br/>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  ref="notifyOnAnswer"
                  onChange={this.handleChange}
                  defaultChecked={preference.notify_on_answer}/> Notify on Answer
              </label>
            </div>
            <br/>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  ref="dailyDigest"
                  onChange={this.handleChange}
                  defaultChecked={preference.daily_digest}/> Daily Digest
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
      opacity: '0',
      position: 'absolute',
      top: '150px',
      left: '325px',
      fontSize: '128px',
      textAlign: 'center',
      backgroundColor: '#29F514',
      zIndex: '10'
    };
  }

  render() {
    return (
      <div style={this.styles}>
        {this.props.text}
      </div>
    );
  }
}

Alert.propTypes = {
  text: React.PropTypes.string.isRequired
};
