import * as React from "react";
import {useMemo} from "react";
import useThemeContext from "@theme/hooks/useThemeContext";
import * as echarts from "echarts";
import {EChartsOption, EffectScatterSeriesOption, ScatterSeriesOption} from "echarts";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import map from '@geo-maps/countries-land-10km';
import {alpha2ToGeo, alpha2ToTitle} from "../../lib/areacode";
import ECharts from "../ECharts";

if (!echarts.getMap('world')) {
  echarts.registerMap('world', map())
}

export interface WorldMapChartProps<T> {
  loading?: boolean
  data: T[]
  compareData?: T[]
  name?: string
  compareName?: string
  seriesName?: string
  dimensionColumnName: keyof T
  metricColumnName: keyof T
  effect?: boolean
  size?: number
}

function useMapOption (comparing: boolean): EChartsOption {
  return useMemo(() => ({
    geo: {
      roam: false,
      map: 'world',
      silent: true,
      zoom: 1.7,
      top: '35%',
      projection: {
        project: (point) => [point[0] / 180 * Math.PI, -Math.log(Math.tan((Math.PI / 2 + point[1] / 180 * Math.PI) / 2))],
        unproject: (point) => [point[0] * 180 / Math.PI, 2 * 180 / Math.PI * Math.atan(Math.exp(point[1])) - 90]
      }
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: true,
      type: 'scroll',
      left: comparing ? 'center' : 0,
      top: comparing ? 0 : 'center',
      orient: comparing ? "horizontal" : "vertical"
    },
    grid: {
      left: 16,
      top: 16,
      bottom: 16,
      right: 16,
      containLabel: true
    },
  }), [comparing])
}

export default function WorldMapChart<T>(props: WorldMapChartProps<T>) {
  const {
    loading,
    data,
    compareData,
    name = 'tidb',
    compareName,
    seriesName = 'Count',
    dimensionColumnName,
    metricColumnName,
    effect = true,
    size = 24
  } = props;
  const theme = useTheme();
  const basicOption = useMapOption(!!compareData)
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  const options: EChartsOption = useMemo(() => {
    const max = Math.max(data[0]?.[metricColumnName] as unknown as number ?? 0, compareData?.[0]?.[metricColumnName] as unknown as number ?? 0)

    let series: (ScatterSeriesOption | EffectScatterSeriesOption)[] = []

    if (!compareData) {
      series = data.map((item) => {
        const title = alpha2ToTitle(item[dimensionColumnName])
        const value = item[metricColumnName];
        const {long, lat} = alpha2ToGeo((item[dimensionColumnName] as any as string).toUpperCase()) || {}

        return {
          type: effect ? "effectScatter" : 'scatter' as 'effectScatter' | 'scatter',
          geoIndex: 0,
          coordinateSystem: 'geo',
          name: title,
          encode: {
            lng: 0,
            lat: 1,
            value: 2,
            tooltip: [3, 2],
          },
          symbolSize: function (val) {
            return 1 + Math.sqrt(val[2] / max) * size;
          },
          data: [[long, lat, value, title]],
        }
      })
    } else {
      series = [data, compareData].map((data, i) => ({
        type: effect ? "effectScatter" : 'scatter' as 'effectScatter' | 'scatter',
        geoIndex: 0,
        coordinateSystem: 'geo',
        name: [name, compareName][i],
        encode: {
          lng: 0,
          lat: 1,
          value: 2,
          tooltip: [3, 2]
        },
        symbolSize: function (val) {
          return 1 + Math.sqrt(val[2] / max) * size;
        },
        data: data.map(item => {
          const title = alpha2ToTitle(item[dimensionColumnName])
          const value = item[metricColumnName];
          const {long, lat} = alpha2ToGeo((item[dimensionColumnName] as any as string).toUpperCase()) || {}
          return [long, lat, value, title]
        }),
      }))
    }

    return {
      ...basicOption,
      series,
    }
  }, [basicOption, data, compareData, name, compareName, isSmall, effect])

  return (
    <ECharts
      aspectRatio={16 / 9}
      showLoading={loading}
      option={options}
      notMerge={false}
      lazyUpdate={true}
    />
  )
}
