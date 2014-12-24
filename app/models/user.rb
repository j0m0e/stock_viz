class User < ActiveRecord::Base
	# validates presence of username
	# validates uniqueness of username
	# has many portfolios => portfolios dependent destroy
	
	has_many :stocks, dependent: :destroy
	validates :username, presence: true, uniqueness: true
	validates_presence_of :password
	has_secure_password
end