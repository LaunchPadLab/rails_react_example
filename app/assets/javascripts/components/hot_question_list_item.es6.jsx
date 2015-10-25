class HotQuestionsListItem extends React.Component {

  render() {

    const question = this.props.question;

    return <a href={`questions/${question.id}`}>{question.title}</a>;
  }
};

HotQuestionsListItem.propTypes = {
  question: React.PropTypes.object.isRequired
};
