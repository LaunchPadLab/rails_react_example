class AnswersController < ApplicationController

  def index
    render json: Answer.where(question_id: params[:id])
  end

  def create
    @answer = Answer.create(answer_params)
    if @answer.save
      render json: @answer
    else
      render json: { response: "fail" }
    end
  end

  private
    def answer_params
      params.require(:answer).permit(:question_id, :description)
    end
end
