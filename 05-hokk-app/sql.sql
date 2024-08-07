SELECT
    (
        CASE
            WHEN cp.TipoGrupo IN (1, 2, 3, 4, 5, 6, 9, 10, 11) THEN CONVERT(
                VARCHAR(4),
                LEFT (cp.NroComp, (LEN (cp.NroComp) - 8))
            )
            WHEN cp.TipoGrupo IN (7, 8) THEN '0000'
        END
    ) AS NroSucursal,
    cp.TipoGrupo,
    cp.TotalComprobante - SUM(ABS(COALESCE(importepagado, 0))) AS SaldoPendiente,
    cp.desccomp,
    cp.NroProveedor AS proveedor,
    Proveedor.RSocial,
    cp.NroInterno,
    LEFT (FORMAT (cp.NroComp, '000000000000'), 4) AS Prefijo,
    RIGHT (FORMAT (cp.NroComp, '000000000000'), 8) AS NroFactura,
    FORMAT (cp.FechaComp, 'dd/MM/yyyy', 'es-AR') AS FechaComp,
    FORMAT (cp.FechaVto, 'dd/MM/yyyy', 'es-AR') AS FechaVto,
    cp.TotalComprobante,
    SUM(ABS(COALESCE(importepagado, 0))) + SUM(ABS(COALESCE(dsl.importe,0))) AS pagado,
    0 AS importe,
    '' AS observacion,
    0 AS liq,
    cp.Bloqueo,
    Proveedor.idLiquidacionAutomatica,
    COALESCE(Proveedor.diasLiquidacionAutomatica, 0) AS diasLiquidacionAutomatica,
    CASE
        WHEN Proveedor.idLiquidacionAutomatica = 1 THEN 'Segun Algoritmo'
        WHEN Proveedor.idLiquidacionAutomatica = 2 THEN 'Dias fijos'
        WHEN Proveedor.idLiquidacionAutomatica = 3 THEN 'Igual Vto. Factura'
        WHEN Proveedor.idLiquidacionAutomatica = 4 THEN 'Sin Liq. Automática'
    END AS descripcion,
    COALESCE(cp.liquidar, 0) AS liquidar,
    dc.descripcion AS descComprobante,
    tc.descripcion AS descTipo,
    Proveedor.TomaFactura
FROM
    ComprobantesProveedores cp
    INNER JOIN Proveedor ON cp.NroProveedor = Proveedor.NroProveedor
    LEFT JOIN DetalleLiquidaciones ON cp.NroInterno = DetalleLiquidaciones.NroInterno
    INNER JOIN Proveedores.dbo.FormaLiquidacion fl ON fl.idFormaLiquidacion = Proveedor.idLiquidacionAutomatica
    INNER JOIN Proveedores.dbo.TiposComprobantes tc ON tc.Codigo = cp.TipoComp
    INNER JOIN proveedores.dbo.DescripcionComprobantes dc ON cp.DescComp = dc.codigo
    inner join Proveedores.dbo.SubDetalleLiquidacionesAutomaticas sdl on sdl.nrointerno =  cp.nrointerno
WHERE
    cp.nrointerno not in (
        SELECT DISTINCT
            dbo.ComprobantesOrdenes.NroInterno
        FROM
            dbo.ComprobantesProveedores
            INNER JOIN dbo.ComprobantesOrdenes ON dbo.ComprobantesProveedores.NroInterno = dbo.ComprobantesOrdenes.NroInterno
        WHERE
            (dbo.ComprobantesProveedores.MarcaAcumulado = 'P')
            AND (dbo.ComprobantesProveedores.DescComp <> 2)
            AND (dbo.ComprobantesOrdenes.CodAutoriza <> 0)
    )
    and idLiquidacionAutomatica <> 4
    and cp.TipoGrupo <> 2
    AND cp.codestadopago = 4
    AND cp.bloqueo IS NULL
    AND (
        cp.TotalComprobante - (
            CASE
                WHEN (
                    SELECT
                        SUM(ABS(importepagado))
                    FROM
                        detalleliquidaciones
                    WHERE
                        detalleliquidaciones.nrointerno = cp.nrointerno
                ) IS NULL THEN 0
                ELSE (
                    CASE
                        WHEN (
                            SELECT
                                SUM(ABS(importepagado))
                            FROM
                                detalleliquidaciones
                            WHERE
                                detalleliquidaciones.nrointerno = cp.nrointerno
                        ) IS NULL THEN 0
                        ELSE (
                            SELECT
                                SUM(ABS(importepagado))
                            FROM
                                detalleliquidaciones
                            WHERE
                                detalleliquidaciones.nrointerno = cp.nrointerno
                        )
                    END
                )
            END
        )
    ) > 0
    AND (
        CASE
            WHEN Proveedor.TomaFactura = 1
            and (
                DATEDIFF (
                    day,
                    FORMAT (cp.fechaComp, 'dd/MM/yyyy', 'es-AR'),
                    GETDATE ()
                ) >= (Proveedor.DiasTomaFactura)
            ) THEN 1
            WHEN Proveedor.TomaFactura = 0
            AND (
                DATEDIFF (
                    day,
                    FORMAT (cp.fechaComp, 'dd/MM/yyyy', 'es-AR'),
                    GETDATE ()
                ) >= (
                    SELECT
                        TOP 1 Dias
                    FROM
                        DiasParaProcesarLiquidacion
                    ORDER BY
                        idDiasParaProcesarLiq DESC
                )
                OR dc.descripcion LIKE 'ORDEN PAGO ANTICIPO'
            ) THEN 1
            ELSE 0
        END
    ) = 1
    and EsAduana <> 1
GROUP BY
    TipoGrupo,
    NroComp,
    SaldoPendiente,
    DescComp,
    cp.NroProveedor,
    Proveedor.RSocial,
    cp.NroInterno,
    cp.FechaComp,
    cp.FechaVto,
    cp.TotalComprobante,
    Bloqueo,
    Proveedor.idLiquidacionAutomatica,
    Proveedor.diasLiquidacionAutomatica,
    fl.descripcion,
    dc.descripcion,
    tc.descripcion,
    cp.liquidar,
    Proveedor.TomaFactura
ORDER BY
    cp.nroproveedor,
    cp.fechacomp