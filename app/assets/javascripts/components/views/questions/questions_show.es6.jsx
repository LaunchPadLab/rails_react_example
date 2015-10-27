class QuestionsShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = { questions, question, answers, user } = this.props

    this.onAnswer     = this.onAnswer.bind(this);
    this.fetchAnswers = this.fetchAnswers.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.fetchAnswers, 5 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchAnswers() {
    fetch(`/answers?id=${this.state.question.id}`, {
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response=>{
      return response.json();
    })
    .then(json=>{
      this.setState({answers: json.answers});
    })
    .catch(err=>{
      console.log('ERR', err);
    });
  }

  onAnswer(description) {
    const payload = {
      answer: {
        question_id: this.state.question.id,
        description: description
      }
    };

    fetch('/answers', {
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
        this.fetchAnswers();
        return true;
      } else {
        return new Error(response.statusText);
      }
    })
    .catch(err=>{
      console.log('ERR', err);
    });
  }

  render() {

    const { question, questions, answers, user } = this.state;

    return (
      <div className="row">
        <div className="col-md-9">
          <Question user={user} question={question} answers={answers} onAnswer={this.onAnswer}/>
        </div>
        <div className="col-md-3" style={{marginTop: '40px'}}>
          <HotQuestionsList questions={questions} />
        </div>
      </div>
    );
  }
};

QuestionsShow.propTypes = {
  question:  React.PropTypes.object.isRequired,
  questions: React.PropTypes.array.isRequired,
  answers:   React.PropTypes.array.isRequired,
  user:      React.PropTypes.object
};
