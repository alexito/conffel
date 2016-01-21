<div class="imprimir-diario">
  <div class="col-sm-12">
    <ul class="remove-on-print">
      <li><h5><?php print l('Imprimir Diario', 'print/imprimir-diario/' . $output->fecha); ?></h5></li>
      <li><h5><?php print l('Ir a la lista de Diarios', 'lista-de-diario'); ?></h5></li>
      <li><h5><?php print l('Ir a la pagina principal', 'inicio'); ?></h5></li>
    </ul>
  </div>
  <div class="col-sm-12 text-center">
    <b>Marcotex</b>  <br> <b>DIARIO</b>
  </div>
  <div class="col-sm-12">
    <h4><b>Fecha:</b>  <?php print $output->fecha; ?></h4>
  </div>


  <?php
  if(isset($output->nodes)){
  foreach ($output->nodes as $node) {
    $wrapper = entity_metadata_wrapper('node', $node);
    ?>
    <div class="col-sm-12 border-dashed">
      <span class="col-sm-6">
      <h5><b><u><?php print $wrapper->field_modulo->name->value(); ?></u></b></h5>

      <table class="table table-bordered">
        <tr>
          <td style="width: 120px;">
            <b>Cod. Tarjeta  </b>
          </td>
          <td class="text-center">
            <b>SAM</b>
          </td>
          <td class="text-center">
            <b>UDS</b>
          </td>
          <td class="text-center">
            <b>Min Prod</b>
          </td>
        </tr>
        <?php
        $tarjetas = $wrapper->field_tarjeta->value();

        foreach ($tarjetas as $tarjeta) {
          $t_wrapper = entity_metadata_wrapper('field_collection_item', $tarjeta);
          ?>

          <tr>
            <td>
              <?php print $t_wrapper->field_det_tarjeta->nid->value(); ?>
            </td>
            <td style="text-align: right;">
              <?php print $t_wrapper->field_det_sam->value(); ?>
            </td>
            <td style="text-align: right;">
              <?php print $t_wrapper->field_det_uds->value(); ?>
            </td>
            <td style="text-align: right;">
              <?php print $t_wrapper->field_det_min_prod->value(); ?>
            </td>

          </tr>
        <?php } ?>
        <tr>
          <td></td>
          <td style="text-align: right;"><b>Total: </b></td>
          <td style="text-align: right;"><?php print $wrapper->field_uds_total->value(); ?></td>
          <td style="text-align: right;"><?php print $wrapper->field_min_prod_total->value(); ?></td>
        </tr>
      </table>
      </span>
      <span class="col-sm-6">
        <h5><b>Productividad: </b><?php print ($wrapper->field_variable->value() * 100) . ' %'; ?></h5>
      <table class="table table-bordered">
        <tr>
          <td style="width: 80px;"><b>Cod. Emp.</b></td>
          <td><b>Nombre</b></td>
          <td><b>Valor minuto</b></td>
          <td><b>Real horas</b></td>
          <td><b>US</b></td>
        </tr>

        <?php
        $empleados = $wrapper->field_detalle->value();

        foreach ($empleados as $empleado) {
          $e_wrapper = entity_metadata_wrapper('field_collection_item', $empleado);
          ?>

          <tr>
            <td>
              <?php print $e_wrapper->field_empleado->nid->value(); ?>
            </td>
            <td>
              <?php
              $emp = node_load($e_wrapper->field_empleado->nid->value());
              print $emp->title;
              ?>
            </td>
            <td style="text-align: right;">
              <?php print $e_wrapper->field_v_min->value(); ?>
            </td>
            <td style="text-align: right;">
              <?php print $e_wrapper->field_horas->value(); ?>
            </td>
            <td style="text-align: right;">
              <?php print $e_wrapper->field_us_subtotal->value(); ?>
            </td>
          </tr>
        <?php } ?>

        <tr>
          <td></td>
          <td></td>
          <td style="text-align: right;"><b>Total:</b></td>
          <td style="text-align: right;"><?php print $wrapper->field_horas_total->value(); ?></td>
          <td style="text-align: right;"><?php print $wrapper->field_us_total->value(); ?></td>
        </tr>

      </table>
      </span>
    </div>
  <div class="clearfix"></div>
  <?php }
  }else{
  ?>
  <span class="col-sm-10">
    <h4>No se encontraron datos en la fecha especificada.</h4>
  </span>
  <?php }?>

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
  .border-dashed{
    border-top: 1px dashed #c3c3c3;
    margin-bottom: 10px;
  }
</style>