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
      this.setState({ready: true, answers: json});
    });
  }

  onAnswer(description) {
    const payload = {
      answer: {
        question_id: this.props.question.id,
        description: description
      }
    };

    const formData = new FormData();
    formData.append('answer[question_id]', this.props.question.id);
    formData.append('answer[description]', description);

    fetch('/answers', {method: 'POST', body: formData})
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

    const { question, questions } = this.props;

    const questionsRender = this.state.ready ? <Question question={question} answers={this.state.answers} onAnswer={this.onAnswer}/> : '';

    return (
      <div className="row">
        <div className="col-md-9">
          {questionsRender}
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
