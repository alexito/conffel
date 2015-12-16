<div class="imprimir-corte">
  <div class="col-sm-12 text-center">
    <b>CONFFEL</b>  <br> <b>ORDEN DE TRAZO</b>
  </div>

  <div class="col-sm-12 text-right">    
    PEDIDO Nº: __<?php print $output->node->nid;?>__
  </div>
  <span class="col-sm-6">
    <table class="table table-bordered">
      <tr>
        <td><b>TRAZADOR: </b> <?php print $output->user->field_nombre_y_apellido[LANGUAGE_NONE][0]['value']; ?></td>
        <td><b>FECHA DE TRAZO: </b> <?php print t(date('j-m-Y G:i', $output->node->created)); ?></td>
      </tr>
    </table>
  </span>
  <span class="col-sm-6">
    <table class="table table-bordered">
      <tr>
        <td><b>TRAZADOR: </b></td>
        <td><b>FECHA DE TRAZO: </b></td>
      </tr>
    </table>
  </span>


  <span class="col-sm-6">
    <table class="table table-bordered" >
      <tr>
        <td><b>ANCHO: </b><?php print $output->node->field_ancho[LANGUAGE_NONE][0]['value']; ?></td>    
        <td><b>LONGITUD: </b><?php print $output->node->field_longitud[LANGUAGE_NONE][0]['value']; ?></td>
        <td><b>APROVECHAMIENTO: </b><?php print $output->node->field_aprovechamiento[LANGUAGE_NONE][0]['value']; ?></td>
      </tr>
    </table>
    <table class="table table-bordered" >
      <tr>        
        <td><b>MODELO: </b><?php print $output->modelo->name; ?></td>
      </tr>
    </table>
  </span>
  <span class="col-sm-6">
    <table class="table table-bordered" >
      <tr>
        <td><b>ANCHO: </b></td>    
        <td><b>LONGITUD: </b></td>
        <td><b>APROVECHAMIENTO: </b></td>
      </tr>
    </table>
    <table class="table table-bordered" >
      <tr>        
        <td><b>MODELO: </b></td>
      </tr>
    </table>
  </span>



  <span class="col-sm-6">
    <table class="table table-bordered">
      <tr>        
        <td style="text-align:center;"><b>TALLAS</b></td>
        <td style="text-align:center;"><b>TOTAL</b></td>
      </tr>
      <?php for ($i = 0; $i < count($output->tt); $i++) { ?>
        <tr>
          <td> <?php print $output->tt[$i]->talla ?></td>
          <td> <?php print $output->tt[$i]->subtotal ?></td>
        </tr>
      <?php } ?>
      <tr>
        <td><b><b>TOTAL</b>:</b></td>
        <td><?php print $output->suma_total ?></td>
      </tr>
    </table>
    <table class="table table-bordered">
      <tr>
        <td>
          <b>OBSERVACIONES: </b>          
          <?php print $output->node->field_observaciones[LANGUAGE_NONE][0]['value']; ?>
          <br>
          <br>
        </td>
      </tr>
    </table>
  </span>
  <span class="col-sm-6">
    <table class="table table-bordered">
      <tr>
        <td style="text-align:center;"><b>TALLAS</b></td>
        <td style="text-align:center;"><b>TOTAL</b></td>
      </tr>
      <?php for ($i = 0; $i < count($output->tt); $i++) { ?>
        <tr>
          <td> </td>
          <td> </td>
        </tr>
      <?php } ?>
      <tr>
        <td><b><b>TOTAL</b>:</b></td>
        <td></td>
      </tr>
    </table>
    <table class="table table-bordered">
      <tr>
        <td><b>OBSERVACIONES: </b>
          <br>
          <br>
        </td>
      </tr>
    </table>
  </span>
  <div class="clearfix"></div>

  <div class="col-sm-12 text-center"><br><b>ORDEN DE TENDIDO Y CORTE</b></div>
  <div class="col-sm-12">
    <table class="table table-bordered">
      <tr>
        <td>
          <b>TENDEDOR - CORTADOR:</b>
        </td>
        <td>
          <b>FECHA Y HORA DE TENDIDO:</b>
        </td>
        <td>
          <b>FECHA Y HORA INGRESO DE TELA:</b>
        </td>
      </tr>
    </table>
  </div>    
  <div class="col-sm-6">
    <table class="table table-bordered">
      <tr>
        <td>
          <b>TIPO DE TELA: </b>
        </td>
      </tr>
    </table>
    <table class="table table-bordered">
      <tr>
        <td>
          <b>TIPO / TELA</b>
        </td>
        <td>
          <b>COLOR</b>
        </td>
        <td>
          <b>CAPAS</b>
        </td>
        <td>
          <b>LOTE</b>
        </td>
        <td>
          <b>INICIAL</b>
        </td>
        <td>
          <b>FINAL</b>
        </td>
        <td>
          <b>CONSUMO</b>
        </td>
        <td>
          <b>PRENDAS</b>
        </td>
      </tr>
      <?php
      foreach ($output->node->field_tela[LANGUAGE_NONE] as $tid) {
        $term = taxonomy_term_load($tid['tid']);
        ?>
        <tr>
          <td><?php print $term->name; ?></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      <?php } ?>
      <tr>
        <td></td>
        <td></td>
        <td><b>CONSUMO<br>PROMEDIO</b></td>
        <td></td>
        <td></td>
        <td><b>TOTALES</b></td>
        <td></td>
        <td></td>
      </tr>
    </table>

    <table class="table table-bordered">
      <tr>
        <td>
          <b>GUAYPE</b>
        </td>
        <td style="color: white !important;">__________</td>
        <td>
          <b>PUNTAS</b>
        </td>
        <td style="color: white !important;">__________</td>
        <td>
          <b>SISCO</b>
        </td>
        <td style="color: white !important;">__________</td>
        <td>
          <b>TIRILLA</b>
        </td>
        <td style="color: white !important;">__________</td>
      </tr>
    </table>
  </div>
  <div class="col-sm-6">
    <table class="table table-bordered">
      <tr>
        <td>
          <b>TIPO DE TELA: </b>
        </td>
      </tr>
    </table>
    <table class="table table-bordered">
      <tr>
        <td>
          <b>TIPO / TELA</b>
        </td>
        <td>
          <b>COLOR</b>
        </td>
        <td>
          <b>CAPAS</b>
        </td>
        <td>
          <b>LOTE</b>
        </td>
        <td>
          <b>INICIAL</b>
        </td>
        <td>
          <b>FINAL</b>
        </td>
        <td>
          <b>CONSUMO</b>
        </td>
        <td>
          <b>PRENDAS</b>
        </td>
      </tr>
      <?php foreach($output->node->field_tela[LANGUAGE_NONE] as $tid) { ?>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      <?php } ?>
      <tr>
        <td></td>
        <td></td>
        <td><b>CONSUMO<br>PROMEDIO</b></td>
        <td></td>
        <td></td>
        <td><b>TOTALES</b></td>
        <td></td>
        <td></td>
      </tr>
    </table>

    <table class="table table-bordered">
      <tr>
        <td>
          <b>GUAYPE</b>
        </td>
        <td style="color: white !important;">__________</td>
        <td>
          <b>PUNTAS</b>
        </td>
        <td style="color: white !important;">__________</td>
        <td>
          <b>SISCO</b>
        </td>
        <td style="color: white !important;">__________</td>
        <td>
          <b>TIRILLA</b>
        </td>
        <td style="color: white !important;">__________</td>
      </tr>
    </table>
  </div>
  <div class="clearfix"></div>
  <div class="col-sm-12">    
    <span class="col-sm-4">
      <table class="table table-bordered table-condensed">
        <tr>
          <td><br><br></td>
        </tr>
        <tr>
          <td class="text-center"><b>DISEÑO</b></td>
        </tr>        
      </table>
    </span>
    <span class="col-sm-4">
      <table class="table table-bordered table-condensed">
        <tr>
          <td><br><br></td>
        </tr>
        <tr>
          <td class="text-center"><b>CORTE</b></td>
        </tr>        
      </table>
    </span>
    <span class="col-sm-4">
      <table class="table table-bordered table-condensed">
        <tr>
          <td><br><br></td>
        </tr>
        <tr>
          <td class="text-center"><b>CONTABILIDAD / PAGO</b></td>
        </tr>        
      </table>
    </span>
  </div>
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