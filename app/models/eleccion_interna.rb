# == Schema Information
#
# Table name: eleccion_internas
#
#  id                       :integer          not null, primary key
#  organo_interno_id        :integer
#  fecha_eleccion           :date
#  fecha_limite_inscripcion :date
#  cargo                    :string
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#

class EleccionInterna < ActiveRecord::Base
    belongs_to :organo_interno    
    has_many :requisitos, as: :requisitable
    has_many :procedimientos, as: :procedimentable
    
    accepts_nested_attributes_for :requisitos, reject_if: proc { |attributes| attributes['descripcion'].blank? }, allow_destroy: true
    accepts_nested_attributes_for :procedimientos, reject_if: proc { |attributes| attributes['descripcion'].blank? }, allow_destroy: true
end
