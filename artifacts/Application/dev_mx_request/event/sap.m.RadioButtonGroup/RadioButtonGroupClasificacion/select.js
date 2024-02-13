console.log(this)
console.log(this.getSelectedButton().getText())

const clasificacion = this.getSelectedButton().getText();

if ( clasificacion === 'A' ) {

    LblJustificacion.setVisible(true);
    InputJustificacion.setEnabled(true);
    InputJustificacion.setVisible(true);

} else {
    
    LblJustificacion.setVisible(false);
    InputJustificacion.setEnabled(false);
    InputJustificacion.setVisible(false);

}