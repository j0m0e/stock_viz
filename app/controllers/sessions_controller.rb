class SessionsController < ApplicationController
	# before_action :authenticate, only: :destroy

	def new
	end

	def create
		user = User.find_by(username: params[:username])
		if user.authenticate(params[:password])
			session[:current_user] = user.id
			redirect_to root_path
		else
			render new
		end
	end

	def destroy
		session[:current_user] = nil
		redirect_to login_path
	end


end