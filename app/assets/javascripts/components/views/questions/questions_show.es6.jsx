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
    get(`/answers?id=${this.state.question.id}`)
      .then(json=>{
        this.setState({answers: json.answers});
      });
  }

  onAnswer(description) {
    const payload = {
      answer: {
        question_id: this.state.question.id,
        description: description
      }
    };

    post('/answers', payload)
      .then(json=>{
        this.fetchAnswers();
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
