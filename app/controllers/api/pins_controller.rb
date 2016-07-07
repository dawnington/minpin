class Api::PinsController < ApplicationController

  def create
    @pin = Pin.new(pin_params)
    if @pin.save
      render json: { base: ['Pin saved!'] }, status: 200
    else
      render json: { base: ['Pin has already been saved to this board.'] }, status: 422
    end
  end

  def index
    if params[:user_id]
      @pins = User.includes(pins: [:photo, :board]).find(params[:user_id]).pins
    elsif params[:board_id]
      @pins = Pin.where('board_id = ?', params[:board_id]).includes(:photo, :board)
    end
  end

  def destroy
    @pin = Pin.find(params[:id])
    @pin.destroy
    render "api/pins/show"
  end

  private

  def pin_params
    params.require(:pin).permit(:board_id, :photo_id, :description)
  end

end
