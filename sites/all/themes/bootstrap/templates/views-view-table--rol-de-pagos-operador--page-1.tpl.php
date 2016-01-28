<?php
$total = 0;
$consultar_extra = TRUE;
?>
<table <?php if ($classes) { print 'class="'. $classes . '" '; } ?><?php print $attributes; ?>>
  <?php if (!empty($title) || !empty($caption)) : ?>
    <caption><?php print $caption . $title; ?></caption>
  <?php endif; ?>
  <?php if (!empty($header)) : ?>

  <?php endif; ?>
  <tbody>
  <?php foreach ($rows as $row_count => $row): ?>

      <?php foreach ($row as $field => $content): ?>
          <?php
          $a = 0;
          if ($field == 'field_us') {
            $val = floatval($content);
            $total = $total + $val;
          }
          if ($field == 'field_fecha' && $consultar_extra) {
            $uid = $row['uid'];
            $fecha = strip_tags($row['field_fecha']);
            $extra = _custom_functions_get_extras($uid, $fecha);
            $consultar_extra = FALSE;
          }
          ?>
      <?php endforeach; ?>
  <?php endforeach; ?>
  <tr>
    <td class="text-right">Total: </td>
    <td><strong><?php print '$' . $total; ?></strong></td>
    <td class="text-right">Extra: </td>
    <td><strong><?php print '$' . $extra; ?></strong></td>
    <td class="text-right">Total a pagar:</td>
    <td class="text-right">$<strong class="total-pagar"><?php print floatval(floatval($total) + floatval($extra)); ?></strong></td>
  </tr>
  </tbody>
</table>