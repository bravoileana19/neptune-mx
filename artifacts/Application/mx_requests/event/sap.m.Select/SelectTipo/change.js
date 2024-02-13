console.log(this)
console.log( this.getSelectedItem().getKey() )

const tipoSolicitud = this.getSelectedItem().getKey();

if ( tipoSolicitud === 'Alta' ) {
    
    InputEspecificarMX.setEnabled(false);
    RadioButtonO.setVisible(false);

} else {
    
    InputEspecificarMX.setEnabled(true);
    RadioButtonO.setVisible(true);

}