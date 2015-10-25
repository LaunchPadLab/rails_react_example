class QuestionsIndex extends React.Component {

  render() {

    const questions = this.props.questions;

    return (
      <div className="row">
        <div className="col-md-9">
          <TopQuestionsList questions={questions} />
        </div>
        <div className="col-md-3" style={{marginTop: '40px'}}>
          <HotQuestionsList questions={questions} />
        </div>
      </div>
    );
  }
};

QuestionsIndex.propTypes = {
  questions: React.PropTypes.array.isRequired
};

