class UsersController < ApplicationController
	before_action :autheticate, only: :destroy
	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if @user.save
			session[:current_user] = @user.id
			redirect_to root_path
	end

	def destroy
		@user = User.find(params[:id])
		@user.destroy
		if @user = current_user
			session[:current_user] = nil
		end
		redirect_to root_path

	end

	private 
	def user_params
		params.require(:user).permit(:username, :password, :password_confirmation)
	end



end