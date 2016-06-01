class PersonasGrid

  include Datagrid

  scope do
    #puts request
    Persona
  end

  #filter(:id, :integer)
  filter(:tipo, :enum, :select => Persona.tipos.map {|r| [r.humanize, r]})
  filter(:nombre, :string)
  filter(:apellidos, :string)
  filter(:region, :enum, :select => Region.all.order(:nombre).map {|r| [r.nombre, r.id]})
  filter(:comuna, :enum, :select => Comuna.all.order(:nombre).map {|r| [r.nombre, r.id]})
  filter(:circunscripcion, :enum, :select => Circunscripcion.all.order(:nombre).map {|r| [r.nombre, r.id]})
  filter(:distrito, :enum, :select => Distrito.all.map {|r| [r.nombre, r.id]})

  #filter(:condition, :dynamic, :header => "Condición")
  #column_names_filter(:header => "&nbsp", checkboxes: true)

  #filter(:created_at, :date, :range => true)

  column(:id)
  column(:genero)
  column(:nombre, :mandatory => true)
  column(:apellidos, :mandatory => true)
  column(:fecha_nacimiento)
  column(:tipo)
  column(:cargo)
  column(:afiliado) do
    afiliado? ? "Si" : "No"
  end
  column(:region) do |record|
    record.region.present? ? Region.find(record.region) : ""
  end
  column(:comuna) do |record|
    record.comuna.present? ? Comuna.find(record.comuna) : ""
  end
  column(:circunscripcion) do |record|
    record.circunscripcion.present? ? Circunscripcion.find(record.circunscripcion) : ""
  end
  column(:distrito) do |record|
    record.distrito.present? ? Distrito.find(record.distrito) : ""
  end
  column(:fecha_desde)
  column(:fecha_hasta)
  column(:telefono, :mandatory => true)
  column(:email, :mandatory => true)
  column(:intereses, :mandatory => true)
  column(:patrimonio, :mandatory => true)

  column(:created_at) do |model|
    model.created_at.to_date
  end
  column(:updated_at) do |model|
    model.updated_at.to_date
  end
end