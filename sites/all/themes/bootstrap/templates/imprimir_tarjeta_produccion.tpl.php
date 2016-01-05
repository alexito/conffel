<div class="imprimir-corte">  
  <span class="col-sm-6">
    <ul class="remove-on-print">
      <li><h3><?php print l('Imprimir esta Tarjeta de producción', 'print/imprimir-tarjeta-produccion/' . $output->nid); ?></h3></li>
      <li><h3><?php print l('Volver a la pagina principal', 'inicio'); ?></h3></li>
    </ul>
  </span>
  <span class="col-sm-6" style="border: 1px dashed #C4C4C4;">
    <div class="col-sm-12 text-center"><b>TARJETA DE PRODUCCION</b></div>
    <span class="col-sm-8">
      <table class="table table-bordered">
        <tr>
          <td><b>CLIENTE: </b></td>        
          <td><?php print $output->cliente_nombre;?></td>  
        </tr>
        <tr>
          <td><b>MODELO: </b></td>
          <td><?php print $output->modelo_nombre;?></td>  
        </tr>
        <!--<tr>
          <td><b>COLOR: </b></td>
          <td><?php //print $output->color_nombre;?></td>
        </tr>-->
        <tr>
          <td><b>TIPO DE TELA: </b></td>
          <td><?php print $output->tela_nombre;?></td>  
        </tr>
        <tr>
          <td><b>FECHA DE CORTE: </b></td>
          <td><?php print $output->corte_fecha;?></td>  
        </tr>
      </table>
    </span>
    <span class="col-sm-4">
      <table class="table table-bordered">
        <tr>
          <td><b>Nº TARJETA: </b></td>     
          <td><?php print $output->title;?></td>
        </tr>
        <tr>
          <td><b>CORTADOR: </b></td>
          <td><?php print $output->user_corte_nombre;?></td>  
        </tr>
      </table>
    </span>
    
    <div class="clearfix"></div>
    <div class="col-sm-12">
      <table class="table table-bordered">
        <tr>
          <td><b>TALLAS: </b></td>     
          <?php foreach($output->tallas_cantidades as $tc){?>
          <td><?php print $tc->talla;?></td>
          <?php }?>
          <td><b>TOTAL</b></td>
        </tr>
        <tr>
          <td><b>CORTE: </b></td>
          <?php foreach($output->tallas_cantidades as $tc){?>
          <td><?php print $tc->cantidad;?></td>
          <?php }?>
          <td><?php print $output->cantidad_total;?></td>
        </tr>        
        <tr>
          <td><b>DEGRADADAS: </b></td>    
          <?php foreach($output->tallas_cantidades as $tc){?>
          <td></td>
          <?php }?>
          <td></td>
        </tr>
        <tr>
          <td><b>CONFECCION: </b></td>      
          <?php foreach($output->tallas_cantidades as $tc){?>
          <td></td>
          <?php }?>
          <td></td>
        </tr>
        <tr>
          <td><b>BODEGA: </b></td>
          <?php foreach($output->tallas_cantidades as $tc){?>
          <td></td>
          <?php }?>
          <td></td>
        </tr>
        <tr>
          <td><b>EMPAQUE: </b></td>
          <?php foreach($output->tallas_cantidades as $tc){?>
          <td></td>
          <?php }?>
          <td></td>
        </tr>
      </table>
    </div>
    
    <div class="col-sm-12"><b>DESCRIPCION DEL INSUMO</b></div>
    
    <div class="col-sm-6">
      <table class="table table-bordered">
        <tr>
          <td><b>ETQ. SATIN AZUL: </b></td>     
          <td></td>
        </tr>
        <tr>
          <td><b>ETQ. INSTRUCCION 100% ALG: </b></td>
          <td></td>
        </tr>        
        <tr>
          <td><b>REATA MEN=24CM: </b></td>       
          <td></td>
        </tr>
        <tr>
          <td><b>CODIGOS: </b></td>     
          <td></td>
        </tr>
        <tr>
          <td><b>PLASTIFLECHAS: </b></td>
          <td></td>
        </tr>
        <tr>
          <td></td>       
          <td></td>
        </tr>
        <tr>
          <td></td>       
          <td></td>
        </tr>
        <tr>
          <td></td>       
          <td></td>
        </tr>
        <tr>
          <td></td>       
          <td>______________________</td>
        </tr>
      </table>
    </div>
    
    
    <div class="clearfix"></div>
  <br><br>
  __________________________________________<br>
  FIRMA RESPONSABLE DE ENTREGA DE INSUMOS<br>
  
  <br><br>
  __________________________________________<br>
  FIRMA RESPONSABLE QUE RECIBE LOS INSUMOS<br>
  
  <br><br>
  
  <span class="col-sm-12">
    <b>Nota: Verifique los insumos, pasada las 24 horas de entrega no se aceptan reclamos y los
     faltantes serán facturados.</b>
  </span>
    
    
  </span>
  
  
  
</div>

<style>
  .table{
    margin-bottom: 1px;
  }
  .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td{
    padding: 2px !important;
    height: 17px;
  }
  .imprimir-corte{
    font-size: 9px;
  }
</style>