# == Schema Information
#
# Table name: partidos
#
#  id                :integer          not null, primary key
#  nombre            :string           not null
#  sigla             :string           not null
#  lema              :string           not null
#  fecha_fundacion   :date
#  texto             :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  logo_file_name    :string
#  logo_content_type :string
#  logo_file_size    :integer
#  logo_updated_at   :datetime
#  user_id           :integer
#

class Partido < ActiveRecord::Base
    has_paper_trail
    has_attached_file :logo, styles: { large: "600x600>", medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
    validates_attachment :logo,
        content_type: { content_type:  /\Aimage\/.*\Z/ },
        size: { in: 0..500.kilobytes }
    validates_presence_of :nombre, :sigla, :lema, :message => "debe rellenar"
    validates_uniqueness_of :nombre, :sigla, :lema, :message => "already exists"
    validates_length_of :lema, :within => 2..200
    
    belongs_to :user
    has_one :marco_general, dependent: :destroy
    has_one :marco_interno, dependent: :destroy
    has_many :organo_internos, dependent: :destroy
    
    after_create :initialize_transparency_settings
    
    def initialize_transparency_settings
       self.marco_general = MarcoGeneral.new
       self.marco_interno = MarcoInterno.new
       self.organo_internos << OrganoInterno.new(nombre:"Órgano ejecutivo")
       self.organo_internos << OrganoInterno.new(nombre:"Órgano intermedio colegiado")
       self.organo_internos << OrganoInterno.new(nombre:"Tribunal supremo")
       self.save
    end
    
end
