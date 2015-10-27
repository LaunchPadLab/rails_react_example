class QuestionsIndex extends React.Component {

  constructor(props) {
    super(props);

    this.state = { questions, user } = this.props;

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.fetchQuestions, 5 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchQuestions() {
    fetch('/questions', {
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response=>{
      return response.json();
    })
    .then(json=>{
      this.setState({questions: json.questions});
    })
    .catch(err=>{
      console.log('ERR', err);
    });
  }

  handleSubmit() {
    const payload = {
      question: {
        title:       this.refs.title.value,
        description: this.refs.description.value
      }
    };

    fetch('/questions', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'X-CSRF-Token': document.getElementsByName("csrf-token")[0].content,
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response=>{
      if (response.ok) {
        this.fetchQuestions();
        return true;
      } else {
        return new Error(response.statusText);
      }
    })
    .catch(err=>{
      console.log('ERR', err);
    });
    this.refs.title.value = '';
    this.refs.description.value = '';
  }

  render() {

    const questionForm = this.props.user ?
      <div>
        <h4 style={{marginTop: '20px'}}>Ask a question</h4>
          <form>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Title" ref="title"></input>
            </div>
            <div className="form-group">
              <textarea className="form-control" rows="10" placeholder="Description" ref="description"></textarea>
            </div>
            <br/>
            <button className="btn btn-default pull-right" onClick={this.handleSubmit}>Submit</button>
          </form>
      </div>
      :
      <h4 style={{marginTop: '20px'}}>Please <a href="/users/sign_in" role="button">login</a> to ask a question</h4>;

    return (
      <div>
        <div className="row">
          <div className="col-md-9">
          {questionForm}
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <TopQuestionsList questions={this.state.questions} />
          </div>
          <div className="col-md-3" style={{marginTop: '40px'}}>
            <HotQuestionsList questions={this.state.questions} />
          </div>
        </div>
      </div>
    );
  }
};

QuestionsIndex.propTypes = {
  questions: React.PropTypes.array.isRequired,
  user:      React.PropTypes.object
}
