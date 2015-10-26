class QuestionsIndex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ready:     false,
      questions: []
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);

    this.fetchQuestions();
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
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response=>{
      return response.json();
    })
    .then(json=>{
      this.setState({ready: true, questions: json.questions});
    })
    .catch(err=>{
      console.log('ERR', err);
    });
  }

  render() {

    if (!this.state.ready) {
      return <div></div>;
    }

    return (
      <div className="row">
        <div className="col-md-9">
          <TopQuestionsList questions={this.state.questions} />
        </div>
        <div className="col-md-3" style={{marginTop: '40px'}}>
          <HotQuestionsList questions={this.state.questions} />
        </div>
      </div>
    );
  }
};

QuestionsIndex.propTypes = {
  user: React.PropTypes.object.isRequired
}
