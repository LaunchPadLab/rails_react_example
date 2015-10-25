class QuestionsShow extends React.Component {

  render() {

    const { question, questions } = this.props;

    return (
      <div className="row">
        <div className="col-md-9">
          <Question question={question} />
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

