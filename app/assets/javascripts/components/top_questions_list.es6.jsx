class TopQuestionsList extends React.Component {

  render () {

    const questions = this.props.questions.map(question=>{
      return (
        <li key={question.id} style={{borderBottom: '1px solid #CCC', paddingBottom: '10px', paddingTop: '20px'}}>
          <TopQuestionsListItem question={question} />
        </li>
      );
    });

    return (
      <div>
        <h3 style={{borderBottom: '1px solid #CCC', paddingBottom: '20px', marginBottom:'0px'}}>
          Top Questions
        </h3>
        <ul className="list-unstyled">{questions}</ul>
      </div>
    );
  }
}

TopQuestionsList.propTypes = {
  questions: React.PropTypes.array
};
