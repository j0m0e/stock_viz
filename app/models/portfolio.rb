class Portfolio < ActiveRecord::Base
	# validates presence of portfolio name, 
	# has and belongs to many stocks
	# belongs to user
	
	has_and_belongs_to_many :stocks
	belongs_to :user

	validates_presence_of :name

end