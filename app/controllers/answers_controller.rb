class AnswersController < ApplicationController

  respond_to :json

  def index
    @answers = Answer.with_user.where(question_id: params[:id])
    respond_with @answers
  end

  def create
    @answer = Answer.create(answer_params.merge(user_id: current_user.id))
    if @answer.save
      respond_with @answer
    else
      render json: { response: "fail" }
    end
  end

  private
    def answer_params
      params.require(:answer).permit(:question_id, :description)
    end
end
