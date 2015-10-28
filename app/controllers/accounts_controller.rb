class AccountsController < ApplicationController

  before_action :authenticate_user!

  def edit
    render component: 'AccountsEdit', props: {
        preference: PreferenceSerializer.new(current_user.preference)
      }, tag: 'div'
  end

  def update
    @preference = current_user.preference
    if @preference.update_attributes(preference_params)
      render json: { data: 'success!' }
    else
      render json: { data: 'fail!' }
    end
  end

  private
    def preference_params
      params.require(:preference).permit(:display_name, :notify_on_answer, :daily_digest)
    end
end
