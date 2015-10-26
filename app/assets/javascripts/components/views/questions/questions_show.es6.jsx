class QuestionsShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ready:   false,
      answers: []
    };

    this.onAnswer     = this.onAnswer.bind(this);
    this.fetchAnswers = this.fetchAnswers.bind(this);

    this.fetchAnswers()
  }

  componentDidMount() {
    setInterval(this.fetchAnswers, 5 * 1000);
  }

  fetchAnswers() {
    fetch(`/answers?id=${this.props.question.id}`)
    .then(response=>{
      return response.json();
    })
    .then(json=>{
      this.setState({ready: true, answers: json.answers});
    })
    .catch(err=>{
      console.log('ERR', err);
    });
  }

  onAnswer(description) {
    const payload = {
      answer: {
        question_id: this.props.question.id,
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

    const { question, questions, user } = this.props;

    const questionRender = this.state.ready ? <Question user={user} question={question} answers={this.state.answers} onAnswer={this.onAnswer}/> : '';

    return (
      <div className="row">
        <div className="col-md-9">
          {questionRender}
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
  questions: React.PropTypes.array.isRequired
};
