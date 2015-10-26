class Question extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.onAnswer(this.refs.description.value);
    this.refs.description.value = '';
  }

  render() {

    const { question, questions, answers } = this.props;

    const renderAnswers = answers.map(answer=>{
      return (
        <div key={answer.id} style={{marginTop: '15px', borderBottom: '1px solid #CCC', paddingBottom: '20px'}}>
          <p>{answer.description}</p>
          <p style={{paddingLeft: '30px'}}>answered {answer.created_at}</p>
          <p style={{paddingLeft: '30px'}}> by Johnny</p>
        </div>
      );
    });

    return (
      <div>
        <h3 style={{borderBottom: '1px solid #CCC', paddingBottom: '20px', marginBottom:'0px'}}>
          {question.title}
        </h3>
        <p style={{marginTop: '15px'}}>{question.description}</p>
        <h4 style={{borderBottom: '1px solid #CCC', paddingBottom: '20px', marginTop: '20px'}}>
          {pluralize('Answer', question.answers_count, true)}
        </h4>
        <React.addons.CSSTransitionGroup transitionName="answer" transitionEnterTimeout={1000} transitionLeaveTimeout={300} >
          {renderAnswers}
        </React.addons.CSSTransitionGroup>
        <h4 style={{marginTop: '20px'}}>Your Answer</h4>
        <textarea className="form-control" rows="10" ref="description"></textarea>
        <br/>
        <button className="btn btn-default pull-right" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
};

Question.propTypes = {
  question: React.PropTypes.object.isRequired,
  answers:  React.PropTypes.array.isRequired,
  onAnswer: React.PropTypes.func.isRequired
};
