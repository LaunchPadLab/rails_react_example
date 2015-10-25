class Question extends React.Component {

  render() {

    const question = this.props.question;

    return (
      <div>
        <h3 style={{borderBottom: '1px solid #CCC', paddingBottom: '20px', marginBottom:'0px'}}>
          {question.title}
        </h3>
        <p style={{marginTop: '15px'}}>{question.description}</p>

        <h4 style={{borderBottom: '1px solid #CCC', paddingBottom: '20px', marginTop: '20px'}}>1 Answer</h4>
        <p style={{marginTop: '15px'}}>I AM AN answer</p>

        <h4 style={{marginTop: '20px'}}>Your Answer</h4>
        <textarea className="form-control" rows="10"></textarea>
        <br/>
        <button className="btn btn-default pull-right">Submit</button>
      </div>
    );
  }
};

Question.propTypes = {
  question: React.PropTypes.object.isRequired
};
