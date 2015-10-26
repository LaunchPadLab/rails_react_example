class QuestionsController < ApplicationController

  def index
    @questions = Question.all
    render component: 'QuestionsIndex', props: { questions: @questions }, tag: 'div'
  end

  def show
    @questions = Question.all
    @question  = Question.with_answers.find(params[:id])
  end

end
