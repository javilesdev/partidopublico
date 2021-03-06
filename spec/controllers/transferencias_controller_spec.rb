require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

RSpec.describe TransferenciasController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Transferencia. As you add validations to Transferencia, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # TransferenciasController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all transferencias as @transferencias" do
      transferencia = Transferencia.create! valid_attributes
      get :index, {}, valid_session
      expect(assigns(:transferencias)).to eq([transferencia])
    end
  end

  describe "GET #show" do
    it "assigns the requested transferencia as @transferencia" do
      transferencia = Transferencia.create! valid_attributes
      get :show, {:id => transferencia.to_param}, valid_session
      expect(assigns(:transferencia)).to eq(transferencia)
    end
  end

  describe "GET #new" do
    login_admin
    xit "assigns a new transferencia as @transferencia" do
      get :new, {}, valid_session
      expect(assigns(:transferencia)).to be_a_new(Transferencia)
    end
  end

  describe "GET #edit" do
    login_admin
    it "assigns the requested transferencia as @transferencia" do
      transferencia = Transferencia.create! valid_attributes
      get :edit, {:id => transferencia.to_param}, valid_session
      expect(assigns(:transferencia)).to eq(transferencia)
    end
  end

  describe "POST #create" do
    login_admin
    context "with valid params" do
      it "creates a new Transferencia" do
        expect {
          post :create, {:transferencia => valid_attributes}, valid_session
        }.to change(Transferencia, :count).by(1)
      end

      it "assigns a newly created transferencia as @transferencia" do
        post :create, {:transferencia => valid_attributes}, valid_session
        expect(assigns(:transferencia)).to be_a(Transferencia)
        expect(assigns(:transferencia)).to be_persisted
      end

      it "redirects to the created transferencia" do
        post :create, {:transferencia => valid_attributes}, valid_session
        expect(response).to redirect_to(Transferencia.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved transferencia as @transferencia" do
        post :create, {:transferencia => invalid_attributes}, valid_session
        expect(assigns(:transferencia)).to be_a_new(Transferencia)
      end

      it "re-renders the 'new' template" do
        post :create, {:transferencia => invalid_attributes}, valid_session
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    login_admin
    context "with valid params" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested transferencia" do
        transferencia = Transferencia.create! valid_attributes
        put :update, {:id => transferencia.to_param, :transferencia => new_attributes}, valid_session
        transferencia.reload
        skip("Add assertions for updated state")
      end

      it "assigns the requested transferencia as @transferencia" do
        transferencia = Transferencia.create! valid_attributes
        put :update, {:id => transferencia.to_param, :transferencia => valid_attributes}, valid_session
        expect(assigns(:transferencia)).to eq(transferencia)
      end

      it "redirects to the transferencia" do
        transferencia = Transferencia.create! valid_attributes
        put :update, {:id => transferencia.to_param, :transferencia => valid_attributes}, valid_session
        expect(response).to redirect_to(transferencia)
      end
    end

    context "with invalid params" do
      it "assigns the transferencia as @transferencia" do
        transferencia = Transferencia.create! valid_attributes
        put :update, {:id => transferencia.to_param, :transferencia => invalid_attributes}, valid_session
        expect(assigns(:transferencia)).to eq(transferencia)
      end

      it "re-renders the 'edit' template" do
        transferencia = Transferencia.create! valid_attributes
        put :update, {:id => transferencia.to_param, :transferencia => invalid_attributes}, valid_session
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    login_admin
    it "destroys the requested transferencia" do
      transferencia = Transferencia.create! valid_attributes
      expect {
        delete :destroy, {:id => transferencia.to_param}, valid_session
      }.to change(Transferencia, :count).by(-1)
    end

    it "redirects to the transferencias list" do
      transferencia = Transferencia.create! valid_attributes
      delete :destroy, {:id => transferencia.to_param}, valid_session
      expect(response).to redirect_to(transferencias_url)
    end
  end

end
