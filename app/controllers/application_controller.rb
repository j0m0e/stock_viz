class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  #before_action :authenticate
  

  def index
    @username = User.find(session[:current_user_id]).username.capitalize
  end

 

  def authenticate
  	redirect_to login_path unless session[:current_user_id]
  end


end
