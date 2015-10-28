class QuestionsController < ApplicationController

  respond_to :html, :json

  def index
    questions = Question.all.with_user

    respond_to do |format|
      format.html do
        render component: 'QuestionsIndex', props: {
          questions: prepareArray(questions),
          user:      current_user && prepare(current_user)
        }, tag: 'div'
      end
      format.json { render json: questions }
    end
  end

  def show
    questions = Question.all
    question  = Question.with_answers.find(params[:id])
    answers   = question.answers

    respond_to do |format|
      format.html do
        render component: 'QuestionsShow', props: {
          questions: prepareArray(questions),
          question:  prepare(question),
          answers:   prepareArray(answers),
          user:      current_user && prepare(current_user)
        }, tag: 'div'
      end
      format.json { render json: questions }
    end
  end

  def create
    @question = Question.create(question_params.merge(user_id: current_user.id, votes: 0, views: 0))
    if @question.save
      respond_to do |format|
        format.html { render plain: 'UGH'}
        format.json { render json: @question}
      end
    else
      render json: { response: "fail" }
    end
  end

  private
    def question_params
      params.require(:question).permit(:title, :description)
    end

    def prepareArray(array)
      ActiveModel::ArraySerializer.new(array, each_serializer: serializer(array))
    end

    def prepare(resource)
      serializer(resource).new(resource)
    end

    def serializer(resource)
      if resource.respond_to? :name
        "#{resource.name}Serializer".safe_constantize
      else
        "#{resource.class}Serializer".safe_constantize
      end
    end
end
