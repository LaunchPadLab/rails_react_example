class QuestionsController < ApplicationController

  def index
    @questions = Question.all
    render component: 'QuestionsIndex', props: { questions: @questions }, tag: 'div'
  end

  def show
    @question = Question.find(params[:id])
    @questions = Question.all
    render component: 'QuestionsShow', props: { question: @question, questions: @questions }, tag: 'div'
  end
end
