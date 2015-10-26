class QuestionsController < ApplicationController

  respond_to :html, :json

  def index
    respond_with Question.all
  end

  def show
    @questions = Question.all
    @question  = Question.find(params[:id])
  end

end
