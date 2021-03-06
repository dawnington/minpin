Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] do
      resources :boards, only: [:index]
      get 'followers', on: :member
      get 'following', on: :member
      get 'feed', on: :member
    end

    resources :boards, only: [:create, :destroy, :show, :update]
    resources :follows, only: [:create, :destroy]
    resources :photos, only: [:create]
    resources :pins, only: [:create, :destroy, :index]
    resources :tags, only: [:index]
    resource :session, only: [:create, :destroy]
  end
end
