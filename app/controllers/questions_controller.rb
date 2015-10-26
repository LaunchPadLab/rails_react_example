class QuestionsController < ApplicationController

  respond_to :html, :json

  def index
    respond_with Question.all
  end

  def show
    @questions = Question.all
    @question  = Question.find(params[:id])
  end

  def create
    @question = Question.create(question_params.merge(user_id: current_user.id, votes: 0, views: 0))
    if @question.save
      respond_with @question
    else
      render json: { response: "fail" }
    end
  end

  private
    def question_params
      params.require(:question).permit(:title, :description)
    end
end
