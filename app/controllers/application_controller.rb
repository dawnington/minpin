class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?, :cloud_name, :cloud_presets

  def current_user
    return nil if session[:session_token].nil?
    User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    current_user
  end

  def login!(user)
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_token!
    session[:session_token] = nil
  end

  def cloud_name
    'dojinyoct'
  end

  def cloud_presets
    'apaqfoni'
  end
end
