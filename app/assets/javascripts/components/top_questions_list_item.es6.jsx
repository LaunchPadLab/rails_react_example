class TopQuestionsListItem extends React.Component {

  render() {

    const question = this.props.question;

    return (
      <div>
        <ul className="list-inline text-center" style={{display:'inline-block'}}>
          <li style={{width: '60px'}}><p className="text-center">{question.votes}</p>vote</li>
          <li style={{width: '60px'}}><p className="text-center">1</p> answer</li>
          <li style={{width: '60px'}}><p className="text-center">{question.views}</p> view</li>
        </ul>
        <div style={{display: 'inline-block', verticalAlign:'top'}}>
          <a href={`questions/${question.id}`}>{question.title}</a>
        </div>
      </div>
    );
  }
};

TopQuestionsListItem.propTypes = {
  question: React.PropTypes.object.isRequired
};
