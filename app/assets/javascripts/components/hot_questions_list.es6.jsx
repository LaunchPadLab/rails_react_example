class HotQuestionsList extends React.Component {

  render () {

    const questions = this.props.questions.map(question=>{
      return (
        <li key={question.id} style={{marginBottom: '10px'}}>
          <HotQuestionsListItem question={question} />
        </li>
      );
    });

    return (
      <div>
        <h4>Hot Questions</h4>
        <ul className="list-unstyled" style={{width:'80%'}}>{questions}</ul>
      </div>
    );
  }
}

HotQuestionsList.propTypes = {
  questions: React.PropTypes.array
};
