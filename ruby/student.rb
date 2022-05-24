require_relative 'crud'

#  create a class 
class Student
    include Crud
    # getter and setter with attr_accessor
    attr_accessor :first_name, :last_name, :email, :username, :password

    #  only getter not setter method
    # attr_reader :username

   
# setups our objects with initialize method
    def initialize(firstname, lastname, username, email, password)
        @first_name = firstname
        @last_name = lastname
        @username = username
        @email = email
        @password = password

    end

# def  first_name=(name)
#     @first_name = name
# end

# def first_name 
#     @first_name
# end



    def to_s
        "First Name: #{@first_name}, Last name: #{@last_name}, Username: #{@username}, email address: #{@email}"
    end
end

chad = Student.new("chad", "Tarpey", "chadtip", "chad@gmail.com", "123456")
john = Student.new("john", "Tarpey", "johnny", "john@gmail.com", "123456")

# puts chad
# puts john




users = [
          { username: "chad", password: "password1" },
          { username: "jack", password: "password2" },
          { username: "arya", password: "password3" },
          { username: "jonsnow", password: "password4" },
          { username: "heisenberg", password: "password5" }
        ]


   hashed_users = Crud.create_secure_users(users)     
puts hashed_users